/**
 * Regression tests for the 1.2.0 accuracy fixes:
 * - Variable arrows: direction from TONE (1-3 left / 4-6 right), and
 *   motivation ← Personality Sun / perspective ← Personality Nodes
 * - Incarnation cross name corrections + canonical fullName format
 * - Channel subcircuit corrections (12-22 knowing, 19-49 ego)
 * - Earth in positions output
 * - Color/Tone/Base on every activation
 * - Mean-node option
 * - IANA-historical timezone resolution
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';

import calculateHumanDesign, {
  CHANNELS,
  longitudeToColor,
  longitudeToTone,
  longitudeToBase
} from '../src/calculators/humandesign.js';
import { getIncarnationCross, INCARNATION_CROSSES } from '../src/data/incarnation-crosses.js';
import { resolveUtcOffset, formatUtcOffset } from '../src/timezone.js';

// Ra Uru Hu: 1948-04-09 00:05 EST (UTC-5), Montreal — fully validated
// reference chart (Manifestor 5/1, Splenic, Single, LAX Clarion 51/57|61/62)
const ra = calculateHumanDesign('1948-04-09', 5 / 60, -5);

test('reference chart (Ra Uru Hu) still passes after fixes', () => {
  assert.equal(ra.type.name, 'Manifestor');
  assert.equal(ra.profile.numbers, '5/1');
  assert.equal(ra.authority.name, 'Splenic Authority');
  assert.equal(ra.definition, 'Single Definition');
  assert.deepEqual(ra.incarnationCross.gates, [51, 57, 61, 62]);
});

test('variable arrow direction comes from tone, not color', () => {
  for (const key of ['determination', 'environment', 'motivation', 'perspective']) {
    const slot = ra.variable[key];
    assert.equal(slot.arrow, slot.tone <= 3 ? 'left' : 'right',
      `${key}: arrow must follow tone (tone=${slot.tone}, color=${slot.color})`);
  }
});

test('variable sources: motivation ← personality sun, perspective ← personality nodes', () => {
  const pSun = ra.positions.personality.sun.longitude;
  const pNode = ra.positions.personality.northNode.longitude;
  assert.equal(ra.variable.motivation.color, longitudeToColor(pSun));
  assert.equal(ra.variable.motivation.tone, longitudeToTone(pSun));
  assert.equal(ra.variable.perspective.color, longitudeToColor(pNode));
  assert.equal(ra.variable.perspective.tone, longitudeToTone(pNode));
});

test('variable sources: determination ← design sun, environment ← design nodes', () => {
  const dSun = ra.positions.design.sun.longitude;
  const dNode = ra.positions.design.northNode.longitude;
  assert.equal(ra.variable.determination.color, longitudeToColor(dSun));
  assert.equal(ra.variable.determination.tone, longitudeToTone(dSun));
  assert.equal(ra.variable.environment.color, longitudeToColor(dNode));
  assert.equal(ra.variable.environment.tone, longitudeToTone(dNode));
});

test('corrected cross names', () => {
  assert.equal(INCARNATION_CROSSES[14][1], 'Empowering');
  assert.equal(INCARNATION_CROSSES[19][1], 'Need');
  assert.equal(INCARNATION_CROSSES[33][1], 'Retreat');
  assert.equal(INCARNATION_CROSSES[59][1], 'Strategy');
  assert.equal(INCARNATION_CROSSES[25][2], 'Healing');
  assert.equal(INCARNATION_CROSSES[46][2], 'Healing');
});

test('canonical cross fullName format with gates quartet', () => {
  const cross = getIncarnationCross(1, '1/3', [1, 2, 7, 13]);
  assert.equal(cross.fullName, 'Right Angle Cross of the Sphinx (1/2 | 7/13)');
  const jx = getIncarnationCross(59, '4/1', [59, 55, 16, 9]);
  assert.equal(jx.fullName, 'Juxtaposition Cross of Strategy (59/55 | 16/9)');
  // No leading "The", lowercase "the" for The-prefixed names
  assert.ok(!ra.incarnationCross.fullName.startsWith('The '));
  assert.match(ra.incarnationCross.fullName, /^Left Angle Cross of the Clarion \(51\/57 \| 61\/62\)$/);
});

test('corrected channel subcircuits', () => {
  const ch1222 = CHANNELS.find(c => c.gates[0] === 12 && c.gates[1] === 22);
  assert.equal(ch1222.subcircuit, 'knowing');
  const ch1949 = CHANNELS.find(c => c.gates[0] === 19 && c.gates[1] === 49);
  assert.equal(ch1949.subcircuit, 'ego');
  // 25-51 remains the only individual centering channel
  const centering = CHANNELS.filter(c => c.subcircuit === 'centering');
  assert.equal(centering.length, 1);
  assert.deepEqual(centering[0].gates, [25, 51]);
});

test('earth present in positions for both sides', () => {
  for (const side of ['personality', 'design']) {
    const earth = ra.positions[side].earth;
    assert.ok(earth, `${side} earth missing`);
    const sun = ra.positions[side].sun;
    const expected = (sun.longitude + 180) % 360;
    assert.ok(Math.abs(earth.longitude - expected) < 1e-9, `${side} earth must oppose sun`);
  }
});

test('activations carry color/tone/base substructure', () => {
  for (const side of ['personality', 'design']) {
    for (const [planet, act] of Object.entries(ra.gates[side])) {
      assert.ok(act.color >= 1 && act.color <= 6, `${side}.${planet} color`);
      assert.ok(act.tone >= 1 && act.tone <= 6, `${side}.${planet} tone`);
      assert.ok(act.base >= 1 && act.base <= 5, `${side}.${planet} base`);
      assert.equal(typeof act.longitude, 'number');
    }
  }
});

test('base subdivision math (6/6/6/5)', () => {
  // Gate 41 starts at exactly 302° — first base of first tone of first
  // color of first line. One base = 0.005208333°.
  assert.equal(longitudeToBase(302.0), 1);
  assert.equal(longitudeToBase(302.0 + 0.0052084), 2);
  assert.equal(longitudeToBase(302.0 + 4 * 0.0052084), 5);
  // Last base of the gate
  assert.equal(longitudeToBase(302.0 + 5.625 - 0.001), 5);
});

test('mean node option shifts nodes but not sun', () => {
  const meanChart = calculateHumanDesign('1948-04-09', 5 / 60, -5, { nodeType: 'mean' });
  assert.equal(meanChart.meta.nodeType, 'mean');
  assert.equal(ra.meta.nodeType, 'true');
  // Sun unaffected
  assert.equal(meanChart.gates.personality.sun.gate, ra.gates.personality.sun.gate);
  // Node longitude differs (true-node correction is nonzero)
  assert.notEqual(
    meanChart.positions.personality.northNode.longitude,
    ra.positions.personality.northNode.longitude
  );
});

test('design dateTime exposes the solved 88° moment with time', () => {
  assert.match(ra.positions.design.dateTime, /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/);
  assert.ok(ra.positions.design.dateTime.startsWith(ra.positions.design.date));
});

test('reproducibility meta block', () => {
  assert.equal(ra.meta.birthDate, '1948-04-09');
  assert.equal(ra.meta.timezone, -5);
  assert.equal(ra.meta.designSolarArc, 88);
  assert.match(ra.meta.ephemeris, /astronomy-engine/);
});

test('historical timezone resolution (IANA via Intl)', () => {
  assert.equal(resolveUtcOffset('1990-06-15', '14:30', 'America/Denver'), -6); // MDT
  assert.equal(resolveUtcOffset('1990-01-15', '14:30', 'America/Denver'), -7); // MST
  assert.equal(resolveUtcOffset('1944-06-15', '12:00', 'Europe/London'), 2);   // double summer time
  assert.equal(resolveUtcOffset('1974-01-15', '12:00', 'America/New_York'), -4); // energy-crisis DST
  assert.equal(resolveUtcOffset('1985-03-20', '08:00', 'Asia/Kolkata'), 5.5);
  // Ra's own birth: April 9 1948 Montreal was EST (DST began Apr 25)
  assert.equal(resolveUtcOffset('1948-04-09', '00:05', 'America/Montreal'), -5);
});

test('formatUtcOffset', () => {
  assert.equal(formatUtcOffset(-7), 'UTC-7');
  assert.equal(formatUtcOffset(5.5), 'UTC+5:30');
  assert.equal(formatUtcOffset(5.75), 'UTC+5:45');
});

/**
 * Pure SVG renderer tests — string in/out, no DOM anywhere.
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';
import calculateHumanDesign from '../src/calculators/humandesign.js';
import renderBodygraphSVG, { renderChartCardSVG, THEMES } from '../src/render/bodygraph-svg.js';

const chart = calculateHumanDesign('1990-06-15', 14.5, -6);

test('renders a self-contained svg with all 64 gates twice (paths + circles)', () => {
  const svg = renderBodygraphSVG(chart);
  assert.ok(svg.startsWith('<svg'));
  assert.ok(svg.endsWith('</svg>'));
  assert.equal((svg.match(/data-gate="/g) || []).length, 128);
  assert.equal((svg.match(/data-center="/g) || []).length, 9);
});

test('defined centers get theme colors, undefined stay background', () => {
  const svg = renderBodygraphSVG(chart);
  for (const name of chart.centers.definedNames) {
    assert.ok(svg.includes(`fill="${THEMES.light.centers[name]}" stroke="none" stroke-width="1.5" data-center="${name}"`),
      `${name} should be filled as defined`);
  }
  for (const name of chart.centers.allUndefinedNames) {
    assert.ok(svg.includes(`fill="${THEMES.light.undefinedCenter}" stroke="${THEMES.light.centerStroke}" stroke-width="1.5" data-center="${name}"`),
      `${name} should be undefined-styled`);
  }
});

test('dual-activated gates use the stripe pattern', () => {
  const both = chart.gates.all.find(g =>
    Object.values(chart.gates.personality).some(a => a?.gate === g) &&
    Object.values(chart.gates.design).some(a => a?.gate === g));
  if (both) {
    const svg = renderBodygraphSVG(chart, { id: 'x' });
    assert.ok(svg.includes(`fill="url(#x-stripe-both)" opacity="1" data-gate="${both}"`));
  }
});

test('dark theme swaps the palette', () => {
  const svg = renderBodygraphSVG(chart, { theme: 'dark' });
  assert.ok(svg.includes(THEMES.dark.personality));
  assert.ok(!svg.includes(THEMES.light.centers.sacral));
});

test('planet columns render 26 activations when enabled', () => {
  const svg = renderBodygraphSVG(chart, { planetColumns: true });
  const acts = (svg.match(/font-weight="600"[^>]*>\d+\.\d/g) || []).length;
  assert.equal(acts, 26);
  assert.ok(svg.includes('DESIGN') && svg.includes('PERSONALITY'));
});

test('no DOM globals touched (pure string building)', () => {
  // Would throw ReferenceError under node if the module reached for document/window
  assert.equal(typeof renderBodygraphSVG(chart), 'string');
});

test('chart card is OG-sized with identity text and escaped name', () => {
  const card = renderChartCardSVG(chart, { name: 'A <"name"> & co' });
  assert.ok(card.includes('viewBox="0 0 1200 630"'));
  assert.ok(card.includes(chart.type.name));
  assert.ok(card.includes('A &lt;&quot;name&quot;'));
  assert.ok(!card.includes('A <"name">'));
  assert.ok(card.includes('openhumandesign.com'));
  const noFooter = renderChartCardSVG(chart, { footer: '' });
  assert.ok(!noFooter.includes('openhumandesign.com'));
});

test('reflector (zero definition) renders without errors', () => {
  const reflector = calculateHumanDesign('1985-11-17', 6, 0);
  const svg = renderBodygraphSVG(reflector);
  const undefinedCenters = (svg.match(new RegExp(`fill="${THEMES.light.undefinedCenter}"[^>]*data-center="`, 'g')) || []).length;
  assert.equal(undefinedCenters, 9);
  assert.ok(renderChartCardSVG(reflector).includes('Reflector'));
});

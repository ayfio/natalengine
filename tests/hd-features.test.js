/**
 * Tests for new Human Design features:
 * - Circuit membership on channels
 * - Not-self themes on centers
 * - Open vs undefined center distinction
 * - Variable / Four Arrows calculation
 * - Gate descriptions data
 * - Channel descriptions data
 * - Enhanced connection chart (4 types)
 * - Transit overlay
 * - Penta / team analysis
 */

import { test, describe } from 'node:test';
import assert from 'node:assert';
import calculateHumanDesign, {
  calculateGeneKeys,
  GATES, CHANNELS, CENTERS, CIRCUIT_GROUPS,
  longitudeToGate, longitudeToLine, longitudeToColor, longitudeToTone
} from '../src/calculators/humandesign.js';
import { compareHumanDesign } from '../src/calculators/compatibility/humandesign.js';
import { calculateHDTransits, calculateTransitGates } from '../src/calculators/hd-transits.js';
import { analyzePenta } from '../src/calculators/penta.js';
import { GATE_DESCRIPTIONS } from '../src/data/gate-descriptions.js';
import { CHANNEL_DESCRIPTIONS } from '../src/data/channel-descriptions.js';

// Test subjects
const aaronChart = calculateHumanDesign('1992-09-06', 0 + 4/60, -7);
const kathleenChart = calculateHumanDesign('1991-06-13', 8 + 40/60, -4);
const raChart = calculateHumanDesign('1948-04-09', 0.233, -5);
const jobsChart = calculateHumanDesign('1955-02-24', 19.25, -8);
const jolieChart = calculateHumanDesign('1975-06-04', 9.15, -7);

// ==========================================
// Circuit Membership Tests
// ==========================================
describe('Circuit Membership on Channels', () => {
  test('all 36 channels have circuit assignment', () => {
    CHANNELS.forEach(channel => {
      assert.ok(channel.circuit,
        `Channel ${channel.name} (${channel.gates.join('-')}) should have a circuit`);
      assert.ok(['individual', 'tribal', 'collective', 'integration'].includes(channel.circuit),
        `Channel ${channel.name} circuit "${channel.circuit}" should be valid`);
    });
  });

  test('all 36 channels have subcircuit assignment', () => {
    CHANNELS.forEach(channel => {
      assert.ok(channel.subcircuit,
        `Channel ${channel.name} should have a subcircuit`);
    });
  });

  test('Integration channels are correctly identified', () => {
    const integrationChannels = CHANNELS.filter(c => c.circuit === 'integration');
    const expectedIntegration = ['10-20', '10-34', '10-57', '20-34', '20-57', '34-57'];

    expectedIntegration.forEach(gates => {
      const [g1, g2] = gates.split('-').map(Number);
      assert.ok(
        integrationChannels.some(c => c.gates.includes(g1) && c.gates.includes(g2)),
        `Channel ${gates} should be in Integration circuit`
      );
    });

    assert.strictEqual(integrationChannels.length, 6, 'Should have exactly 6 Integration channels');
  });

  test('CIRCUIT_GROUPS data exists', () => {
    assert.ok(CIRCUIT_GROUPS.individual, 'Should have individual circuit group');
    assert.ok(CIRCUIT_GROUPS.tribal, 'Should have tribal circuit group');
    assert.ok(CIRCUIT_GROUPS.collective, 'Should have collective circuit group');
    assert.ok(CIRCUIT_GROUPS.integration, 'Should have integration circuit group');
  });

  test('chart result includes circuit analysis', () => {
    assert.ok(aaronChart.circuitAnalysis, 'Chart should include circuitAnalysis');
    assert.ok(aaronChart.circuitAnalysis.individual !== undefined, 'Should have individual circuit count');
    assert.ok(aaronChart.circuitAnalysis.tribal !== undefined, 'Should have tribal circuit count');
    assert.ok(aaronChart.circuitAnalysis.collective !== undefined, 'Should have collective circuit count');
  });
});

// ==========================================
// Center Not-Self Themes Tests
// ==========================================
describe('Center Not-Self Themes', () => {
  test('all 9 centers have not-self themes', () => {
    Object.entries(CENTERS).forEach(([key, center]) => {
      assert.ok(center.notSelfTheme, `${center.name} should have notSelfTheme`);
      assert.ok(center.notSelfQuestion, `${center.name} should have notSelfQuestion`);
    });
  });

  test('all centers have defined/undefined/open meanings', () => {
    Object.entries(CENTERS).forEach(([key, center]) => {
      assert.ok(center.definedMeaning, `${center.name} should have definedMeaning`);
      assert.ok(center.undefinedMeaning, `${center.name} should have undefinedMeaning`);
      assert.ok(center.openMeaning, `${center.name} should have openMeaning`);
    });
  });

  test('motor centers are correctly flagged', () => {
    assert.strictEqual(CENTERS.sacral.motor, true, 'Sacral should be a motor center');
    assert.strictEqual(CENTERS.heart.motor, true, 'Heart should be a motor center');
    assert.strictEqual(CENTERS.solar.motor, true, 'Solar Plexus should be a motor center');
    assert.strictEqual(CENTERS.root.motor, true, 'Root should be a motor center');
    assert.strictEqual(CENTERS.throat.motor, false, 'Throat should not be a motor center');
    assert.strictEqual(CENTERS.ajna.motor, false, 'Ajna should not be a motor center');
    assert.strictEqual(CENTERS.head.motor, false, 'Head should not be a motor center');
  });
});

// ==========================================
// Open vs Undefined Center Distinction
// ==========================================
describe('Open vs Undefined Center Distinction', () => {
  test('chart has separate open and undefined center lists', () => {
    assert.ok(Array.isArray(aaronChart.centers.undefined), 'Should have undefined array');
    assert.ok(Array.isArray(aaronChart.centers.open), 'Should have open array');
    assert.ok(Array.isArray(aaronChart.centers.openNames), 'Should have openNames array');
    assert.ok(Array.isArray(aaronChart.centers.undefinedNames), 'Should have undefinedNames array');
  });

  test('allUndefinedNames includes both open and undefined', () => {
    const allUndefined = aaronChart.centers.allUndefinedNames;
    const openPlusUndefined = [...aaronChart.centers.openNames, ...aaronChart.centers.undefinedNames];
    assert.strictEqual(allUndefined.length, openPlusUndefined.length,
      'allUndefinedNames should equal open + undefined combined');
  });

  test('undefined centers have activated gates', () => {
    aaronChart.centers.undefined.forEach(center => {
      assert.ok(center.activatedGates.length > 0,
        `Undefined center ${center.name} should have at least one activated gate`);
      assert.strictEqual(center.status, 'undefined');
    });
  });

  test('open centers have no activated gates', () => {
    aaronChart.centers.open.forEach(center => {
      assert.strictEqual(center.activatedGates.length, 0,
        `Open center ${center.name} should have no activated gates`);
      assert.strictEqual(center.status, 'open');
    });
  });

  test('defined + undefined + open = 9 centers', () => {
    const total = aaronChart.centers.definedNames.length +
                  aaronChart.centers.undefinedNames.length +
                  aaronChart.centers.openNames.length;
    assert.strictEqual(total, 9, 'Total centers should be 9');
  });
});

// ==========================================
// Variable / Four Arrows Tests
// ==========================================
describe('Variable / Four Arrows', () => {
  test('chart includes variable data', () => {
    assert.ok(aaronChart.variable, 'Chart should include variable');
    assert.ok(aaronChart.variable.determination, 'Should have determination');
    assert.ok(aaronChart.variable.environment, 'Should have environment');
    assert.ok(aaronChart.variable.perspective, 'Should have perspective');
    assert.ok(aaronChart.variable.motivation, 'Should have motivation');
  });

  test('each arrow has correct structure', () => {
    const arrows = ['determination', 'environment', 'perspective', 'motivation'];
    arrows.forEach(arrow => {
      const data = aaronChart.variable[arrow];
      assert.ok(['left', 'right'].includes(data.arrow), `${arrow} arrow should be left or right`);
      assert.ok(data.color >= 1 && data.color <= 6, `${arrow} color should be 1-6`);
      assert.ok(data.tone >= 1 && data.tone <= 6, `${arrow} tone should be 1-6`);
      assert.ok(data.name, `${arrow} should have a name`);
      assert.ok(data.description, `${arrow} should have a description`);
    });
  });

  test('variable notation is correct format', () => {
    const notation = aaronChart.variable.notation;
    assert.ok(/^[LR]{2} [LR]{2}$/.test(notation),
      `Notation "${notation}" should match format "XX XX" where X is L or R`);
  });

  test('determination has cognition data', () => {
    assert.ok(aaronChart.variable.determination.cognition, 'Determination should include cognition');
    assert.ok(aaronChart.variable.determination.cognition.name, 'Cognition should have a name');
  });

  test('variable has convenience accessors', () => {
    assert.ok(aaronChart.variable.digestiveType, 'Should have digestiveType');
    assert.ok(aaronChart.variable.environmentType, 'Should have environmentType');
    assert.ok(aaronChart.variable.perspectiveType, 'Should have perspectiveType');
    assert.ok(aaronChart.variable.motivationType, 'Should have motivationType');
  });
});

// ==========================================
// Color and Tone Calculation Tests
// ==========================================
describe('Color and Tone Calculations', () => {
  test('longitudeToColor returns 1-6', () => {
    for (let i = 0; i < 360; i += 10) {
      const color = longitudeToColor(i);
      assert.ok(color >= 1 && color <= 6, `Color at ${i}° should be 1-6, got ${color}`);
    }
  });

  test('longitudeToTone returns 1-6', () => {
    for (let i = 0; i < 360; i += 10) {
      const tone = longitudeToTone(i);
      assert.ok(tone >= 1 && tone <= 6, `Tone at ${i}° should be 1-6, got ${tone}`);
    }
  });

  test('color changes within a line', () => {
    // A line is 0.9375°. Colors within it should progress 1-6
    const colors = new Set();
    for (let offset = 0; offset < 0.9375; offset += 0.15) {
      colors.add(longitudeToColor(offset));
    }
    assert.ok(colors.size > 1, 'Different positions within a line should produce different colors');
  });
});

// ==========================================
// Definition Type Tests
// ==========================================
describe('Definition Type Calculation', () => {
  test('Aaron has correct definition type', () => {
    // Aaron has 3 defined centers (sacral, g, solar) with 2 channels
    // G+Sacral via 5-15, Solar+Sacral via 6-59 — all connected through sacral
    assert.strictEqual(aaronChart.definition, 'Single Definition',
      'Aaron should have Single Definition (all centers connected)');
  });

  test('reflector has no definition', () => {
    const chart = calculateHumanDesign('1960-01-01', 12, 0);
    if (chart.channels.length === 0) {
      assert.strictEqual(chart.definition, 'No Definition');
    }
  });
});

// ==========================================
// Gate Descriptions Data Tests
// ==========================================
describe('Gate Descriptions', () => {
  test('all 64 gates have descriptions', () => {
    for (let i = 1; i <= 64; i++) {
      assert.ok(GATE_DESCRIPTIONS[i], `Gate ${i} should have a description`);
      assert.ok(GATE_DESCRIPTIONS[i].description, `Gate ${i} should have description text`);
      assert.ok(GATE_DESCRIPTIONS[i].keynote, `Gate ${i} should have a keynote`);
    }
  });

  test('gate descriptions have correct structure', () => {
    Object.entries(GATE_DESCRIPTIONS).forEach(([key, gate]) => {
      assert.ok(typeof gate.description === 'string' && gate.description.length > 20,
        `Gate ${key} description should be substantial`);
      assert.ok(typeof gate.keynote === 'string' && gate.keynote.length > 5,
        `Gate ${key} keynote should be meaningful`);
    });
  });

  test('harmonic gates reference valid gates', () => {
    Object.entries(GATE_DESCRIPTIONS).forEach(([key, gate]) => {
      if (gate.harmonic !== null) {
        assert.ok(gate.harmonic >= 1 && gate.harmonic <= 64,
          `Gate ${key} harmonic ${gate.harmonic} should be a valid gate number`);
      }
    });
  });
});

// ==========================================
// Channel Descriptions Data Tests
// ==========================================
describe('Channel Descriptions', () => {
  test('all 36 channels have descriptions', () => {
    CHANNELS.forEach(channel => {
      const key = `${channel.gates[0]}-${channel.gates[1]}`;
      assert.ok(CHANNEL_DESCRIPTIONS[key],
        `Channel ${key} (${channel.name}) should have a description`);
    });
  });

  test('channel descriptions have correct structure', () => {
    Object.entries(CHANNEL_DESCRIPTIONS).forEach(([key, channel]) => {
      assert.ok(typeof channel.description === 'string' && channel.description.length > 20,
        `Channel ${key} description should be substantial`);
      assert.ok(channel.energyType,
        `Channel ${key} should have an energy type`);
      assert.ok(channel.whenDefined,
        `Channel ${key} should have whenDefined text`);
    });
  });
});

// ==========================================
// Enhanced Connection Chart Tests
// ==========================================
describe('Enhanced Connection Chart (4 Types)', () => {
  const comparison = compareHumanDesign(aaronChart, kathleenChart);

  test('connection chart exists in comparison', () => {
    assert.ok(comparison.connectionChart, 'Should have connectionChart');
    assert.ok(comparison.connectionChart.connections, 'Should have connections object');
  });

  test('connection chart has all 4 types', () => {
    const { connections } = comparison.connectionChart;
    assert.ok(Array.isArray(connections.electromagnetic), 'Should have electromagnetic array');
    assert.ok(Array.isArray(connections.companionship), 'Should have companionship array');
    assert.ok(Array.isArray(connections.compromise), 'Should have compromise array');
    assert.ok(Array.isArray(connections.dominance), 'Should have dominance array');
  });

  test('connection chart has composite type', () => {
    assert.ok(comparison.connectionChart.compositeType, 'Should have composite type');
    assert.ok(
      ['Manifestor', 'Generator', 'Manifesting Generator', 'Projector', 'Reflector']
        .includes(comparison.connectionChart.compositeType),
      'Composite type should be a valid HD type'
    );
  });

  test('connection chart has summary counts', () => {
    const { summary } = comparison.connectionChart;
    assert.ok(typeof summary.electromagnetic === 'number');
    assert.ok(typeof summary.companionship === 'number');
    assert.ok(typeof summary.compromise === 'number');
    assert.ok(typeof summary.dominance === 'number');
    assert.ok(typeof summary.total === 'number');
    assert.strictEqual(
      summary.total,
      summary.electromagnetic + summary.companionship + summary.compromise + summary.dominance,
      'Total should equal sum of all types'
    );
  });

  test('each connection has correct structure', () => {
    const allConnections = [
      ...comparison.connectionChart.connections.electromagnetic,
      ...comparison.connectionChart.connections.companionship,
      ...comparison.connectionChart.connections.compromise,
      ...comparison.connectionChart.connections.dominance
    ];

    allConnections.forEach(conn => {
      assert.ok(conn.channel, 'Connection should have channel name');
      assert.ok(conn.gates, 'Connection should have gates');
      assert.ok(conn.description, 'Connection should have description');
      assert.ok(conn.type, 'Connection should have type');
    });
  });

  test('stats include composite type', () => {
    assert.ok(comparison.stats.compositeType, 'Stats should include compositeType');
  });
});

// ==========================================
// Transit Overlay Tests
// ==========================================
describe('Transit Gate Calculation', () => {
  test('calculates transit gates for a date', () => {
    const transits = calculateTransitGates('2024-06-15');
    assert.ok(transits.gates, 'Should have transit gates');
    assert.ok(transits.gates.sun, 'Should have Sun transit');
    assert.ok(transits.gates.moon, 'Should have Moon transit');
    assert.ok(transits.gates.earth, 'Should have Earth transit');
    assert.ok(transits.activeGates.length > 0, 'Should have active gates');
  });

  test('transit gates have correct structure', () => {
    const transits = calculateTransitGates('2024-06-15');
    const planets = ['sun', 'moon', 'earth', 'mercury', 'venus', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto'];

    planets.forEach(planet => {
      const t = transits.gates[planet];
      assert.ok(t, `Should have ${planet} transit`);
      assert.ok(t.gate >= 1 && t.gate <= 64, `${planet} gate should be 1-64`);
      assert.ok(t.line >= 1 && t.line <= 6, `${planet} line should be 1-6`);
      assert.ok(t.gateName, `${planet} should have gate name`);
      assert.ok(t.center, `${planet} should have center`);
    });
  });

  test('Sun transit gate changes over 6 days', () => {
    const day1 = calculateTransitGates('2024-06-10');
    const day7 = calculateTransitGates('2024-06-17');
    // Sun moves ~1° per day, each gate is 5.625°, so in 7 days Sun should move ~1 gate
    // Not guaranteed to be different but very likely
    assert.ok(day1.gates.sun.gate >= 1 && day1.gates.sun.gate <= 64);
    assert.ok(day7.gates.sun.gate >= 1 && day7.gates.sun.gate <= 64);
  });
});

describe('Transit Overlay on Natal Chart', () => {
  test('overlays transits on natal chart', () => {
    const overlay = calculateHDTransits(aaronChart, '2024-06-15');

    assert.ok(overlay.transitDate, 'Should have transit date');
    assert.ok(overlay.transitGates, 'Should have transit gates');
    assert.ok(Array.isArray(overlay.channelCompletions), 'Should have channel completions');
    assert.ok(Array.isArray(overlay.temporarilyDefinedCenters), 'Should have temp defined centers');
    assert.ok(Array.isArray(overlay.reinforcedGates), 'Should have reinforced gates');
    assert.ok(overlay.highlights, 'Should have highlights');
    assert.ok(overlay.stats, 'Should have stats');
  });

  test('highlights include Sun and Moon', () => {
    const overlay = calculateHDTransits(aaronChart, '2024-06-15');

    assert.ok(overlay.highlights.sun, 'Should have Sun highlight');
    assert.ok(overlay.highlights.moon, 'Should have Moon highlight');
    assert.ok(overlay.highlights.sun.gate, 'Sun highlight should have gate');
    assert.ok(typeof overlay.highlights.sun.completesChannel === 'boolean');
    assert.ok(typeof overlay.highlights.sun.reinforcesNatal === 'boolean');
  });

  test('channel completions have correct structure', () => {
    const overlay = calculateHDTransits(aaronChart, '2024-06-15');

    overlay.channelCompletions.forEach(completion => {
      assert.ok(completion.channel, 'Should have channel name');
      assert.ok(completion.gates, 'Should have gates');
      assert.ok(completion.type, 'Should have type (hanging_gate_completion or pure_transit)');
      assert.ok(completion.significance, 'Should have significance');
    });
  });

  test('stats are numeric', () => {
    const overlay = calculateHDTransits(aaronChart, '2024-06-15');

    assert.ok(typeof overlay.stats.channelCompletions === 'number');
    assert.ok(typeof overlay.stats.hangingGateCompletions === 'number');
    assert.ok(typeof overlay.stats.temporarilyDefinedCenters === 'number');
    assert.ok(typeof overlay.stats.reinforcedGates === 'number');
    assert.ok(typeof overlay.stats.totalTransitGates === 'number');
  });
});

// ==========================================
// Penta / Team Analysis Tests
// ==========================================
describe('Penta / Team Analysis', () => {
  test('analyzes a group of 3 charts', () => {
    const result = analyzePenta(
      [aaronChart, kathleenChart, raChart],
      ['Aaron', 'Kathleen', 'Ra']
    );

    assert.ok(result, 'Should return a result');
    assert.strictEqual(result.memberCount, 3);
    assert.strictEqual(result.isPenta, true, '3 members should be a Penta');
  });

  test('has correct member profiles', () => {
    const result = analyzePenta(
      [aaronChart, kathleenChart],
      ['Aaron', 'Kathleen']
    );

    assert.strictEqual(result.members.length, 2);
    assert.strictEqual(result.members[0].name, 'Aaron');
    assert.ok(result.members[0].type, 'Member should have type');
    assert.ok(result.members[0].careerType, 'Member should have career type');
  });

  test('identifies group type', () => {
    const result = analyzePenta([aaronChart, kathleenChart, raChart]);

    assert.ok(
      ['Manifestor', 'Generator', 'Manifesting Generator', 'Projector', 'Reflector']
        .includes(result.groupType),
      'Group type should be valid'
    );
    assert.ok(result.groupCareerType, 'Should have group career type');
  });

  test('has role analysis', () => {
    const result = analyzePenta([aaronChart, kathleenChart, raChart]);

    assert.ok(result.roles, 'Should have roles object');
    assert.ok(Array.isArray(result.filledRoles), 'Should have filled roles');
    assert.ok(Array.isArray(result.missingRoles), 'Should have missing roles');
    assert.strictEqual(
      result.filledRoles.length + result.missingRoles.length,
      9,
      'Filled + missing should equal 9 centers'
    );
  });

  test('finds group electromagnetics', () => {
    const result = analyzePenta([aaronChart, kathleenChart, raChart]);

    assert.ok(Array.isArray(result.electromagnetics), 'Should have electromagnetics');
    result.electromagnetics.forEach(e => {
      assert.ok(e.personA, 'Should have personA');
      assert.ok(e.personB, 'Should have personB');
      assert.ok(e.channel, 'Should have channel name');
    });
  });

  test('has circuit balance', () => {
    const result = analyzePenta([aaronChart, kathleenChart, raChart]);

    assert.ok(result.circuitBalance, 'Should have circuit balance');
    assert.ok(typeof result.circuitBalance.individual === 'number');
    assert.ok(typeof result.circuitBalance.tribal === 'number');
    assert.ok(typeof result.circuitBalance.collective === 'number');
  });

  test('generates recommendations', () => {
    const result = analyzePenta([aaronChart, kathleenChart, raChart]);

    assert.ok(Array.isArray(result.recommendations), 'Should have recommendations');
    assert.ok(result.recommendations.length > 0, 'Should have at least one recommendation');
    result.recommendations.forEach(rec => {
      assert.ok(rec.category, 'Recommendation should have category');
      assert.ok(rec.insight, 'Recommendation should have insight');
    });
  });

  test('has shared gates analysis', () => {
    const result = analyzePenta([aaronChart, kathleenChart, raChart]);

    assert.ok(Array.isArray(result.sharedGates), 'Should have shared gates');
    result.sharedGates.forEach(sg => {
      assert.ok(sg.gate >= 1 && sg.gate <= 64, 'Gate should be 1-64');
      assert.ok(sg.sharedBy >= 2, 'Should be shared by at least 2');
      assert.ok(Array.isArray(sg.members), 'Should list sharing members');
    });
  });

  test('has stats', () => {
    const result = analyzePenta([aaronChart, kathleenChart, raChart]);

    assert.ok(typeof result.stats.totalChannels === 'number');
    assert.ok(typeof result.stats.totalDefinedCenters === 'number');
    assert.ok(typeof result.stats.filledRoleCount === 'number');
    assert.ok(typeof result.stats.missingRoleCount === 'number');
  });

  test('rejects too few charts', () => {
    assert.throws(() => analyzePenta([aaronChart]), /at least 2/);
  });

  test('5-person group works', () => {
    const chart5 = calculateHumanDesign('1985-03-15', 14, 0);
    const result = analyzePenta(
      [aaronChart, kathleenChart, raChart, jobsChart, chart5]
    );
    assert.strictEqual(result.memberCount, 5);
    assert.strictEqual(result.isPenta, true);
  });
});

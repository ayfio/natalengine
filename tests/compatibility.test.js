/**
 * Compatibility Tests for NatalEngine
 *
 * Tests synastry, Human Design compatibility, and Gene Keys comparison
 */

import { test, describe } from 'node:test';
import assert from 'node:assert';
import { calculateAstrology } from '../src/calculators/astrology.js';
import calculateHumanDesign, { calculateGeneKeys } from '../src/calculators/humandesign.js';
import { compareAstrology } from '../src/calculators/compatibility/astrology.js';
import { compareHumanDesign as compareHD } from '../src/calculators/compatibility/humandesign.js';
import { compareGeneKeys as compareGK } from '../src/calculators/compatibility/genekeys.js';

// Test subjects
const personA = {
  astrology: calculateAstrology('1992-09-06', 0.067, -7, 44.0486, -122.5856),
  humanDesign: calculateHumanDesign('1992-09-06', 0.067, -7),
};
personA.geneKeys = calculateGeneKeys(personA.humanDesign);

const personB = {
  astrology: calculateAstrology('1991-06-13', 8.667, -4, 42.5195, -70.8967),
  humanDesign: calculateHumanDesign('1991-06-13', 8.667, -4),
};
personB.geneKeys = calculateGeneKeys(personB.humanDesign);

describe('Astrology Synastry', () => {
  test('returns comparison with required fields', () => {
    const result = compareAstrology(personA.astrology, personB.astrology);

    assert.ok(result, 'Should return a result');
    assert.ok(Array.isArray(result.synastryAspects), 'Should have synastryAspects array');
    assert.ok(typeof result.overallScore === 'number', 'Should have numeric overall score');
    assert.ok(result.overallScore >= 0 && result.overallScore <= 100, 'Score should be 0-100');
    assert.ok(result.elementHarmony, 'Should have element harmony');
    assert.ok(result.aspectSummary, 'Should have aspect summary');
    assert.ok(result.scoreLabel, 'Should have score label');
  });

  test('finds cross-chart aspects', () => {
    const result = compareAstrology(personA.astrology, personB.astrology);

    assert.ok(result.synastryAspects.length > 0, 'Should find some cross-chart aspects');

    result.synastryAspects.forEach(aspect => {
      assert.ok(aspect.planetA, 'Each aspect should have planetA');
      assert.ok(aspect.planetB, 'Each aspect should have planetB');
      assert.ok(aspect.aspect, 'Each aspect should have aspect type');
      assert.ok(typeof aspect.orb === 'number', 'Each aspect should have numeric orb');
    });
  });

  test('self-comparison has high compatibility', () => {
    const result = compareAstrology(personA.astrology, personA.astrology);
    assert.ok(result.overallScore >= 70, 'Self-comparison should score highly');
  });
});

describe('Human Design Compatibility', () => {
  test('returns comparison with type interaction', () => {
    const result = compareHD(personA.humanDesign, personB.humanDesign);

    assert.ok(result, 'Should return a result');
    assert.ok(result.typeInteraction, 'Should have type interaction');
    assert.ok(result.typeInteraction.typeA, 'Should have type A');
    assert.ok(result.typeInteraction.typeB, 'Should have type B');
  });

  test('finds electromagnetic connections', () => {
    const result = compareHD(personA.humanDesign, personB.humanDesign);

    assert.ok(Array.isArray(result.electromagneticPairs), 'Should have electromagnetic pairs array');
  });

  test('identifies shared gates', () => {
    const result = compareHD(personA.humanDesign, personB.humanDesign);

    assert.ok(Array.isArray(result.sharedGates), 'Should have shared gates array');
    result.sharedGates.forEach(item => {
      assert.ok(item.gate >= 1 && item.gate <= 64, `Shared gate should be 1-64, got ${item.gate}`);
      assert.ok(item.name, 'Shared gate should have a name');
    });
  });
});

describe('Gene Keys Compatibility', () => {
  test('returns comparison with shared keys', () => {
    const result = compareGK(personA.geneKeys, personB.geneKeys);

    assert.ok(result, 'Should return a result');
    assert.ok(Array.isArray(result.sharedKeys), 'Should have shared keys array');
  });

  test('identifies complementary pairs', () => {
    const result = compareGK(personA.geneKeys, personB.geneKeys);

    assert.ok(Array.isArray(result.complementaryPairs), 'Should have complementary pairs array');
  });

  test('has activation, venus, and pearl alignment', () => {
    const result = compareGK(personA.geneKeys, personB.geneKeys);

    assert.ok(result.activationAlignment, 'Should have activation alignment');
    assert.ok(result.venusAlignment, 'Should have venus alignment');
    assert.ok(result.pearlAlignment, 'Should have pearl alignment');
    assert.ok(result.stats, 'Should have stats');
  });
});

describe('Edge Cases', () => {
  test('same person comparison works', () => {
    const result = compareHD(personA.humanDesign, personA.humanDesign);
    assert.ok(result, 'Self-comparison should work');
  });

  test('different time zones produce valid results', () => {
    // Person from Tokyo (+9) vs Person from New York (-5)
    const tokyo = calculateAstrology('1990-01-01', 12, 9);
    const nyc = calculateAstrology('1990-01-01', 12, -5);

    const result = compareAstrology(tokyo, nyc);
    assert.ok(result, 'Cross-timezone comparison should work');
    assert.ok(typeof result.overallScore === 'number', 'Should produce a valid score');
  });
});

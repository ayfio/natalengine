/**
 * Input Validation Tests for NatalEngine
 *
 * Tests edge cases, boundary conditions, and input validation
 */

import { test, describe } from 'node:test';
import assert from 'node:assert';
import { calculateAstrology } from '../src/calculators/astrology.js';
import calculateHumanDesign, { calculateGeneKeys } from '../src/calculators/humandesign.js';
import { calculateBirthPositions, getZodiacSign } from '../src/calculators/astronomy.js';

describe('Boundary Date Tests', () => {
  test('February 29 leap year (2000) produces valid results', () => {
    const result = calculateAstrology('2000-02-29', 12, 0);
    assert.ok(result.sun.sign.name, 'Should calculate sun sign for leap year date');
    assert.strictEqual(result.sun.sign.name, 'Pisces', 'Feb 29 should be Pisces');
  });

  test('January 1 at midnight produces valid results', () => {
    const result = calculateAstrology('2000-01-01', 0, 0);
    assert.ok(result.sun.sign.name, 'Should handle midnight');
  });

  test('December 31 at 23:59 produces valid results', () => {
    const result = calculateAstrology('2000-12-31', 23.983, 0);
    assert.ok(result.sun.sign.name, 'Should handle end of year');
  });

  test('Historical date (1900) produces valid results', () => {
    const result = calculateAstrology('1900-06-15', 12, 0);
    assert.ok(result.sun.sign.name, 'Should handle historical dates');
    assert.strictEqual(result.sun.sign.name, 'Gemini', 'June 15 should be Gemini');
  });

  test('Far future date (2100) produces valid results', () => {
    const result = calculateAstrology('2100-06-15', 12, 0);
    assert.ok(result.sun.sign.name, 'Should handle future dates');
  });
});

describe('Extreme Location Tests', () => {
  test('North Pole coordinates produce valid chart', () => {
    const result = calculateAstrology('2000-06-15', 12, 0, 89, 0);
    assert.ok(result.sun.sign.name, 'Should calculate for near-polar latitude');
  });

  test('South Pole coordinates produce valid chart', () => {
    const result = calculateAstrology('2000-06-15', 12, 0, -89, 0);
    assert.ok(result.sun.sign.name, 'Should calculate for southern polar latitude');
  });

  test('International Date Line produces valid chart', () => {
    const result = calculateAstrology('2000-06-15', 12, 12, 0, 179);
    assert.ok(result.sun.sign.name, 'Should handle date line longitude');
  });

  test('Negative timezone produces valid chart', () => {
    const result = calculateAstrology('2000-06-15', 12, -12, 0, -170);
    assert.ok(result.sun.sign.name, 'Should handle extreme negative timezone');
  });
});

describe('getZodiacSign Boundaries', () => {
  test('0 degrees is Aries', () => {
    assert.strictEqual(getZodiacSign(0), 'Aries');
  });

  test('29.99 degrees is still Aries', () => {
    assert.strictEqual(getZodiacSign(29.99), 'Aries');
  });

  test('30 degrees is Taurus', () => {
    assert.strictEqual(getZodiacSign(30), 'Taurus');
  });

  test('359.99 degrees is Pisces', () => {
    assert.strictEqual(getZodiacSign(359.99), 'Pisces');
  });

  test('360 degrees wraps to Aries', () => {
    assert.strictEqual(getZodiacSign(360), 'Aries');
  });
});

describe('Human Design Edge Cases', () => {
  test('noon birth produces valid HD chart', () => {
    const result = calculateHumanDesign('2000-06-15', 12, 0);
    assert.ok(['Generator', 'Manifesting Generator', 'Projector', 'Manifestor', 'Reflector'].includes(result.type.name));
    assert.ok(result.profile.numbers.match(/^\d\/\d$/), 'Profile should be X/Y format');
  });

  test('Gene Keys from HD data has all sequences', () => {
    const hd = calculateHumanDesign('2000-06-15', 12, 0);
    const gk = calculateGeneKeys(hd);

    assert.ok(gk.activationSequence, 'Should have activation sequence');
    assert.ok(gk.venusSequence, 'Should have venus sequence');
    assert.ok(gk.pearlSequence, 'Should have pearl sequence');

    // Check all spheres exist
    assert.ok(gk.activationSequence.lifeWork, 'Should have Life Work');
    assert.ok(gk.activationSequence.evolution, 'Should have Evolution');
    assert.ok(gk.activationSequence.radiance, 'Should have Radiance');
    assert.ok(gk.activationSequence.purpose, 'Should have Purpose');
    assert.ok(gk.venusSequence.attraction, 'Should have Attraction');
    assert.ok(gk.venusSequence.iq, 'Should have IQ');
    assert.ok(gk.venusSequence.eq, 'Should have EQ');
    assert.ok(gk.venusSequence.sq, 'Should have SQ');
    assert.ok(gk.pearlSequence.vocation, 'Should have Vocation');
    assert.ok(gk.pearlSequence.culture, 'Should have Culture');
    assert.ok(gk.pearlSequence.pearl, 'Should have Pearl');
  });

  test('all Gene Key spheres have shadow/gift/siddhi', () => {
    const hd = calculateHumanDesign('1985-03-15', 14, 0);
    const gk = calculateGeneKeys(hd);

    const allSpheres = [
      gk.activationSequence.lifeWork,
      gk.activationSequence.evolution,
      gk.activationSequence.radiance,
      gk.activationSequence.purpose,
      gk.venusSequence.attraction,
      gk.venusSequence.iq,
      gk.venusSequence.eq,
      gk.venusSequence.sq,
      gk.pearlSequence.vocation,
      gk.pearlSequence.culture,
      gk.pearlSequence.pearl,
    ];

    allSpheres.forEach(sphere => {
      assert.ok(sphere.key >= 1 && sphere.key <= 64, `Key should be 1-64, got ${sphere.key}`);
      assert.ok(sphere.shadow, `${sphere.sphere || 'sphere'} should have shadow`);
      assert.ok(sphere.gift, `${sphere.sphere || 'sphere'} should have gift`);
      assert.ok(sphere.siddhi, `${sphere.sphere || 'sphere'} should have siddhi`);
    });
  });
});

describe('Astrology Return Structure', () => {
  test('complete chart has all required fields', () => {
    const result = calculateAstrology('2000-06-15', 12, 0, 40.7128, -74.006);

    // Big three
    assert.ok(result.sun, 'Should have sun');
    assert.ok(result.moon, 'Should have moon');
    assert.ok(result.rising, 'Should have rising');
    assert.ok(result.bigThree, 'Should have bigThree string');

    // Planets
    const expectedPlanets = ['mercury', 'venus', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto'];
    expectedPlanets.forEach(planet => {
      assert.ok(result.planets[planet], `Should have ${planet}`);
      assert.ok(result.planets[planet].sign, `${planet} should have sign`);
      assert.ok(typeof result.planets[planet].longitude === 'number', `${planet} should have longitude`);
    });

    // Nodes
    assert.ok(result.nodes.north, 'Should have north node');
    assert.ok(result.nodes.south, 'Should have south node');

    // Midheaven (requires location)
    assert.ok(result.midheaven, 'Should have midheaven when location provided');

    // Aspects
    assert.ok(Array.isArray(result.aspects), 'Should have aspects array');

    // Balance
    assert.ok(result.balance.elements, 'Should have element balance');
    assert.ok(result.balance.modalities, 'Should have modality balance');
    assert.ok(result.balance.dominantElement, 'Should have dominant element');
    assert.ok(result.balance.dominantModality, 'Should have dominant modality');
  });

  test('chart without location has no midheaven', () => {
    const result = calculateAstrology('2000-06-15', 12, 0);
    assert.ok(!result.midheaven, 'Should not have midheaven without location');
    assert.ok(!result.hasLocation, 'hasLocation should be false');
  });
});

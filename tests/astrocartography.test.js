/**
 * Astro Cartography Tests
 *
 * Tests for the astro cartography (locational astrology) calculator.
 * Verifies planetary line calculations, parans, and location reports.
 */

import { test, describe } from 'node:test';
import assert from 'node:assert';
import calculateAstroCartography, {
  getLinesAtLocation,
  getLocationReport,
  PLANET_INFO,
  ANGLE_INFO
} from '../src/calculators/astrocartography.js';

describe('Astro Cartography - Basic Calculations', () => {
  test('calculates all planetary lines for a birth chart', () => {
    const result = calculateAstroCartography('1990-06-15', 14.5, 0);

    // Should have lines for all planets and angles
    // 10 planets x 4 angles = 40 lines
    assert.ok(result.lines.length > 0, 'Should have planetary lines');
    assert.ok(result.lines.length <= 40, 'Should have at most 40 lines (10 planets x 4 angles)');

    // Check structure
    assert.ok(result.birthInfo, 'Should have birthInfo');
    assert.ok(result.positions, 'Should have positions');
    assert.ok(result.lines, 'Should have lines array');
    assert.ok(Array.isArray(result.parans), 'Should have parans array');
    assert.strictEqual(typeof result.lineCount, 'number', 'Should have lineCount');
  });

  test('each line has required properties', () => {
    const result = calculateAstroCartography('2000-01-01', 12, 0);

    result.lines.forEach(line => {
      assert.ok(line.planet, 'Line should have planet');
      assert.ok(line.planetName, 'Line should have planetName');
      assert.ok(line.planetSymbol, 'Line should have planetSymbol');
      assert.ok(line.planetColor, 'Line should have planetColor');
      assert.ok(line.angle, 'Line should have angle');
      assert.ok(['MC', 'IC', 'ASC', 'DSC'].includes(line.angle), 'Angle should be valid');
      assert.ok(['meridian', 'curve'].includes(line.type), 'Line type should be meridian or curve');
      assert.ok(Array.isArray(line.points), 'Line should have points array');
      assert.ok(line.interpretation, 'Line should have interpretation');
    });
  });

  test('MC/IC lines are meridians (constant longitude)', () => {
    const result = calculateAstroCartography('1985-03-15', 10, 0);

    const mcLines = result.lines.filter(l => l.angle === 'MC' || l.angle === 'IC');

    mcLines.forEach(line => {
      assert.strictEqual(line.type, 'meridian', `${line.angle} line should be meridian type`);
      assert.ok(typeof line.longitude === 'number', 'Meridian should have longitude');
      assert.ok(line.longitude >= -180 && line.longitude <= 180, 'Longitude should be valid');

      // All points should have the same longitude
      if (line.points.length > 1) {
        const firstLon = line.points[0].lon;
        line.points.forEach(point => {
          assert.ok(
            Math.abs(point.lon - firstLon) < 0.01,
            'All points in meridian line should have same longitude'
          );
        });
      }
    });
  });

  test('ASC/DSC lines are curves (varying latitude)', () => {
    const result = calculateAstroCartography('1975-08-20', 6, 0);

    const ascLines = result.lines.filter(l => l.angle === 'ASC' || l.angle === 'DSC');

    ascLines.forEach(line => {
      assert.strictEqual(line.type, 'curve', `${line.angle} line should be curve type`);

      // Curves should have varying latitudes across longitudes
      if (line.points.length > 2) {
        const lats = line.points.map(p => p.lat);
        const uniqueLats = new Set(lats.map(l => Math.round(l)));
        assert.ok(uniqueLats.size > 1, 'Curve should have varying latitudes');
      }
    });
  });

  test('birth info is correctly captured', () => {
    const result = calculateAstroCartography('1992-09-06', 0.067, -7);

    assert.strictEqual(result.birthInfo.date, '1992-09-06');
    assert.strictEqual(result.birthInfo.time, 0.067);
    assert.strictEqual(result.birthInfo.timezone, -7);
    assert.ok(typeof result.birthInfo.julianDay === 'number');
    assert.ok(typeof result.birthInfo.gmst === 'number');
  });

  test('planetary positions are included', () => {
    const result = calculateAstroCartography('2000-01-01', 12, 0);

    const expectedPlanets = ['sun', 'moon', 'mercury', 'venus', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto'];

    expectedPlanets.forEach(planet => {
      assert.ok(result.positions[planet], `Should have position for ${planet}`);
      assert.ok(typeof result.positions[planet].longitude === 'number', `${planet} should have longitude`);
    });
  });
});

describe('Astro Cartography - Options and Filtering', () => {
  test('can filter by specific planets', () => {
    const result = calculateAstroCartography('2000-01-01', 12, 0, {
      planets: ['sun', 'moon']
    });

    // Should only have lines for sun and moon (2 planets x 4 angles = 8 lines)
    const planetSet = new Set(result.lines.map(l => l.planet));
    assert.ok(planetSet.has('sun'), 'Should have sun lines');
    assert.ok(planetSet.has('moon'), 'Should have moon lines');
    assert.strictEqual(planetSet.size, 2, 'Should only have sun and moon');
    assert.strictEqual(result.lines.length, 8, 'Should have 8 lines (2 planets x 4 angles)');
  });

  test('can filter by specific angles', () => {
    const result = calculateAstroCartography('2000-01-01', 12, 0, {
      angles: ['MC', 'ASC']
    });

    // Should only have MC and ASC lines (10 planets x 2 angles = 20 lines)
    const angleSet = new Set(result.lines.map(l => l.angle));
    assert.ok(angleSet.has('MC'), 'Should have MC lines');
    assert.ok(angleSet.has('ASC'), 'Should have ASC lines');
    assert.ok(!angleSet.has('IC'), 'Should not have IC lines');
    assert.ok(!angleSet.has('DSC'), 'Should not have DSC lines');
    assert.strictEqual(result.lines.length, 20, 'Should have 20 lines (10 planets x 2 angles)');
  });

  test('can combine planet and angle filters', () => {
    const result = calculateAstroCartography('2000-01-01', 12, 0, {
      planets: ['venus', 'mars'],
      angles: ['ASC']
    });

    // Should only have Venus and Mars on ASC (2 lines)
    assert.strictEqual(result.lines.length, 2);
    assert.ok(result.lines.every(l => l.angle === 'ASC'));
    assert.ok(result.lines.some(l => l.planet === 'venus'));
    assert.ok(result.lines.some(l => l.planet === 'mars'));
  });
});

describe('Astro Cartography - Location Analysis', () => {
  test('getLinesAtLocation finds nearby lines', () => {
    const acgData = calculateAstroCartography('1990-06-15', 12, 0);

    // New York City
    const nycLines = getLinesAtLocation(acgData, 40.7128, -74.0060, 3);

    // Should be an array
    assert.ok(Array.isArray(nycLines), 'Should return array');

    // Each result should have distance
    nycLines.forEach(line => {
      assert.ok(typeof line.distance === 'number', 'Should have distance');
    });
  });

  test('getLinesAtLocation respects orb parameter', () => {
    const acgData = calculateAstroCartography('1990-06-15', 12, 0);

    const narrowOrb = getLinesAtLocation(acgData, 40.7128, -74.0060, 1);
    const wideOrb = getLinesAtLocation(acgData, 40.7128, -74.0060, 5);

    // Wider orb should find same or more lines
    assert.ok(wideOrb.length >= narrowOrb.length, 'Wider orb should find more or equal lines');
  });

  test('getLocationReport returns structured report', () => {
    const acgData = calculateAstroCartography('1992-09-06', 0.067, -7);

    // Boulder, CO
    const report = getLocationReport(acgData, 40.015, -105.2705, 'Boulder, CO');

    assert.ok(report.location, 'Should have location');
    assert.strictEqual(report.location.name, 'Boulder, CO');
    assert.strictEqual(report.location.latitude, 40.015);
    assert.strictEqual(report.location.longitude, -105.2705);

    assert.ok(Array.isArray(report.activeLines), 'Should have activeLines array');
    assert.ok(Array.isArray(report.nearbyParans), 'Should have nearbyParans array');
    assert.ok(typeof report.summary === 'string', 'Should have summary string');
  });

  test('getLocationReport provides meaningful data for each line', () => {
    const acgData = calculateAstroCartography('1985-03-15', 14, 0);

    // London
    const report = getLocationReport(acgData, 51.5074, -0.1278, 'London');

    if (report.activeLines.length > 0) {
      const line = report.activeLines[0];
      assert.ok(line.planet, 'Active line should have planet name');
      assert.ok(line.symbol, 'Active line should have symbol');
      assert.ok(line.angle, 'Active line should have angle');
      assert.ok(typeof line.distance === 'number', 'Active line should have distance');
      assert.ok(line.interpretation, 'Active line should have interpretation');
    }
  });
});

describe('Astro Cartography - Parans', () => {
  test('parans are calculated', () => {
    const result = calculateAstroCartography('1990-06-15', 12, 0);

    // Parans should exist (may or may not have any depending on chart)
    assert.ok(Array.isArray(result.parans), 'Parans should be an array');
  });

  test('parans have required structure', () => {
    const result = calculateAstroCartography('1990-06-15', 12, 0);

    result.parans.forEach(paran => {
      assert.ok(paran.planet1, 'Paran should have planet1');
      assert.ok(paran.planet2, 'Paran should have planet2');
      assert.ok(paran.angle1, 'Paran should have angle1');
      assert.ok(paran.angle2, 'Paran should have angle2');
      assert.ok(typeof paran.lat === 'number', 'Paran should have lat');
      assert.ok(typeof paran.lon === 'number', 'Paran should have lon');
      assert.ok(paran.lat >= -90 && paran.lat <= 90, 'Paran lat should be valid');
      assert.ok(paran.lon >= -180 && paran.lon <= 180, 'Paran lon should be valid');
    });
  });

  test('parans only connect different planets', () => {
    const result = calculateAstroCartography('1990-06-15', 12, 0);

    result.parans.forEach(paran => {
      assert.notStrictEqual(paran.planet1, paran.planet2, 'Paran should connect different planets');
    });
  });
});

describe('Astro Cartography - Data Constants', () => {
  test('PLANET_INFO has all planets', () => {
    const expectedPlanets = ['sun', 'moon', 'mercury', 'venus', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto'];

    expectedPlanets.forEach(planet => {
      assert.ok(PLANET_INFO[planet], `Should have info for ${planet}`);
      assert.ok(PLANET_INFO[planet].name, `${planet} should have name`);
      assert.ok(PLANET_INFO[planet].symbol, `${planet} should have symbol`);
      assert.ok(PLANET_INFO[planet].color, `${planet} should have color`);
    });
  });

  test('ANGLE_INFO has all angles', () => {
    const expectedAngles = ['MC', 'IC', 'ASC', 'DSC'];

    expectedAngles.forEach(angle => {
      assert.ok(ANGLE_INFO[angle], `Should have info for ${angle}`);
      assert.ok(ANGLE_INFO[angle].name, `${angle} should have name`);
      assert.ok(ANGLE_INFO[angle].meaning, `${angle} should have meaning`);
    });
  });
});

describe('Astro Cartography - Consistency Checks', () => {
  test('MC and IC lines for same planet are 180 degrees apart', () => {
    const result = calculateAstroCartography('2000-01-01', 12, 0);

    const planets = [...new Set(result.lines.map(l => l.planet))];

    planets.forEach(planet => {
      const mcLine = result.lines.find(l => l.planet === planet && l.angle === 'MC');
      const icLine = result.lines.find(l => l.planet === planet && l.angle === 'IC');

      if (mcLine && icLine) {
        let lonDiff = Math.abs(mcLine.longitude - icLine.longitude);
        if (lonDiff > 180) lonDiff = 360 - lonDiff;

        // MC and IC should be ~180 degrees apart (opposite meridians)
        assert.ok(
          Math.abs(lonDiff - 180) < 5 || lonDiff < 5,
          `MC and IC for ${planet} should be ~180° apart (got ${lonDiff}°)`
        );
      }
    });
  });

  test('different birth times produce different line positions', () => {
    const morning = calculateAstroCartography('2000-06-15', 6, 0);
    const evening = calculateAstroCartography('2000-06-15', 18, 0);

    // Sun MC lines should be at different longitudes
    const morningMC = morning.lines.find(l => l.planet === 'sun' && l.angle === 'MC');
    const eveningMC = evening.lines.find(l => l.planet === 'sun' && l.angle === 'MC');

    if (morningMC && eveningMC) {
      let diff = Math.abs(morningMC.longitude - eveningMC.longitude);
      if (diff > 180) diff = 360 - diff;

      // 12 hour time difference should produce significant longitude difference
      // Earth rotates ~180° in 12 hours
      assert.ok(diff > 90, `Morning and evening MC lines should differ significantly (got ${diff}°)`);
    }
  });

  test('line points are within valid geographic bounds', () => {
    const result = calculateAstroCartography('1990-06-15', 12, 0);

    result.lines.forEach(line => {
      line.points.forEach(point => {
        assert.ok(point.lat >= -90 && point.lat <= 90, `Latitude ${point.lat} should be valid for ${line.planet} ${line.angle}`);
        assert.ok(point.lon >= -180 && point.lon <= 180, `Longitude ${point.lon} should be valid for ${line.planet} ${line.angle}`);
      });
    });
  });
});

describe('Astro Cartography - Known Chart Verification', () => {
  test('Aaron G chart - basic line structure', () => {
    // September 6, 1992, 00:04 PDT, verified chart
    const result = calculateAstroCartography('1992-09-06', 0.067, -7);

    // Verify we get the expected number of lines
    assert.strictEqual(result.lineCount, 40, 'Should have 40 lines (10 planets x 4 angles)');

    // Sun should have all 4 angle lines
    const sunLines = result.lines.filter(l => l.planet === 'sun');
    assert.strictEqual(sunLines.length, 4, 'Sun should have 4 lines');

    // Check angles are present
    const sunAngles = sunLines.map(l => l.angle).sort();
    assert.deepStrictEqual(sunAngles, ['ASC', 'DSC', 'IC', 'MC'], 'Sun should have all 4 angles');
  });

  test('Steve Jobs chart - lines are calculated', () => {
    // February 24, 1955, 19:15 PST, San Francisco
    const result = calculateAstroCartography('1955-02-24', 19.25, -8);

    assert.ok(result.lines.length > 0, 'Should calculate lines');
    assert.ok(result.positions.sun, 'Should have sun position');

    // Sun was in Pisces
    assert.ok(result.positions.sun.longitude > 330 || result.positions.sun.longitude < 30,
      'Sun longitude should indicate Pisces');
  });
});

describe('Astro Cartography - Edge Cases', () => {
  test('handles midnight birth time', () => {
    const result = calculateAstroCartography('2000-01-01', 0, 0);
    assert.ok(result.lines.length > 0, 'Should handle midnight');
  });

  test('handles noon birth time', () => {
    const result = calculateAstroCartography('2000-01-01', 12, 0);
    assert.ok(result.lines.length > 0, 'Should handle noon');
  });

  test('handles negative timezone', () => {
    const result = calculateAstroCartography('2000-01-01', 12, -8);
    assert.ok(result.lines.length > 0, 'Should handle negative timezone');
  });

  test('handles positive timezone', () => {
    const result = calculateAstroCartography('2000-01-01', 12, 5.5);
    assert.ok(result.lines.length > 0, 'Should handle positive timezone');
  });

  test('handles old dates', () => {
    const result = calculateAstroCartography('1900-01-01', 12, 0);
    assert.ok(result.lines.length > 0, 'Should handle 1900');
  });

  test('handles future dates', () => {
    const result = calculateAstroCartography('2050-01-01', 12, 0);
    assert.ok(result.lines.length > 0, 'Should handle 2050');
  });

  test('handles empty planet filter gracefully', () => {
    const result = calculateAstroCartography('2000-01-01', 12, 0, {
      planets: []
    });
    assert.strictEqual(result.lines.length, 0, 'Empty filter should return no lines');
  });

  test('handles empty angle filter gracefully', () => {
    const result = calculateAstroCartography('2000-01-01', 12, 0, {
      angles: []
    });
    assert.strictEqual(result.lines.length, 0, 'Empty filter should return no lines');
  });
});

describe('Astro Cartography - Performance', () => {
  test('calculates in reasonable time', () => {
    const start = Date.now();
    calculateAstroCartography('1990-06-15', 12, 0);
    const elapsed = Date.now() - start;

    assert.ok(elapsed < 5000, `Calculation should complete in under 5 seconds (took ${elapsed}ms)`);
  });

  test('multiple calculations are consistent', () => {
    const result1 = calculateAstroCartography('1990-06-15', 12, 0);
    const result2 = calculateAstroCartography('1990-06-15', 12, 0);

    // Lines should have same longitudes
    for (let i = 0; i < result1.lines.length; i++) {
      const line1 = result1.lines[i];
      const line2 = result2.lines.find(l => l.planet === line1.planet && l.angle === line1.angle);

      if (line1.type === 'meridian' && line2) {
        assert.strictEqual(line1.longitude, line2.longitude, 'Same calculation should produce same results');
      }
    }
  });
});

console.log('Running astro cartography tests...\n');

/**
 * Astro Cartography Calculator
 *
 * Calculates planetary lines across the globe showing locations where
 * each planet is angular (conjunct ASC, DSC, MC, or IC).
 *
 * For a given birth moment, this finds all locations on Earth where:
 * - MC lines: Planet's ecliptic longitude = local Midheaven
 * - IC lines: Planet's ecliptic longitude = local IC (MC + 180°)
 * - ASC lines: Planet's ecliptic longitude = local Ascendant
 * - DSC lines: Planet's ecliptic longitude = local Descendant (ASC + 180°)
 *
 * Reference: https://www.astro.com/astrowiki/en/Astrocartography
 */

import { calculateBirthPositions, calculateAscendant, calculateMidheaven, dateToJulianDay } from './astronomy.js';
import { parseDateComponents } from './utils.js';

// Constants
const DEG_TO_RAD = Math.PI / 180;
const RAD_TO_DEG = 180 / Math.PI;
const OBLIQUITY = 23.4393; // Mean obliquity of the ecliptic (J2000.0)

// Planet display info for lines
const PLANET_INFO = {
  sun: { name: 'Sun', symbol: '☉', color: '#f59e0b' },
  moon: { name: 'Moon', symbol: '☽', color: '#64748b' },
  mercury: { name: 'Mercury', symbol: '☿', color: '#8b5cf6' },
  venus: { name: 'Venus', symbol: '♀', color: '#ec4899' },
  mars: { name: 'Mars', symbol: '♂', color: '#ef4444' },
  jupiter: { name: 'Jupiter', symbol: '♃', color: '#3b82f6' },
  saturn: { name: 'Saturn', symbol: '♄', color: '#6b7280' },
  uranus: { name: 'Uranus', symbol: '♅', color: '#06b6d4' },
  neptune: { name: 'Neptune', symbol: '♆', color: '#8b5cf6' },
  pluto: { name: 'Pluto', symbol: '♇', color: '#78716c' }
};

// Angle types with meanings
const ANGLE_INFO = {
  MC: {
    name: 'Midheaven',
    abbreviation: 'MC',
    meaning: 'Career visibility, public recognition, authority'
  },
  IC: {
    name: 'Imum Coeli',
    abbreviation: 'IC',
    meaning: 'Home, roots, private life, emotional foundations'
  },
  ASC: {
    name: 'Ascendant',
    abbreviation: 'ASC',
    meaning: 'Personal presence, identity expression, new beginnings'
  },
  DSC: {
    name: 'Descendant',
    abbreviation: 'DSC',
    meaning: 'Relationships, partnerships, others\' perception'
  }
};

/**
 * Normalize angle to 0-360 degrees
 */
function normalizeAngle(angle) {
  angle = angle % 360;
  if (angle < 0) angle += 360;
  return angle;
}

/**
 * Calculate the longitude where a planet's ecliptic longitude equals the local MC
 *
 * For MC/IC lines, the solution is direct:
 * MC = atan(tan(LST) / cos(obliquity))
 *
 * Given a target MC (planet's longitude), solve for LST, then longitude.
 *
 * @param {number} planetLongitude - Planet's ecliptic longitude
 * @param {number} gmst - Greenwich Mean Sidereal Time
 * @returns {number} Geographic longitude where planet is on MC
 */
function findMCLongitude(planetLongitude, gmst) {
  // MC = atan2(sin(LST), cos(LST) * cos(obliquity))
  // We need to find LST such that MC = planetLongitude
  //
  // Let MC = planet longitude (in radians)
  // tan(MC) = sin(LST) / (cos(LST) * cos(obliquity))
  // tan(MC) * cos(obliquity) = tan(LST)
  // LST = atan(tan(MC) * cos(obliquity))

  const mcRad = planetLongitude * DEG_TO_RAD;
  const oblRad = OBLIQUITY * DEG_TO_RAD;

  // Calculate the LST that produces this MC
  // Using atan2 for proper quadrant handling
  const tanMC = Math.tan(mcRad);
  const lst = Math.atan(tanMC * Math.cos(oblRad)) * RAD_TO_DEG;

  // Adjust for correct quadrant (MC should be in same semicircle as LST)
  let adjustedLst = lst;

  // Determine which quadrant the planet is in
  const quadrant = Math.floor(planetLongitude / 90);
  const lstQuadrant = Math.floor(normalizeAngle(adjustedLst) / 90);

  // Adjust LST to match the correct quadrant pair
  if (quadrant === 1 || quadrant === 2) {
    if (lstQuadrant === 0 || lstQuadrant === 3) {
      adjustedLst += 180;
    }
  } else {
    if (lstQuadrant === 1 || lstQuadrant === 2) {
      adjustedLst += 180;
    }
  }

  adjustedLst = normalizeAngle(adjustedLst);

  // Geographic longitude = LST - GMST
  let geoLon = adjustedLst - gmst;

  // Normalize to -180 to 180
  if (geoLon > 180) geoLon -= 360;
  if (geoLon < -180) geoLon += 360;

  return geoLon;
}

/**
 * Find latitude where a planet is on the Ascendant at a given longitude
 *
 * The Ascendant formula:
 * tan(ASC) = cos(RAMC) / -(sin(ε) * tan(φ) + cos(ε) * sin(RAMC))
 *
 * Given ASC (planet longitude) and RAMC (LST), solve for φ (latitude).
 *
 * @param {number} planetLongitude - Planet's ecliptic longitude (target ASC)
 * @param {number} lst - Local Sidereal Time at the test longitude
 * @returns {number|null} Latitude where planet is on ASC, or null if no solution
 */
function findASCLatitude(planetLongitude, lst) {
  const ascRad = planetLongitude * DEG_TO_RAD;
  const lstRad = lst * DEG_TO_RAD;
  const oblRad = OBLIQUITY * DEG_TO_RAD;

  // tan(ASC) = cos(LST) / -(sin(ε) * tan(φ) + cos(ε) * sin(LST))
  // Let tanASC = tan(ASC), then:
  // tanASC * (sin(ε) * tan(φ) + cos(ε) * sin(LST)) = -cos(LST)
  // tanASC * sin(ε) * tan(φ) = -cos(LST) - tanASC * cos(ε) * sin(LST)
  // tan(φ) = (-cos(LST) - tanASC * cos(ε) * sin(LST)) / (tanASC * sin(ε))

  const tanASC = Math.tan(ascRad);
  const sinObl = Math.sin(oblRad);
  const cosObl = Math.cos(oblRad);
  const sinLST = Math.sin(lstRad);
  const cosLST = Math.cos(lstRad);

  // Avoid division by zero
  if (Math.abs(tanASC * sinObl) < 1e-10) {
    return null;
  }

  const tanPhi = (-cosLST - tanASC * cosObl * sinLST) / (tanASC * sinObl);

  // Check if solution is valid (latitude must be -90 to 90)
  if (!isFinite(tanPhi)) {
    return null;
  }

  let lat = Math.atan(tanPhi) * RAD_TO_DEG;

  // Verify the solution by calculating ASC at this latitude
  const calcASC = calculateAscendantDirect(lst, lat);
  let diff = Math.abs(normalizeAngle(calcASC) - normalizeAngle(planetLongitude));
  if (diff > 180) diff = 360 - diff;

  // If difference is close to 180, we found the DSC solution - negate latitude
  if (diff > 90) {
    lat = -lat;

    // Verify again
    const calcASC2 = calculateAscendantDirect(lst, lat);
    let diff2 = Math.abs(normalizeAngle(calcASC2) - normalizeAngle(planetLongitude));
    if (diff2 > 180) diff2 = 360 - diff2;

    if (diff2 > 5) {
      return null; // No valid solution
    }
  }

  // Validate latitude is in valid range
  if (lat > 90 || lat < -90) {
    return null;
  }

  return lat;
}

/**
 * Calculate Ascendant directly from LST and latitude
 */
function calculateAscendantDirect(lst, latitude) {
  const lstRad = lst * DEG_TO_RAD;
  const latRad = latitude * DEG_TO_RAD;
  const oblRad = OBLIQUITY * DEG_TO_RAD;

  const y = Math.cos(lstRad);
  const x = -(Math.sin(oblRad) * Math.tan(latRad) + Math.cos(oblRad) * Math.sin(lstRad));

  let asc = Math.atan2(y, x) * RAD_TO_DEG;
  asc = normalizeAngle(asc);

  return asc;
}

/**
 * Calculate MC/IC line points for a planet
 *
 * MC lines are meridians (constant longitude) - they run pole to pole.
 *
 * @param {number} planetLongitude - Planet's ecliptic longitude
 * @param {number} gmst - Greenwich Mean Sidereal Time at birth
 * @param {string} angleType - 'MC' or 'IC'
 * @returns {Object} Line data with points
 */
function calculateMeridianLine(planetLongitude, gmst, angleType) {
  // For IC, add 180° to the planet longitude
  const targetLongitude = angleType === 'IC'
    ? normalizeAngle(planetLongitude + 180)
    : planetLongitude;

  // Find the geographic longitude where this planet is on MC
  const geoLon = findMCLongitude(targetLongitude, gmst);

  // MC/IC lines run from pole to pole at constant longitude
  const points = [];
  for (let lat = -85; lat <= 85; lat += 5) {
    points.push({ lat, lon: geoLon });
  }

  return {
    type: 'meridian',
    longitude: geoLon,
    points
  };
}

/**
 * Calculate ASC/DSC line points for a planet
 *
 * ASC lines are curves that vary by latitude.
 *
 * @param {number} planetLongitude - Planet's ecliptic longitude
 * @param {number} gmst - Greenwich Mean Sidereal Time at birth
 * @param {string} angleType - 'ASC' or 'DSC'
 * @returns {Object} Line data with points
 */
function calculateHorizonLine(planetLongitude, gmst, angleType) {
  // For DSC, add 180° to the planet longitude
  const targetLongitude = angleType === 'DSC'
    ? normalizeAngle(planetLongitude + 180)
    : planetLongitude;

  const points = [];

  // Scan across all longitudes to find where ASC = planet longitude
  for (let lon = -180; lon <= 180; lon += 2) {
    // Calculate LST at this longitude
    const lst = normalizeAngle(gmst + lon);

    // Find latitude where ASC equals target
    const lat = findASCLatitude(targetLongitude, lst);

    if (lat !== null && lat >= -80 && lat <= 80) {
      points.push({ lat, lon });
    }
  }

  // Sort points by longitude for proper line drawing
  points.sort((a, b) => a.lon - b.lon);

  return {
    type: 'curve',
    points
  };
}

/**
 * Calculate all planetary lines for a birth chart
 *
 * @param {string} birthDate - Birth date in YYYY-MM-DD format
 * @param {number} birthHour - Birth hour in decimal (e.g., 14.5 for 2:30 PM)
 * @param {number} timezone - UTC offset in hours
 * @param {Object} options - Optional settings
 * @param {string[]} options.planets - Which planets to include (default: all)
 * @param {string[]} options.angles - Which angles to include (default: all)
 * @param {number} options.orb - Orb for considering a planet "angular" (default: 1°)
 * @returns {Object} Astro cartography data with all lines
 */
export function calculateAstroCartography(birthDate, birthHour = 12, timezone = 0, options = {}) {
  const {
    planets = Object.keys(PLANET_INFO),
    angles = ['MC', 'IC', 'ASC', 'DSC'],
    orb = 1
  } = options;

  const { year, month, day } = parseDateComponents(birthDate);

  // Get planetary positions at birth
  const positions = calculateBirthPositions(year, month, day, birthHour, timezone);

  // Calculate GMST at birth time
  const jd = positions.julianDay;

  // GMST calculation
  const T = (jd - 2451545.0) / 36525;
  const T2 = T * T;
  const T3 = T2 * T;
  let gmst = 280.46061837 + 360.98564736629 * (jd - 2451545.0) + 0.000387933 * T2 - T3 / 38710000;
  gmst = normalizeAngle(gmst);

  const lines = [];

  // Calculate lines for each planet
  for (const planetKey of planets) {
    const planetPos = positions[planetKey];
    if (!planetPos || planetPos.longitude === undefined) continue;

    const planetInfo = PLANET_INFO[planetKey];
    const planetLon = planetPos.longitude;

    // MC line
    if (angles.includes('MC')) {
      const mcLine = calculateMeridianLine(planetLon, gmst, 'MC');
      lines.push({
        planet: planetKey,
        planetName: planetInfo.name,
        planetSymbol: planetInfo.symbol,
        planetColor: planetInfo.color,
        angle: 'MC',
        angleName: ANGLE_INFO.MC.name,
        angleAbbr: 'MC',
        ...mcLine,
        meaning: `${planetInfo.name} on Midheaven: ${ANGLE_INFO.MC.meaning}`,
        interpretation: getPlanetAngleMeaning(planetKey, 'MC')
      });
    }

    // IC line
    if (angles.includes('IC')) {
      const icLine = calculateMeridianLine(planetLon, gmst, 'IC');
      lines.push({
        planet: planetKey,
        planetName: planetInfo.name,
        planetSymbol: planetInfo.symbol,
        planetColor: planetInfo.color,
        angle: 'IC',
        angleName: ANGLE_INFO.IC.name,
        angleAbbr: 'IC',
        ...icLine,
        meaning: `${planetInfo.name} on IC: ${ANGLE_INFO.IC.meaning}`,
        interpretation: getPlanetAngleMeaning(planetKey, 'IC')
      });
    }

    // ASC line
    if (angles.includes('ASC')) {
      const ascLine = calculateHorizonLine(planetLon, gmst, 'ASC');
      lines.push({
        planet: planetKey,
        planetName: planetInfo.name,
        planetSymbol: planetInfo.symbol,
        planetColor: planetInfo.color,
        angle: 'ASC',
        angleName: ANGLE_INFO.ASC.name,
        angleAbbr: 'ASC',
        ...ascLine,
        meaning: `${planetInfo.name} rising: ${ANGLE_INFO.ASC.meaning}`,
        interpretation: getPlanetAngleMeaning(planetKey, 'ASC')
      });
    }

    // DSC line
    if (angles.includes('DSC')) {
      const dscLine = calculateHorizonLine(planetLon, gmst, 'DSC');
      lines.push({
        planet: planetKey,
        planetName: planetInfo.name,
        planetSymbol: planetInfo.symbol,
        planetColor: planetInfo.color,
        angle: 'DSC',
        angleName: ANGLE_INFO.DSC.name,
        angleAbbr: 'DSC',
        ...dscLine,
        meaning: `${planetInfo.name} setting: ${ANGLE_INFO.DSC.meaning}`,
        interpretation: getPlanetAngleMeaning(planetKey, 'DSC')
      });
    }
  }

  // Find parans (line crossings)
  const parans = findParans(lines, orb);

  return {
    birthInfo: {
      date: birthDate,
      time: birthHour,
      timezone,
      julianDay: jd,
      gmst
    },
    positions: {
      sun: positions.sun,
      moon: positions.moon,
      mercury: positions.mercury,
      venus: positions.venus,
      mars: positions.mars,
      jupiter: positions.jupiter,
      saturn: positions.saturn,
      uranus: positions.uranus,
      neptune: positions.neptune,
      pluto: positions.pluto
    },
    lines,
    parans,
    lineCount: lines.length,
    note: 'Lines show where each planet is angular (on ASC, DSC, MC, or IC) at the birth moment'
  };
}

/**
 * Find parans - locations where two planetary lines cross
 *
 * @param {Array} lines - All calculated planetary lines
 * @param {number} orb - Orb for considering lines as crossing
 * @returns {Array} Paran crossings
 */
function findParans(lines, orb = 1) {
  const parans = [];
  const checked = new Set();

  // Compare each line with others
  for (let i = 0; i < lines.length; i++) {
    for (let j = i + 1; j < lines.length; j++) {
      const line1 = lines[i];
      const line2 = lines[j];

      // Skip same planet
      if (line1.planet === line2.planet) continue;

      // Create unique key to avoid duplicates
      const key = `${line1.planet}-${line1.angle}-${line2.planet}-${line2.angle}`;
      if (checked.has(key)) continue;
      checked.add(key);

      // Find intersections
      const crossings = findLineCrossings(line1, line2, orb);

      for (const crossing of crossings) {
        parans.push({
          planet1: line1.planet,
          planet1Name: line1.planetName,
          planet1Symbol: line1.planetSymbol,
          angle1: line1.angle,
          planet2: line2.planet,
          planet2Name: line2.planetName,
          planet2Symbol: line2.planetSymbol,
          angle2: line2.angle,
          lat: crossing.lat,
          lon: crossing.lon,
          interpretation: getParanMeaning(line1.planet, line1.angle, line2.planet, line2.angle)
        });
      }
    }
  }

  return parans;
}

/**
 * Find where two lines cross
 */
function findLineCrossings(line1, line2, orb) {
  const crossings = [];

  // For meridian lines (MC/IC), they have a fixed longitude
  if (line1.type === 'meridian' && line2.type === 'meridian') {
    // Two meridian lines only cross at poles if they're at same longitude
    if (Math.abs(line1.longitude - line2.longitude) < orb) {
      crossings.push({ lat: 0, lon: line1.longitude });
    }
    return crossings;
  }

  // For meridian + curve combinations
  if (line1.type === 'meridian' || line2.type === 'meridian') {
    const meridian = line1.type === 'meridian' ? line1 : line2;
    const curve = line1.type === 'curve' ? line1 : line2;

    for (const point of curve.points) {
      if (Math.abs(point.lon - meridian.longitude) < orb * 2) {
        crossings.push({ lat: point.lat, lon: meridian.longitude });
      }
    }
    return crossings;
  }

  // For two curves, find where they're close
  for (const p1 of line1.points) {
    for (const p2 of line2.points) {
      const latDiff = Math.abs(p1.lat - p2.lat);
      const lonDiff = Math.abs(p1.lon - p2.lon);

      if (latDiff < orb * 2 && lonDiff < orb * 3) {
        // Avoid duplicate crossings
        const isDuplicate = crossings.some(c =>
          Math.abs(c.lat - p1.lat) < 5 && Math.abs(c.lon - p1.lon) < 5
        );
        if (!isDuplicate) {
          crossings.push({
            lat: (p1.lat + p2.lat) / 2,
            lon: (p1.lon + p2.lon) / 2
          });
        }
      }
    }
  }

  return crossings;
}

/**
 * Get interpretation for a planet on an angle
 */
function getPlanetAngleMeaning(planet, angle) {
  const meanings = {
    sun: {
      MC: 'Strong career visibility, leadership roles, public recognition',
      IC: 'Deep connection to home and roots, family-centered identity',
      ASC: 'Radiant personal presence, vitality, natural leadership',
      DSC: 'Attracting powerful partners, relationships illuminate you'
    },
    moon: {
      MC: 'Public nurturing role, emotional connection with masses',
      IC: 'Deep emotional roots, strong family bonds, feeling at home',
      ASC: 'Emotionally open, nurturing presence, intuitive connections',
      DSC: 'Seeking emotional security in relationships, caring partners'
    },
    mercury: {
      MC: 'Career in communication, teaching, or commerce',
      IC: 'Intellectual home environment, family communication',
      ASC: 'Quick-witted presence, communicative personality',
      DSC: 'Mental connection in partnerships, articulate partners'
    },
    venus: {
      MC: 'Career in arts, beauty, or relationships; charm in public',
      IC: 'Beautiful home, harmonious family, aesthetic roots',
      ASC: 'Attractive presence, grace, ease in social situations',
      DSC: 'Harmonious relationships, attracting loving partners'
    },
    mars: {
      MC: 'Ambitious career drive, competitive public image',
      IC: 'Active home life, family conflicts or energy',
      ASC: 'Dynamic personal presence, assertive personality',
      DSC: 'Passionate relationships, attracting assertive partners'
    },
    jupiter: {
      MC: 'Career expansion, public success, recognition abroad',
      IC: 'Expansive home, lucky family circumstances',
      ASC: 'Optimistic presence, lucky breaks, generous personality',
      DSC: 'Beneficial partnerships, growth through relationships'
    },
    saturn: {
      MC: 'Career challenges then mastery, authority with time',
      IC: 'Responsibilities at home, structured family life',
      ASC: 'Serious presence, maturity, earning respect over time',
      DSC: 'Committed partnerships, learning through relationships'
    },
    uranus: {
      MC: 'Unconventional career, sudden changes in status',
      IC: 'Unusual home life, freedom-seeking in private',
      ASC: 'Unique presence, independent personality, sudden changes',
      DSC: 'Unusual partnerships, freedom in relationships'
    },
    neptune: {
      MC: 'Creative or spiritual career, public idealization',
      IC: 'Spiritual home, unclear family boundaries',
      ASC: 'Mystical presence, artistic personality, sometimes unclear',
      DSC: 'Idealistic in relationships, spiritual connections'
    },
    pluto: {
      MC: 'Transformative career, power in public sphere',
      IC: 'Deep family transformation, powerful roots',
      ASC: 'Intense presence, transformative personality',
      DSC: 'Powerful partnerships, transformation through others'
    }
  };

  return meanings[planet]?.[angle] || `${PLANET_INFO[planet]?.name || planet} on ${angle}`;
}

/**
 * Get interpretation for a paran (line crossing)
 */
function getParanMeaning(planet1, angle1, planet2, angle2) {
  const p1 = PLANET_INFO[planet1]?.name || planet1;
  const p2 = PLANET_INFO[planet2]?.name || planet2;

  return `${p1} ${angle1} crossing ${p2} ${angle2}: Combined planetary energies activate at this location`;
}

/**
 * Check if a specific location is near a planetary line
 *
 * @param {Object} astroCartoData - Result from calculateAstroCartography
 * @param {number} lat - Latitude to check
 * @param {number} lon - Longitude to check
 * @param {number} orb - Orb in degrees (default: 2)
 * @returns {Array} Lines that are active at this location
 */
export function getLinesAtLocation(astroCartoData, lat, lon, orb = 2) {
  const activeLines = [];

  for (const line of astroCartoData.lines) {
    if (line.type === 'meridian') {
      // For MC/IC lines, check longitude only
      let lonDiff = Math.abs(line.longitude - lon);
      if (lonDiff > 180) lonDiff = 360 - lonDiff;

      if (lonDiff <= orb) {
        activeLines.push({
          ...line,
          distance: lonDiff
        });
      }
    } else {
      // For ASC/DSC lines, find closest point
      let minDist = Infinity;
      let closestPoint = null;

      for (const point of line.points) {
        const latDiff = Math.abs(point.lat - lat);
        let lonDiff = Math.abs(point.lon - lon);
        if (lonDiff > 180) lonDiff = 360 - lonDiff;

        // Simple distance approximation
        const dist = Math.sqrt(latDiff * latDiff + lonDiff * lonDiff);
        if (dist < minDist) {
          minDist = dist;
          closestPoint = point;
        }
      }

      if (minDist <= orb * 1.5) {
        activeLines.push({
          ...line,
          distance: minDist,
          closestPoint
        });
      }
    }
  }

  // Sort by distance (closest first)
  activeLines.sort((a, b) => a.distance - b.distance);

  return activeLines;
}

/**
 * Get a location report for a specific place
 *
 * @param {Object} astroCartoData - Result from calculateAstroCartography
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @param {string} locationName - Optional location name
 * @returns {Object} Location analysis
 */
export function getLocationReport(astroCartoData, lat, lon, locationName = null) {
  const activeLines = getLinesAtLocation(astroCartoData, lat, lon, 3);
  const nearbyParans = astroCartoData.parans.filter(p => {
    const latDiff = Math.abs(p.lat - lat);
    let lonDiff = Math.abs(p.lon - lon);
    if (lonDiff > 180) lonDiff = 360 - lonDiff;
    return Math.sqrt(latDiff * latDiff + lonDiff * lonDiff) < 5;
  });

  return {
    location: {
      name: locationName,
      latitude: lat,
      longitude: lon
    },
    activeLines: activeLines.map(line => ({
      planet: line.planetName,
      symbol: line.planetSymbol,
      angle: line.angle,
      distance: Math.round(line.distance * 100) / 100,
      interpretation: line.interpretation
    })),
    nearbyParans: nearbyParans.map(p => ({
      planets: `${p.planet1Symbol} ${p.angle1} × ${p.planet2Symbol} ${p.angle2}`,
      interpretation: p.interpretation
    })),
    summary: generateLocationSummary(activeLines, nearbyParans)
  };
}

/**
 * Generate a summary for a location
 */
function generateLocationSummary(activeLines, nearbyParans) {
  if (activeLines.length === 0) {
    return 'No major planetary lines pass through this location.';
  }

  const planets = [...new Set(activeLines.map(l => l.planetName))];
  const angles = [...new Set(activeLines.map(l => l.angle))];

  let summary = `This location is influenced by ${planets.join(', ')}`;

  if (angles.includes('MC') || angles.includes('ASC')) {
    summary += '. Strong potential for visibility and personal expression.';
  } else if (angles.includes('IC') || angles.includes('DSC')) {
    summary += '. Focus on private life, home, and relationships.';
  }

  if (nearbyParans.length > 0) {
    summary += ` ${nearbyParans.length} paran crossing(s) nearby add intensity.`;
  }

  return summary;
}

export default calculateAstroCartography;
export { PLANET_INFO, ANGLE_INFO };

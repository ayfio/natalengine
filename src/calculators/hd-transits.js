/**
 * Human Design Transit Overlay Calculator
 *
 * Calculates current planetary gate activations and overlays them
 * on a natal chart to find:
 * - Which natal hanging gates get completed by transits
 * - Which centers get temporarily defined
 * - Temporary channels formed
 * - Overall transit weather for the person
 */

import { calculateBirthPositions } from './astronomy.js';
import { GATES, CHANNELS, CENTERS, longitudeToGate, longitudeToLine } from './humandesign.js';

/**
 * Calculate current transit gate activations
 * @param {Date|string} transitDate - Date to calculate transits for (default: now)
 * @param {number} timezone - UTC offset (default: 0)
 * @returns {Object} Transit gate activations
 */
export function calculateTransitGates(transitDate, timezone = 0) {
  let year, month, day, hour;

  if (!transitDate) {
    const now = new Date();
    year = now.getUTCFullYear();
    month = now.getUTCMonth() + 1;
    day = now.getUTCDate();
    hour = now.getUTCHours() + now.getUTCMinutes() / 60;
  } else if (transitDate instanceof Date) {
    year = transitDate.getFullYear();
    month = transitDate.getMonth() + 1;
    day = transitDate.getDate();
    hour = transitDate.getHours() + transitDate.getMinutes() / 60;
  } else {
    const [y, m, d] = transitDate.split('-').map(Number);
    year = y; month = m; day = d; hour = 12;
  }

  const positions = calculateBirthPositions(year, month, day, hour, timezone);

  const transitGates = {};
  const planets = ['sun', 'moon', 'mercury', 'venus', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto'];

  for (const planet of planets) {
    if (positions[planet]) {
      const longitude = positions[planet].longitude;
      const gate = longitudeToGate(longitude);
      const line = longitudeToLine(longitude);
      transitGates[planet] = {
        gate,
        line,
        longitude,
        gateName: GATES[gate]?.name || `Gate ${gate}`,
        center: GATES[gate]?.center
      };
    }
  }

  // Add Earth (opposite Sun)
  if (positions.sun) {
    const earthLong = (positions.sun.longitude + 180) % 360;
    transitGates.earth = {
      gate: longitudeToGate(earthLong),
      line: longitudeToLine(earthLong),
      longitude: earthLong,
      gateName: GATES[longitudeToGate(earthLong)]?.name,
      center: GATES[longitudeToGate(earthLong)]?.center
    };
  }

  // Add Nodes
  if (positions.northNode) {
    transitGates.northNode = {
      gate: longitudeToGate(positions.northNode.longitude),
      line: longitudeToLine(positions.northNode.longitude),
      longitude: positions.northNode.longitude,
      gateName: GATES[longitudeToGate(positions.northNode.longitude)]?.name,
      center: GATES[longitudeToGate(positions.northNode.longitude)]?.center
    };
    const southLong = (positions.northNode.longitude + 180) % 360;
    transitGates.southNode = {
      gate: longitudeToGate(southLong),
      line: longitudeToLine(southLong),
      longitude: southLong,
      gateName: GATES[longitudeToGate(southLong)]?.name,
      center: GATES[longitudeToGate(southLong)]?.center
    };
  }

  const activeGates = new Set(Object.values(transitGates).map(t => t.gate));

  return {
    date: `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
    gates: transitGates,
    activeGates: Array.from(activeGates),
    activeGateCount: activeGates.size
  };
}

/**
 * Overlay transit gates on a natal chart
 * @param {Object} natalChart - Human Design chart from calculateHumanDesign()
 * @param {Date|string} transitDate - Date to calculate transits for
 * @param {number} timezone - UTC offset
 * @returns {Object} Transit overlay analysis
 */
export function calculateHDTransits(natalChart, transitDate, timezone = 0) {
  const transits = calculateTransitGates(transitDate, timezone);
  const natalGates = new Set(natalChart.gates?.all || []);
  const natalChannels = new Set((natalChart.channels || []).map(c => c.name));
  const natalDefinedCenters = new Set(natalChart.centers?.definedNames || []);

  // Find channel completions: natal hanging gate + transit gate = complete channel
  const channelCompletions = [];
  const allGatesCombined = new Set([...natalGates, ...transits.activeGates]);

  for (const channel of CHANNELS) {
    const [gate1, gate2] = channel.gates;
    const combinedHasChannel = allGatesCombined.has(gate1) && allGatesCombined.has(gate2);
    const natalHasChannel = natalGates.has(gate1) && natalGates.has(gate2);

    if (combinedHasChannel && !natalHasChannel) {
      // This channel is completed by the transit
      const natalGate = natalGates.has(gate1) ? gate1 : (natalGates.has(gate2) ? gate2 : null);
      const transitGate = !natalGates.has(gate1) && transits.activeGates.includes(gate1) ? gate1 :
                          (!natalGates.has(gate2) && transits.activeGates.includes(gate2) ? gate2 : null);

      // Find which planet provides the transit gate
      const transitPlanet = Object.entries(transits.gates)
        .find(([, g]) => g.gate === transitGate)?.[0];

      channelCompletions.push({
        channel: channel.name,
        gates: channel.gates,
        centers: channel.centers,
        theme: channel.theme,
        circuit: channel.circuit,
        natalGate,
        transitGate,
        transitPlanet,
        type: natalGate ? 'hanging_gate_completion' : 'pure_transit',
        significance: natalGate ? 'high' : 'moderate'
      });
    }
  }

  // Find temporarily defined centers
  const combinedChannels = CHANNELS.filter(ch =>
    allGatesCombined.has(ch.gates[0]) && allGatesCombined.has(ch.gates[1])
  );
  const combinedCenters = new Set();
  combinedChannels.forEach(ch => ch.centers.forEach(c => combinedCenters.add(c)));

  const temporarilyDefinedCenters = [];
  for (const center of combinedCenters) {
    if (!natalDefinedCenters.has(center)) {
      temporarilyDefinedCenters.push({
        center,
        centerName: CENTERS[center]?.name,
        theme: CENTERS[center]?.theme,
        notSelfTheme: CENTERS[center]?.notSelfTheme
      });
    }
  }

  // Identify transit gates that activate natal gates (same gate, different activation)
  const reinforcedGates = [];
  for (const transitGate of transits.activeGates) {
    if (natalGates.has(transitGate)) {
      const transitPlanet = Object.entries(transits.gates)
        .find(([, g]) => g.gate === transitGate)?.[0];
      reinforcedGates.push({
        gate: transitGate,
        gateName: GATES[transitGate]?.name,
        center: GATES[transitGate]?.center,
        transitPlanet,
        meaning: `Transit ${transitPlanet} reinforces your natal Gate ${transitGate} (${GATES[transitGate]?.name}) — this energy is amplified today.`
      });
    }
  }

  // Key transits: Sun gate (changes every ~6 days) and Moon gate (changes every ~10 hours)
  const sunGate = transits.gates.sun;
  const moonGate = transits.gates.moon;

  return {
    transitDate: transits.date,
    transitGates: transits.gates,
    channelCompletions,
    temporarilyDefinedCenters,
    reinforcedGates,
    highlights: {
      sun: {
        ...sunGate,
        completesChannel: channelCompletions.some(c => c.transitGate === sunGate.gate),
        reinforcesNatal: natalGates.has(sunGate.gate)
      },
      moon: {
        ...moonGate,
        completesChannel: channelCompletions.some(c => c.transitGate === moonGate.gate),
        reinforcesNatal: natalGates.has(moonGate.gate)
      }
    },
    stats: {
      channelCompletions: channelCompletions.length,
      hangingGateCompletions: channelCompletions.filter(c => c.type === 'hanging_gate_completion').length,
      temporarilyDefinedCenters: temporarilyDefinedCenters.length,
      reinforcedGates: reinforcedGates.length,
      totalTransitGates: transits.activeGateCount
    }
  };
}

export default calculateHDTransits;

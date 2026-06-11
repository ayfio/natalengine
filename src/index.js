/**
 * NatalEngine - Birth Chart Calculator
 *
 * A comprehensive library for calculating Western Astrology, Human Design,
 * Gene Keys, and Vedic (Jyotish) astrology charts with astronomical precision.
 *
 * @example
 * import { calculateAstrology, calculateHumanDesign, calculateGeneKeys, calculateVedic } from 'natalengine';
 *
 * const astro = calculateAstrology('1990-06-15', 14.5, -5, 40.7128, -74.0060);
 * console.log(astro.bigThree); // "Gemini Sun, Pisces Moon, Scorpio Rising"
 *
 * const hd = calculateHumanDesign('1990-06-15', 14.5, -5);
 * console.log(hd.type.name); // "Generator"
 *
 * const gk = calculateGeneKeys(hd);
 * console.log(gk.activationSequence.lifeWork.gift); // "Imagination"
 *
 * const vedic = calculateVedic('1990-06-15', 14.5, -5, 40.7128, -74.0060);
 * console.log(vedic.moonSign.summary); // "Moon in Simha (Leo), Purva Phalguni Nakshatra"
 *
 * // Compatibility analysis
 * import { compareAstrology, compareHumanDesign, compareGeneKeys } from 'natalengine';
 * const synastry = compareAstrology(astroA, astroB);
 * console.log(synastry.overallScore); // 72
 */

// Main calculators
export { default as calculateAstrology } from './calculators/astrology.js';
export { default as calculateHumanDesign, calculateGeneKeys } from './calculators/humandesign.js';
export { default as calculateVedic } from './calculators/vedic.js';
export {
  default as calculateAstroCartography,
  getLinesAtLocation,
  getLocationReport,
  PLANET_INFO as ACG_PLANET_INFO,
  ANGLE_INFO as ACG_ANGLE_INFO
} from './calculators/astrocartography.js';

// Compatibility calculators
export {
  compareAstrology,
  compareHumanDesign,
  compareGeneKeys,
  compareCharts
} from './calculators/compatibility/index.js';

// Profile storage (browser only)
export {
  getProfiles,
  getProfile,
  saveProfile,
  deleteProfile,
  renameProfile,
  clearAllProfiles,
  exportProfiles,
  importProfiles
} from './storage/profiles.js';

// Lower-level astronomy functions
export { calculateBirthPositions, getZodiacSign } from './calculators/astronomy.js';

// Timezone & geocoding (the accurate path for birth-data entry —
// IANA-historical offsets, not longitude estimation)
export { searchPlaces, resolveUtcOffset, formatUtcOffset } from './timezone.js';

// Human Design transit and team analysis
export { calculateHDTransits, calculateTransitGates } from './calculators/hd-transits.js';
export { analyzePenta } from './calculators/penta.js';

// Data constants (for advanced users)
export {
  GATES,
  CHANNELS,
  CENTERS,
  TYPES,
  PROFILES,
  AUTHORITIES,
  CIRCUIT_GROUPS,
  GENE_KEY_SPECTRUM,
  LINE_NAMES,
  longitudeToGate,
  longitudeToLine,
  longitudeToColor,
  longitudeToTone,
  longitudeToBase
} from './calculators/humandesign.js';

// Pure SVG rendering (no DOM — runs in Node, Workers, browsers)
export {
  default as renderBodygraphSVG,
  renderChartCardSVG,
  renderStoryCardSVG,
  THEMES as BODYGRAPH_THEMES
} from './render/bodygraph-svg.js';

// Human Design content data
export { GATE_DESCRIPTIONS } from './data/gate-descriptions.js';
export { LINE_DESCRIPTIONS } from './data/gate-lines.js';
export { CHANNEL_DESCRIPTIONS } from './data/channel-descriptions.js';
export { HEXAGRAM_DESCRIPTIONS } from './data/hexagram-descriptions.js'; // I Ching lens
export { GENE_KEY_DESCRIPTIONS } from './data/gene-key-descriptions.js'; // Gene Keys lens

// Vedic astrology data and functions
export {
  RASHIS,
  NAKSHATRAS,
  DASHA_ORDER,
  DASHA_YEARS,
  calculateLahiriAyanamsa,
  getNakshatra,
  getRashi
} from './calculators/vedic.js';

// Utility functions
export { parseDateComponents, daysBetween } from './calculators/utils.js';

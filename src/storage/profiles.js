/**
 * Profile Storage Module
 *
 * Manages user profiles in localStorage for chart comparison.
 * Stores only birth information - charts are calculated on demand.
 * No backend required - all data stored locally in browser.
 */

const STORAGE_KEY = 'natalengine_profiles';
const MAX_PROFILES = 50; // Lightweight storage now, can have more profiles

/**
 * Generate a UUID for profile IDs
 */
function generateId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/**
 * Get all saved profiles
 * @returns {Array} Array of profile objects
 */
export function getProfiles() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];

    const profiles = JSON.parse(data);

    // Migration: strip out old cachedData if present
    return profiles.map(p => {
      const { cachedData, ...cleanProfile } = p;
      return cleanProfile;
    });
  } catch (e) {
    console.error('Error reading profiles:', e);
    return [];
  }
}

/**
 * Save a new profile or update existing one
 * @param {Object} profile - Profile data to save
 * @param {string} [profile.id] - If provided, updates existing profile
 * @param {string} profile.name - Display name ("Me", "Partner", etc.)
 * @param {string} profile.birthDate - Birth date "YYYY-MM-DD"
 * @param {string} profile.birthTime - Birth time "HH:MM"
 * @param {Object} [profile.location] - Location data
 * @param {number} profile.location.lat - Latitude
 * @param {number} profile.location.lon - Longitude
 * @param {number} profile.location.timezone - UTC offset in effect at birth
 * @param {string} [profile.location.iana] - IANA timezone (e.g. "America/Denver")
 * @param {string} [profile.location.name] - Location display name
 * @returns {Object} The saved profile with id
 */
export function saveProfile(profile) {
  const profiles = getProfiles();
  const now = new Date().toISOString();

  // Only save birth info, not cached chart data
  const cleanProfile = {
    id: profile.id || generateId(),
    name: profile.name || 'Unnamed Profile',
    birthDate: profile.birthDate,
    birthTime: profile.birthTime || '12:00',
    location: profile.location ? {
      lat: profile.location.lat,
      lon: profile.location.lon,
      timezone: profile.location.timezone,
      iana: profile.location.iana || null,
      name: profile.location.name || null
    } : null,
    createdAt: profile.createdAt || now,
    updatedAt: now
  };

  if (profile.id) {
    // Update existing profile
    const index = profiles.findIndex(p => p.id === profile.id);
    if (index >= 0) {
      profiles[index] = cleanProfile;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
      return cleanProfile;
    }
  }

  // Create new profile
  if (profiles.length >= MAX_PROFILES) {
    throw new Error(`Maximum of ${MAX_PROFILES} profiles allowed. Please delete some profiles first.`);
  }

  profiles.push(cleanProfile);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
  return cleanProfile;
}

/**
 * Get a single profile by ID
 * @param {string} id - Profile ID
 * @returns {Object|null} Profile object or null if not found
 */
export function getProfile(id) {
  const profiles = getProfiles();
  return profiles.find(p => p.id === id) || null;
}

/**
 * Delete a profile by ID
 * @param {string} id - Profile ID to delete
 * @returns {boolean} True if deleted, false if not found
 */
export function deleteProfile(id) {
  const profiles = getProfiles();
  const index = profiles.findIndex(p => p.id === id);

  if (index >= 0) {
    profiles.splice(index, 1);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
    return true;
  }
  return false;
}

/**
 * Rename a profile
 * @param {string} id - Profile ID
 * @param {string} newName - New display name
 * @returns {Object|null} Updated profile or null if not found
 */
export function renameProfile(id, newName) {
  const profile = getProfile(id);
  if (profile) {
    return saveProfile({ ...profile, name: newName });
  }
  return null;
}

/**
 * Clear all profiles (use with caution)
 */
export function clearAllProfiles() {
  localStorage.removeItem(STORAGE_KEY);
}

/**
 * Export profiles as JSON string (for backup)
 * @returns {string} JSON string of all profiles
 */
export function exportProfiles() {
  return JSON.stringify(getProfiles(), null, 2);
}

/**
 * Import profiles from JSON string (for restore)
 * @param {string} jsonString - JSON string of profiles to import
 * @param {boolean} [merge=true] - If true, merge with existing; if false, replace all
 * @returns {number} Number of profiles imported
 */
export function importProfiles(jsonString, merge = true) {
  try {
    const importedProfiles = JSON.parse(jsonString);

    if (!Array.isArray(importedProfiles)) {
      throw new Error('Invalid profile data format');
    }

    // Clean imported profiles (strip cachedData)
    const cleanedProfiles = importedProfiles.map(p => {
      const { cachedData, ...clean } = p;
      return clean;
    });

    if (merge) {
      const existing = getProfiles();
      const existingIds = new Set(existing.map(p => p.id));

      const newProfiles = cleanedProfiles.filter(p => !existingIds.has(p.id));
      const merged = [...existing, ...newProfiles].slice(0, MAX_PROFILES);

      localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
      return newProfiles.length;
    } else {
      const trimmed = cleanedProfiles.slice(0, MAX_PROFILES);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
      return trimmed.length;
    }
  } catch (e) {
    console.error('Error importing profiles:', e);
    throw new Error('Failed to import profiles: ' + e.message);
  }
}

export default {
  getProfiles,
  getProfile,
  saveProfile,
  deleteProfile,
  renameProfile,
  clearAllProfiles,
  exportProfiles,
  importProfiles
};

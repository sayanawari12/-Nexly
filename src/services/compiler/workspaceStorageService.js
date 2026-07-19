import { STORAGE_KEYS } from '../../constants/storageKeys';

const OLD_KEYS = {
  PREFS: 'bca_workspace_prefs',
  DRAFTS: 'bca_workspace_drafts',
  SPLIT: 'bca_workspace_split'
};

/**
 * Migration runner to transition legacy data to the versioned v1 namespaces.
 * Safely purges old keys upon successful copy to prevent redundant runs.
 */
export const runStorageMigration = () => {
  try {
    // 1. Migrate Code Drafts
    const oldDrafts = localStorage.getItem(OLD_KEYS.DRAFTS);
    if (oldDrafts && !localStorage.getItem(STORAGE_KEYS.DRAFTS)) {
      localStorage.setItem(STORAGE_KEYS.DRAFTS, oldDrafts);
      localStorage.removeItem(OLD_KEYS.DRAFTS);
      console.log('[Storage Migration] Successfully migrated code drafts to v1.');
    }

    // 2. Migrate Sizing Splits
    const oldSplit = localStorage.getItem(OLD_KEYS.SPLIT);
    if (oldSplit && !localStorage.getItem(STORAGE_KEYS.LAYOUT)) {
      localStorage.setItem(STORAGE_KEYS.LAYOUT, oldSplit);
      localStorage.removeItem(OLD_KEYS.SPLIT);
      console.log('[Storage Migration] Successfully migrated split ratio layout to v1.');
    }

    // 3. Migrate Settings Preferences
    const oldPrefs = localStorage.getItem(OLD_KEYS.PREFS);
    if (oldPrefs && !localStorage.getItem(STORAGE_KEYS.PREFERENCES)) {
      localStorage.setItem(STORAGE_KEYS.PREFERENCES, oldPrefs);
      localStorage.removeItem(OLD_KEYS.PREFS);
      console.log('[Storage Migration] Successfully migrated editor preferences to v1.');
    }
  } catch (e) {
    console.error('[Storage Migration] Migration failed, falling back to clean initialization.', e);
  }
};

/**
 * Preferences Loader/Writer
 */
export const loadPreferences = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PREFERENCES);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.error('[Storage Service] Failed to read workspace preferences.', e);
    return null;
  }
};

export const savePreferences = (prefs) => {
  try {
    localStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(prefs));
  } catch (e) {
    console.error('[Storage Service] Failed to write workspace preferences.', e);
  }
};

/**
 * Code Drafts Loader/Writer
 */
export const loadDrafts = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.DRAFTS);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    console.error('[Storage Service] Failed to read workspace drafts.', e);
    return {};
  }
};

export const saveDrafts = (drafts) => {
  try {
    localStorage.setItem(STORAGE_KEYS.DRAFTS, JSON.stringify(drafts));
  } catch (e) {
    console.error('[Storage Service] Failed to write workspace drafts.', e);
  }
};

/**
 * Split Layout Loader/Writer
 */
export const loadSplitRatio = (defaultRatio) => {
  try {
    const val = localStorage.getItem(STORAGE_KEYS.LAYOUT);
    return val ? parseFloat(val) : defaultRatio;
  } catch (e) {
    console.error('[Storage Service] Failed to read layout split metrics.', e);
    return defaultRatio;
  }
};

export const saveSplitRatio = (ratio) => {
  try {
    localStorage.setItem(STORAGE_KEYS.LAYOUT, ratio.toString());
  } catch (e) {
    console.error('[Storage Service] Failed to write layout split metrics.', e);
  }
};

/**
 * Execution History Loader/Writer
 */
export const loadHistory = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.HISTORY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('[Storage Service] Failed to read execution logs history.', e);
    return [];
  }
};

export const saveHistory = (history) => {
  try {
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history));
  } catch (e) {
    console.error('[Storage Service] Failed to write execution logs history.', e);
  }
};

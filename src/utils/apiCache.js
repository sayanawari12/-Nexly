/**
 * Simple in-memory API response cache with TTL support.
 * Designed for GET requests that don't change frequently
 * (e.g., semester list, subject list, program catalog).
 */

const DEFAULT_TTL_MS = 5 * 60 * 1000; // 5 minutes

const cache = new Map();

/**
 * Get a cached value by key.
 * Returns null if the entry is missing or has expired.
 * @param {string} key
 * @returns {any|null}
 */
export function getCached(key) {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    cache.delete(key);
    return null;
  }
  return entry.value;
}

/**
 * Store a value in the cache.
 * @param {string} key
 * @param {any} value
 * @param {number} [ttlMs] - Time to live in milliseconds. Defaults to 5 minutes.
 */
export function setCached(key, value, ttlMs = DEFAULT_TTL_MS) {
  cache.set(key, {
    value,
    expiresAt: Date.now() + ttlMs,
  });
}

/**
 * Invalidate a specific cache entry.
 * @param {string} key
 */
export function invalidateCache(key) {
  cache.delete(key);
}

/**
 * Invalidate all entries whose keys start with a given prefix.
 * @param {string} prefix
 */
export function invalidateCacheByPrefix(prefix) {
  for (const key of cache.keys()) {
    if (key.startsWith(prefix)) {
      cache.delete(key);
    }
  }
}

/**
 * Clear the entire cache.
 */
export function clearCache() {
  cache.clear();
}

/**
 * Wrap an async fetcher function with caching.
 * If a cached result exists it is returned immediately;
 * otherwise the fetcher is called, cached, and returned.
 *
 * @param {string} key - Cache key
 * @param {() => Promise<any>} fetcher - Async function that returns data
 * @param {number} [ttlMs] - Optional TTL override
 * @returns {Promise<any>}
 */
export async function withCache(key, fetcher, ttlMs = DEFAULT_TTL_MS) {
  const cached = getCached(key);
  if (cached !== null) return cached;

  const result = await fetcher();
  setCached(key, result, ttlMs);
  return result;
}

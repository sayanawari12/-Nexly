import axios from 'axios';

// Helper to base64 encode/decode safely supporting UTF-8
export const encodeBase64 = (str) => {
  if (!str) return '';
  return btoa(unescape(encodeURIComponent(str)));
};

export const decodeBase64 = (str) => {
  if (!str) return '';
  try {
    return decodeURIComponent(escape(atob(str)));
  } catch (e) {
    try {
      return atob(str); // Fallback standard base64 decode
    } catch (err) {
      return str; // If already decoded or plain text
    }
  }
};

// Known placeholder values that indicate the user has not configured the .env
const PLACEHOLDER_KEYS = [
  'your_rapidapi_key_here',
  'your_key_here',
  'your_api_key',
  'placeholder',
  'changeme',
  'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
];

/**
 * Validate Judge0 credentials from environment variables.
 * Returns { host, key } if valid, or throws a named error string.
 */
const validateCredentials = () => {
  const host = process.env.REACT_APP_JUDGE0_API_HOST;
  const key = process.env.REACT_APP_JUDGE0_API_KEY;

  if (!host || !host.trim()) {
    throw new Error('MISSING_API_CREDENTIALS');
  }

  // RapidAPI requires a real key
  if (host.includes('rapidapi.com')) {
    if (!key || !key.trim() || PLACEHOLDER_KEYS.includes(key.trim().toLowerCase())) {
      throw new Error('MISSING_API_CREDENTIALS');
    }
  }

  return { host: host.trim(), key: key ? key.trim() : null };
};

/**
 * Build the authorization headers for a given host.
 */
const buildHeaders = (host, key) => {
  const headers = { 'content-type': 'application/json' };

  if (host.includes('rapidapi.com')) {
    headers['X-RapidAPI-Key'] = key;
    headers['X-RapidAPI-Host'] = host.replace(/^https?:\/\//, '');
  } else if (key) {
    headers['X-Auth-Token'] = key;
  }

  return headers;
};

/**
 * Map HTTP status errors to user-friendly messages.
 */
const mapHttpError = (status) => {
  if (status === 401) return 'INVALID_API_KEY';
  if (status === 403) return 'FORBIDDEN_403';
  if (status === 429) return 'RATE_LIMITED_429';
  return null;
};

/**
 * Dev-only request logger. Never logs the API key value.
 */
const devLog = (label, data) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Judge0 ${label}]`, data);
  }
};

/**
 * Submit code compilation request to Judge0 API.
 */
export const submitSubmission = async (sourceCode, languageId, stdin) => {
  const { host, key } = validateCredentials();

  const baseUrl = host.startsWith('http://') || host.startsWith('https://')
    ? host
    : `https://${host}`;
  const url = `${baseUrl}/submissions?base64_encoded=true&wait=false`;
  const headers = buildHeaders(host, key);
  const payload = {
    source_code: encodeBase64(sourceCode),
    language_id: languageId,
    stdin: encodeBase64(stdin),
  };

  devLog('Submit Request', {
    url,
    language_id: languageId,
    has_stdin: !!stdin,
    headers: { ...headers, 'X-RapidAPI-Key': headers['X-RapidAPI-Key'] ? '[REDACTED]' : undefined, 'X-Auth-Token': headers['X-Auth-Token'] ? '[REDACTED]' : undefined },
  });

  try {
    const response = await axios.post(url, payload, { headers });
    devLog('Submit Response', { status: response.status, token: response.data?.token });
    return response.data; // Returns { token: '...' }
  } catch (error) {
    const status = error?.response?.status;
    devLog('Submit Error', { status, message: error?.message });

    const named = mapHttpError(status);
    if (named) throw new Error(named);
    throw error;
  }
};

/**
 * Check submission status and retrieve output details from Judge0.
 */
export const getSubmissionStatus = async (token) => {
  const { host, key } = validateCredentials();

  const baseUrl = host.startsWith('http://') || host.startsWith('https://')
    ? host
    : `https://${host}`;
  const url = `${baseUrl}/submissions/${token}?base64_encoded=true`;
  const headers = buildHeaders(host, key);

  devLog('Status Request', { url });

  try {
    const response = await axios.get(url, { headers });
    devLog('Status Response', { status: response.status, statusId: response.data?.status?.id });
    return response.data;
  } catch (error) {
    const status = error?.response?.status;
    devLog('Status Error', { status, message: error?.message });

    const named = mapHttpError(status);
    if (named) throw new Error(named);
    throw error;
  }
};

export const MESSAGES = {
  SERVER_HEALTHY: 'Server is up and operational.',
  RESOURCE_NOT_FOUND: 'The requested resource could not be found.',
  UNAUTHORIZED: 'Authentication credentials are missing or invalid.',
  FORBIDDEN: 'You do not have permission to perform this action.',
  INTERNAL_ERROR: 'An unexpected internal error occurred on the server.',
  DB_ERROR: 'A database query operation failure occurred.',
  EXTERNAL_ERROR: 'Failed communicating with third-party compiler services.',
} as const;

/**
 * Format string as slugified clean handle.
 */
export const slugifyUsername = (name) => {
  return name.trim().toLowerCase().replace(/[^a-z0-9_]/g, '');
};

/**
 * Extract initials from full name.
 */
export const getInitials = (name) => {
  if (!name) return 'U';
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
};

/**
 * Format ISO string to localized date format.
 */
export const formatDateLong = (isoString) => {
  if (!isoString) return '';
  return new Date(isoString).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  });
};

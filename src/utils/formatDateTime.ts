export function formatDateTime(isoString: string): string {
  if (!isoString) {
    return '';
  }

  try {
    const date = new Date(isoString);

    // Check if date is valid
    if (isNaN(date.getTime())) {
      return '';
    }

    // Day, Month, and Year in DD/MM/YYYY format
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
    const year = date.getFullYear();

    // Hours and Minutes in HH:MM format
    const hour = String(date.getUTCHours()).padStart(2, '0'); // Using UTC Hours
    const minute = String(date.getUTCMinutes()).padStart(2, '0'); // Using UTC Minutes

    return `${day}/${month}/${year} ${hour}:${minute}`;
  } catch {
    return '';
  }
}

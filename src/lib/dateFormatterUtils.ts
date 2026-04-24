/**
 * Common Date Object Parser
 * Ensures cross-browser compatibility by replacing spaces with 'T'
 */
const parseDate = (dateString: string): Date => {
  return new Date(dateString.replace(" ", "T"));
};

/**
 * Format: "12:52, Feb 17"
 */
export const formatShortDate = (dateString: string): string => {
  const date = parseDate(dateString);
  if (isNaN(date.getTime())) return "Invalid Date";

  const time = date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
  const dayMonth = date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  
  return `${time}, ${dayMonth}`;
};

/**
 * Format: "Fri, 13 Nov, 2025"
 */
export const formatLongDate = (dateString: string): string => {
  const date = parseDate(dateString);
  if (isNaN(date.getTime())) return "Invalid Date";

  return date.toLocaleDateString("en-GB", {
    weekday: "short", // Fri
    day: "numeric",   // 13
    month: "short",   // Nov
    year: "numeric",  // 2025
  }).replace(/\//g, ' '); // Ensures consistency across different environments
};
import * as React from 'react';
/**
 * Format a number as US currency
 * @param value Number to format
 * @param maximumFractionDigits Optional number of decimal places (default: 0)
 * @returns Formatted currency string
 */
export function formatCurrency(value: number, maximumFractionDigits: number = 0): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits,
    minimumFractionDigits: 0,
  }).format(value);
}

/**
 * Format a number as a percentage
 * @param value Number to format (e.g., 0.75 for 75%)
 * @param maximumFractionDigits Optional number of decimal places (default: 1)
 * @returns Formatted percentage string
 */
export function formatPercent(value: number, maximumFractionDigits: number = 1): string {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    maximumFractionDigits,
    minimumFractionDigits: 0,
  }).format(value);
}

/**
 * Format a number with thousands separators
 * @param value Number to format
 * @param maximumFractionDigits Optional number of decimal places (default: 0)
 * @returns Formatted number string
 */
export function formatNumber(value: number, maximumFractionDigits: number = 0): string {
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits,
    minimumFractionDigits: 0,
  }).format(value);
}

/**
 * Format a date in a human-readable format
 * @param date Date to format
 * @param options Optional Intl.DateTimeFormatOptions
 * @returns Formatted date string
 */
export function formatDate(
  date: Date,
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }
): string {
  return new Intl.DateTimeFormat('en-US', options).format(date);
}

/**
 * Format a duration in a human-readable format
 * @param minutes Number of minutes
 * @returns Formatted duration string (e.g., "2h 30m" or "45m")
 */
export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours === 0) {
    return `${remainingMinutes}m`;
  }

  if (remainingMinutes === 0) {
    return `${hours}h`;
  }

  return `${hours}h ${remainingMinutes}m`;
}

/**
 * Format a file size in a human-readable format
 * @param bytes Number of bytes
 * @returns Formatted file size string (e.g., "1.5 MB" or "800 KB")
 */
export function formatFileSize(bytes: number): string {
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(size < 10 && unitIndex > 0 ? 1 : 0)} ${units[unitIndex]}`;
}

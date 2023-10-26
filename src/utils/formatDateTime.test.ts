import { describe, it, expect } from 'vitest';
import { formatDateTime } from './formatDateTime';

describe('formatDateTime', () => {
  it('formats valid ISO 8601 date string to European-friendly format', () => {
    const input = '2023-11-06T08:34:08.979544+00:00';
    const expectedOutput = '06/11/2023 08:34';
    expect(formatDateTime(input)).toBe(expectedOutput);
  });

  it('returns an empty string for an invalid date string', () => {
    const input = 'invalid-date-string';
    expect(formatDateTime(input)).toBe('');
  });

  it('returns an empty string for null input', () => {
    expect(formatDateTime(null as unknown as string)).toBe('');
  });

  it('returns an empty string for undefined input', () => {
    expect(formatDateTime(undefined as unknown as string)).toBe('');
  });

  it('handles edge cases around months, days, hours, and minutes', () => {
    expect(formatDateTime('2023-01-01T01:01:01.000000+00:00')).toBe(
      '01/01/2023 01:01'
    );
    expect(formatDateTime('2023-12-31T21:59:59.999999+00:00')).toBe(
      '31/12/2023 21:59'
    );
  });

  it('handles different timezones', () => {
    expect(formatDateTime('2023-11-06T08:34:08.979544+01:00')).toBe(
      '06/11/2023 07:34'
    ); // 1 hour ahead of UTC
    expect(formatDateTime('2023-11-06T08:34:08.979544-01:00')).toBe(
      '06/11/2023 09:34'
    ); // 1 hour behind UTC
  });
});

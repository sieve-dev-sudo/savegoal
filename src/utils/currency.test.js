import { describe, it, expect } from 'vitest';
import { formatCurrency, formatNumber } from './currency';

describe('formatCurrency', () => {
  it('formats USD with dollar sign and 2 decimals', () => {
    expect(formatCurrency(500, 'USD')).toBe('$500.00');
  });

  it('formats USD with decimal values correctly', () => {
    expect(formatCurrency(500.5, 'USD')).toBe('$500.50');
  });

  it('formats KHR with riel sign and no decimals', () => {
    const result = formatCurrency(2000000, 'KHR');
    expect(result).toContain('៛');
    expect(result).not.toContain('.');
  });

  it('defaults to USD when currency is not provided', () => {
    expect(formatCurrency(100)).toBe('$100.00');
  });

  it('handles zero amount', () => {
    expect(formatCurrency(0, 'USD')).toBe('$0.00');
  });

  it('handles invalid input gracefully', () => {
    expect(formatCurrency(NaN, 'USD')).toBe('$0.00');
  });
});

describe('formatNumber', () => {
  it('formats USD number with 2 decimals, no currency symbol', () => {
    expect(formatNumber(500, 'USD')).toBe('500.00');
  });

  it('formats KHR number without decimals', () => {
    const result = formatNumber(1500000, 'KHR');
    expect(result).not.toContain('.');
  });
});

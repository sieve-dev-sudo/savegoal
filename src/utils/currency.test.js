import { describe, it, expect } from 'vitest';
import {
  formatCurrency,
  formatNumber,
  convertUsdToKhr,
  convertKhrToUsd,
  EXCHANGE_RATE_USD_TO_KHR,
} from './currency';

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

describe('convertUsdToKhr', () => {
  it('converts 500 USD to 2,050,000 KHR using 4100 rate', () => {
    expect(convertUsdToKhr(500)).toBe(2050000);
  });

  it('converts 1 USD to 4100 KHR', () => {
    expect(convertUsdToKhr(1)).toBe(EXCHANGE_RATE_USD_TO_KHR);
  });

  it('converts 0 USD to 0 KHR', () => {
    expect(convertUsdToKhr(0)).toBe(0);
  });

  it('rounds to nearest whole riel', () => {
    expect(convertUsdToKhr(10.5)).toBe(Math.round(10.5 * 4100));
  });

  it('handles invalid input gracefully', () => {
    expect(convertUsdToKhr(NaN)).toBe(0);
  });
});

describe('convertKhrToUsd', () => {
  it('converts 4100 KHR to 1 USD', () => {
    expect(convertKhrToUsd(4100)).toBe(1);
  });

  it('converts 2,050,000 KHR to 500 USD', () => {
    expect(convertKhrToUsd(2050000)).toBe(500);
  });

  it('converts 0 KHR to 0 USD', () => {
    expect(convertKhrToUsd(0)).toBe(0);
  });

  it('rounds to 2 decimal places', () => {
    const result = convertKhrToUsd(1000);
    expect(result).toBeCloseTo(0.24, 2);
  });
});

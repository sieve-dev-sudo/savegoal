import { describe, it, expect } from 'vitest';
import {
  TRASH_RETENTION_DAYS,
  getTrashDaysLeft,
  isTrashExpired,
  purgeExpired,
} from './trash';

const DAY = 24 * 60 * 60 * 1000;
const NOW = new Date('2026-10-20T12:00:00Z').getTime();
const daysAgo = (n) => new Date(NOW - n * DAY).toISOString();

describe('trash retention', () => {
  it('keeps items for 30 days', () => {
    expect(TRASH_RETENTION_DAYS).toBe(30);
  });
});

describe('getTrashDaysLeft', () => {
  it('returns 30 days for an item deleted just now', () => {
    expect(getTrashDaysLeft(daysAgo(0), NOW)).toBe(30);
  });

  it('counts down as days pass', () => {
    expect(getTrashDaysLeft(daysAgo(20), NOW)).toBe(10);
  });

  it('rounds a partial day up so the last day shows 1', () => {
    expect(getTrashDaysLeft(daysAgo(29.5), NOW)).toBe(1);
  });

  it('never goes below 0', () => {
    expect(getTrashDaysLeft(daysAgo(45), NOW)).toBe(0);
  });
});

describe('isTrashExpired', () => {
  it('is not expired before 30 days', () => {
    expect(isTrashExpired(daysAgo(29), NOW)).toBe(false);
  });

  it('is expired at exactly 30 days', () => {
    expect(isTrashExpired(daysAgo(30), NOW)).toBe(true);
  });

  it('treats an invalid date as not expired', () => {
    expect(isTrashExpired('garbage', NOW)).toBe(false);
    expect(getTrashDaysLeft('garbage', NOW)).toBe(30);
  });
});

describe('purgeExpired', () => {
  it('removes only the expired items', () => {
    const trash = [
      { id: 'new', deletedAt: daysAgo(1) },
      { id: 'edge', deletedAt: daysAgo(29) },
      { id: 'old', deletedAt: daysAgo(30) },
      { id: 'older', deletedAt: daysAgo(90) },
    ];

    const result = purgeExpired(trash, NOW);

    expect(result.map((item) => item.id)).toEqual(['new', 'edge']);
  });
});

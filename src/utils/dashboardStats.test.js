import { describe, it, expect } from 'vitest';
import {
  getSummaryStats,
  getOverallTotals,
  getGoalRanking,
  getCategoryChartData,
  getMonthlyActivity,
  getRecentTransactions,
} from './dashboardStats';

function makeGoal(overrides = {}) {
  return {
    id: '1',
    name: 'Goal',
    targetAmount: 100,
    currentAmount: 0,
    currency: 'USD',
    category: 'other',
    deadline: null,
    transactions: [],
    ...overrides,
  };
}

describe('getSummaryStats', () => {
  it('counts completed, nearing and overdue goals', () => {
    const goals = [
      makeGoal({
        id: 'done',
        currentAmount: 100,
        deadline: '2000-01-01',
      }),
      makeGoal({ id: 'near', currentAmount: 80 }),
      makeGoal({ id: 'late', currentAmount: 10, deadline: '2000-01-01' }),
      makeGoal({ id: 'new' }),
    ];

    const stats = getSummaryStats(goals);

    expect(stats.totalGoals).toBe(4);
    expect(stats.completedGoals).toBe(1);
    expect(stats.inProgressGoals).toBe(3);
    expect(stats.nearingCompletion.map((g) => g.id)).toEqual(['near']);
    expect(stats.overdueGoals.map((g) => g.id)).toEqual(['late']);
  });
});

describe('getOverallTotals', () => {
  it('groups totals by currency and lists USD first', () => {
    const goals = [
      makeGoal({
        id: 'k',
        currency: 'KHR',
        currentAmount: 4100,
        targetAmount: 8200,
      }),
      makeGoal({ id: 'a', currentAmount: 100, targetAmount: 400 }),
      makeGoal({ id: 'b', currentAmount: 50, targetAmount: 200 }),
    ];

    const totals = getOverallTotals(goals);

    expect(totals.map((t) => t.currency)).toEqual(['USD', 'KHR']);
    expect(totals[0]).toMatchObject({
      current: 150,
      target: 600,
      remaining: 450,
      percent: 25,
    });
    expect(totals[1].percent).toBe(50);
  });
});

describe('getGoalRanking', () => {
  it('sorts goals from highest to lowest progress', () => {
    const goals = [
      makeGoal({ id: 'A', currentAmount: 20 }),
      makeGoal({ id: 'B', currentAmount: 80 }),
    ];

    const ranking = getGoalRanking(goals);

    expect(ranking.map((r) => r.id)).toEqual(['B', 'A']);
    expect(ranking[0].progress).toBe(80);
  });
});

describe('getCategoryChartData', () => {
  it('counts goals per category and maps unknown ids to "other"', () => {
    const goals = [
      makeGoal({ id: '1', category: 'travel' }),
      makeGoal({ id: '2', category: 'travel' }),
      makeGoal({ id: '3', category: 'zzz-unknown' }),
    ];

    const data = getCategoryChartData(goals, true);

    expect(data).toHaveLength(2);
    expect(data[0]).toMatchObject({
      id: 'travel',
      name: 'Travel',
      value: 2,
      percent: 67,
    });
    expect(data[1]).toMatchObject({
      id: 'other',
      name: 'Other',
      value: 1,
      percent: 33,
    });
  });
});

describe('getMonthlyActivity', () => {
  it('returns net savings per month in USD equivalent', () => {
    const now = new Date(2026, 9, 15); // ត្រូវខែតុលា 2026
    const goals = [
      makeGoal({
        id: 'usd',
        transactions: [
          {
            id: 't1',
            type: 'deposit',
            amount: 100,
            date: new Date(2026, 9, 5, 12).toISOString(),
          },
          {
            id: 't2',
            type: 'withdraw',
            amount: 20,
            date: new Date(2026, 9, 6, 12).toISOString(),
          },
          {
            id: 't3',
            type: 'deposit',
            amount: 50,
            date: new Date(2026, 8, 10, 12).toISOString(),
          },
          {
            id: 't4',
            type: 'deposit',
            amount: 999,
            date: new Date(2025, 0, 10, 12).toISOString(),
          },
        ],
      }),
      makeGoal({
        id: 'khr',
        currency: 'KHR',
        transactions: [
          {
            id: 't5',
            type: 'deposit',
            amount: 4100,
            date: new Date(2026, 8, 12, 12).toISOString(),
          },
        ],
      }),
    ];

    const months = getMonthlyActivity(goals, 6, now);

    expect(months).toHaveLength(6);
    expect(months[5].net).toBe(80); // តុលា: 100 - 20
    expect(months[4].net).toBe(51); // កញ្ញា: 50 + (4100 KHR = 1 USD)
    expect(months[0].net).toBe(0); // ទិន្នន័យឆ្នាំ 2025 ត្រូវរំលង
  });
});

describe('getRecentTransactions', () => {
  it('returns the newest transactions across goals', () => {
    const goals = [
      makeGoal({
        id: 'g1',
        name: 'One',
        transactions: [
          { id: 'a', type: 'deposit', amount: 10, date: '2026-10-01T10:00:00Z' },
          { id: 'b', type: 'deposit', amount: 20, date: '2026-10-03T10:00:00Z' },
        ],
      }),
      makeGoal({
        id: 'g2',
        name: 'Two',
        transactions: [
          { id: 'c', type: 'withdraw', amount: 5, date: '2026-10-02T10:00:00Z' },
        ],
      }),
    ];

    const recent = getRecentTransactions(goals, 2);

    expect(recent.map((r) => r.id)).toEqual(['b', 'c']);
    expect(recent[0].goalName).toBe('One');
  });
});

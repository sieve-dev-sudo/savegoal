import { describe, it, expect } from 'vitest';
import {
  isGoalCompleted,
  getGoalProgress,
  getRemainingAmount,
  filterGoals,
  getSavingPace,
} from './goalStatus';

function makeGoal(overrides = {}) {
  return {
    id: '1',
    name: 'Test Goal',
    targetAmount: 100,
    currentAmount: 0,
    deadline: null,
    currency: 'USD',
    category: 'other',
    transactions: [],
    ...overrides,
  };
}

describe('isGoalCompleted', () => {
  it('returns false when currentAmount is less than targetAmount', () => {
    const goal = makeGoal({ currentAmount: 50, targetAmount: 100 });
    expect(isGoalCompleted(goal)).toBe(false);
  });

  it('returns true when currentAmount equals targetAmount', () => {
    const goal = makeGoal({ currentAmount: 100, targetAmount: 100 });
    expect(isGoalCompleted(goal)).toBe(true);
  });

  it('returns true when currentAmount exceeds targetAmount', () => {
    const goal = makeGoal({ currentAmount: 150, targetAmount: 100 });
    expect(isGoalCompleted(goal)).toBe(true);
  });
});

describe('getGoalProgress', () => {
  it('calculates correct percentage', () => {
    const goal = makeGoal({ currentAmount: 25, targetAmount: 100 });
    expect(getGoalProgress(goal)).toBe(25);
  });

  it('caps progress at 100 even if overfunded', () => {
    const goal = makeGoal({ currentAmount: 150, targetAmount: 100 });
    expect(getGoalProgress(goal)).toBe(100);
  });

  it('returns 0 when targetAmount is 0', () => {
    const goal = makeGoal({ currentAmount: 10, targetAmount: 0 });
    expect(getGoalProgress(goal)).toBe(0);
  });
});

describe('getRemainingAmount', () => {
  it('calculates remaining amount correctly', () => {
    const goal = makeGoal({ currentAmount: 30, targetAmount: 100 });
    expect(getRemainingAmount(goal)).toBe(70);
  });

  it('never returns negative values', () => {
    const goal = makeGoal({ currentAmount: 150, targetAmount: 100 });
    expect(getRemainingAmount(goal)).toBe(0);
  });
});

describe('filterGoals', () => {
  const goals = [
    makeGoal({ id: '1', currentAmount: 100, targetAmount: 100 }),
    makeGoal({ id: '2', currentAmount: 50, targetAmount: 100 }),
    makeGoal({ id: '3', currentAmount: 0, targetAmount: 100 }),
  ];

  it('returns all goals for "all" filter', () => {
    expect(filterGoals(goals, 'all')).toHaveLength(3);
  });

  it('returns only completed goals for "completed" filter', () => {
    const result = filterGoals(goals, 'completed');
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('1');
  });

  it('returns only in-progress goals for "in-progress" filter', () => {
    const result = filterGoals(goals, 'in-progress');
    expect(result).toHaveLength(2);
  });
});

describe('getSavingPace', () => {
  it('returns null when goal has no deadline', () => {
    const goal = makeGoal({ deadline: null });
    expect(getSavingPace(goal)).toBeNull();
  });

  it('returns null when goal is already completed', () => {
    const goal = makeGoal({
      currentAmount: 100,
      targetAmount: 100,
      deadline: '2099-01-01',
    });
    expect(getSavingPace(goal)).toBeNull();
  });

  it('returns null when deadline has passed', () => {
    const goal = makeGoal({ deadline: '2000-01-01' });
    expect(getSavingPace(goal)).toBeNull();
  });

  it('calculates pace correctly for a future deadline', () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 10);
    const deadline = futureDate.toISOString().split('T')[0];

    const goal = makeGoal({
      currentAmount: 0,
      targetAmount: 100,
      deadline,
    });

    const pace = getSavingPace(goal);
    expect(pace).not.toBeNull();
    expect(pace.daysRemaining).toBeGreaterThanOrEqual(9);
    expect(pace.perDay).toBeGreaterThan(0);
  });
});

import { describe, it, expect } from 'vitest';
import { sortGoals, searchGoals } from './sortGoals';

function makeGoal(overrides = {}) {
  return {
    id: '1',
    name: 'Goal',
    targetAmount: 100,
    currentAmount: 0,
    deadline: null,
    createdAt: new Date().toISOString(),
    ...overrides,
  };
}

describe('searchGoals', () => {
  const goals = [
    makeGoal({ id: '1', name: 'Ipad Pro' }),
    makeGoal({ id: '2', name: 'Trip to Siem Reap' }),
    makeGoal({ id: '3', name: 'Laptop' }),
  ];

  it('returns all goals when query is empty', () => {
    expect(searchGoals(goals, '')).toHaveLength(3);
  });

  it('filters goals by case-insensitive partial match', () => {
    const result = searchGoals(goals, 'ipad');
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Ipad Pro');
  });

  it('matches regardless of case', () => {
    const result = searchGoals(goals, 'LAPTOP');
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Laptop');
  });

  it('returns multiple goals when query matches several names', () => {
    const result = searchGoals(goals, 'ip');
    expect(result).toHaveLength(2);
  });

  it('returns empty array when nothing matches', () => {
    expect(searchGoals(goals, 'xyz123')).toHaveLength(0);
  });
});

describe('sortGoals', () => {
  it('sorts by name alphabetically', () => {
    const goals = [
      makeGoal({ id: '1', name: 'Zebra' }),
      makeGoal({ id: '2', name: 'Apple' }),
    ];
    const result = sortGoals(goals, 'name');
    expect(result[0].name).toBe('Apple');
    expect(result[1].name).toBe('Zebra');
  });

  it('sorts by progress-high descending', () => {
    const goals = [
      makeGoal({ id: '1', currentAmount: 20, targetAmount: 100 }),
      makeGoal({ id: '2', currentAmount: 80, targetAmount: 100 }),
    ];
    const result = sortGoals(goals, 'progress-high');
    expect(result[0].id).toBe('2');
  });

  it('sorts goals with deadline before goals without deadline', () => {
    const goals = [
      makeGoal({ id: '1', deadline: null }),
      makeGoal({ id: '2', deadline: '2026-01-01' }),
    ];
    const result = sortGoals(goals, 'deadline');
    expect(result[0].id).toBe('2');
  });

  it('does not mutate the original array', () => {
    const goals = [
      makeGoal({ id: '1', name: 'B' }),
      makeGoal({ id: '2', name: 'A' }),
    ];
    const original = [...goals];
    sortGoals(goals, 'name');
    expect(goals).toEqual(original);
  });
});

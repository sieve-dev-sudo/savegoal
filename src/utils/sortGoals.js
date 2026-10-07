import { getGoalProgress } from './goalStatus';

export const SORT_OPTIONS = [
  { id: 'newest', label: 'ថ្មីបំផុត' },
  { id: 'deadline', label: 'Deadline ជិតបំផុត' },
  { id: 'progress-high', label: 'ភាគរយខ្ពស់បំផុត' },
  { id: 'progress-low', label: 'ភាគរយទាបបំផុត' },
  { id: 'name', label: 'ឈ្មោះ (A-Z)' },
];

export function sortGoals(goals, sortBy) {
  const copy = [...goals];

  switch (sortBy) {
    case 'deadline': {
      return copy.sort((a, b) => {
        if (!a.deadline && !b.deadline) return 0;
        if (!a.deadline) return 1;
        if (!b.deadline) return -1;
        return new Date(a.deadline) - new Date(b.deadline);
      });
    }

    case 'progress-high': {
      return copy.sort((a, b) => getGoalProgress(b) - getGoalProgress(a));
    }

    case 'progress-low': {
      return copy.sort((a, b) => getGoalProgress(a) - getGoalProgress(b));
    }

    case 'name': {
      return copy.sort((a, b) => a.name.localeCompare(b.name));
    }

    case 'newest':
    default: {
      return copy.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }
  }
}

export function searchGoals(goals, query) {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return goals;
  return goals.filter((goal) => goal.name.toLowerCase().includes(trimmed));
}

/**
 * តម្រៀប transaction (deposit/withdraw) របស់ Goal មួយ
 * - 'default': លំដាប់ដើម (ថ្មីបំផុតនៅលើគេ ដូចដែលបានបញ្ចូលក្នុង state)
 * - 'date': តាមកាលបរិច្ឆេទ ថ្មីបំផុតនៅលើគេ
 * - 'amount': តាមចំនួនទឹកប្រាក់ ធំបំផុតនៅលើគេ
 */
export function sortTransactions(transactions, sortBy) {
  const copy = [...transactions];

  switch (sortBy) {
    case 'date': {
      return copy.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    case 'amount': {
      return copy.sort((a, b) => b.amount - a.amount);
    }

    case 'default':
    default: {
      return copy;
    }
  }
}

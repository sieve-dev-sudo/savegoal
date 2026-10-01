import { getDaysRemaining } from './date';

export function isGoalCompleted(goal) {
  return goal.currentAmount >= goal.targetAmount;
}

export function getGoalProgress(goal) {
  if (goal.targetAmount <= 0) return 0;
  const percent = (goal.currentAmount / goal.targetAmount) * 100;
  return Math.min(100, Math.max(0, Math.round(percent)));
}

export function getRemainingAmount(goal) {
  const remaining = goal.targetAmount - goal.currentAmount;
  return Math.max(0, remaining);
}

export function filterGoals(goals, filter) {
  switch (filter) {
    case 'in-progress':
      return goals.filter((goal) => !isGoalCompleted(goal));
    case 'completed':
      return goals.filter((goal) => isGoalCompleted(goal));
    case 'all':
    default:
      return goals;
  }
}

/**
 * គណនាចំនួនទឹកប្រាក់ត្រូវសន្សំ ក្នុងមួយថ្ងៃ/សប្តាហ៍/ខែ ដើម្បីទាន់ deadline
 * ត្រឡប់ null ប្រសិនបើ៖ គ្មាន deadline, Goal សម្រេចរួច, ឬ deadline ហួសកាលកំណត់
 */
export function getSavingPace(goal) {
  if (!goal.deadline) return null;
  if (isGoalCompleted(goal)) return null;

  const daysRemaining = getDaysRemaining(goal.deadline);
  if (daysRemaining === null || daysRemaining <= 0) return null;

  const remainingAmount = getRemainingAmount(goal);

  const perDay = remainingAmount / daysRemaining;
  const perWeek = perDay * 7;
  const perMonth = perDay * 30;

  return {
    daysRemaining,
    perDay: roundUpTo2(perDay),
    perWeek: roundUpTo2(perWeek),
    perMonth: roundUpTo2(perMonth),
  };
}

function roundUpTo2(value) {
  return Math.ceil(value * 100) / 100;
}

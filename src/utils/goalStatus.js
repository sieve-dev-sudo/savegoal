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

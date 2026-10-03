import { isGoalCompleted, getGoalProgress } from './goalStatus';
import { getDaysRemaining } from './date';
import { getCategory } from '../constants/categories';

/**
 * សរុបចំនួនសន្សំ, Goal ជិតសម្រេច, Goal យឺតយ៉ាវ
 * ចំណាំ: ចំនួនសរុបគណនាដោយញែកតាម currency ព្រោះ USD/KHR មិនអាចបូកបញ្ចូលគ្នាបាន
 */
export function getSummaryStats(goals) {
  const totalGoals = goals.length;
  const completedGoals = goals.filter(isGoalCompleted).length;
  const inProgressGoals = totalGoals - completedGoals;

  const totalsByCurrency = {};
  goals.forEach((goal) => {
    if (!totalsByCurrency[goal.currency]) {
      totalsByCurrency[goal.currency] = { current: 0, target: 0 };
    }
    totalsByCurrency[goal.currency].current += goal.currentAmount;
    totalsByCurrency[goal.currency].target += goal.targetAmount;
  });

  // Goal ជិតសម្រេច: progress >= 70% ប៉ុន្តែមិនទាន់ 100%
  const nearingCompletion = goals.filter((goal) => {
    const progress = getGoalProgress(goal);
    return progress >= 70 && progress < 100;
  });

  // Goal យឺតយ៉ាវ: hoursed deadline ហើយមិនទាន់សម្រេច
  const overdueGoals = goals.filter((goal) => {
    if (isGoalCompleted(goal)) return false;
    const days = getDaysRemaining(goal.deadline);
    return days !== null && days < 0;
  });

  return {
    totalGoals,
    completedGoals,
    inProgressGoals,
    totalsByCurrency,
    nearingCompletion,
    overdueGoals,
  };
}

/**
 * ទិន្នន័យសម្រាប់ Bar chart: ប្រៀបធៀបភាគរយ Goal នីមួយៗ
 */
export function getProgressChartData(goals) {
  return goals.map((goal) => ({
    name: goal.name.length > 12 ? `${goal.name.slice(0, 12)}...` : goal.name,
    fullName: goal.name,
    progress: getGoalProgress(goal),
  }));
}

/**
 * ទិន្នន័យសម្រាប់ Pie chart: ចំនួន Goal តាមប្រភេទ
 */
export function getCategoryChartData(goals) {
  const counts = {};
  goals.forEach((goal) => {
    counts[goal.category] = (counts[goal.category] || 0) + 1;
  });

  return Object.entries(counts).map(([categoryId, count]) => {
    const category = getCategory(categoryId);
    return {
      name: category.label,
      value: count,
      color: category.color,
    };
  });
}

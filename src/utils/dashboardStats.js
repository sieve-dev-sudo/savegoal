import { isGoalCompleted, getGoalProgress } from './goalStatus';
import { getDaysRemaining } from './date';
import { getCategory } from '../constants/categories';
import { convertKhrToUsd } from './currency';

function toPercent(current, target) {
  if (target <= 0) return 0;
  return Math.min(100, Math.max(0, Math.round((current / target) * 100)));
}

function toUsd(amount, currency) {
  return currency === 'KHR' ? convertKhrToUsd(amount) : amount;
}

function monthKey(date) {
  return `${date.getFullYear()}-${date.getMonth()}`;
}

/**
 * ចំនួន Goal សរុប, សម្រេចហើយ, ជិតសម្រេច (70%-99%), ហួសកាលកំណត់
 */
export function getSummaryStats(goals) {
  const totalGoals = goals.length;
  const completedGoals = goals.filter(isGoalCompleted).length;

  const nearingCompletion = goals.filter((goal) => {
    const progress = getGoalProgress(goal);
    return progress >= 70 && progress < 100;
  });

  const overdueGoals = goals.filter((goal) => {
    if (isGoalCompleted(goal)) return false;
    const days = getDaysRemaining(goal.deadline);
    return days !== null && days < 0;
  });

  return {
    totalGoals,
    completedGoals,
    inProgressGoals: totalGoals - completedGoals,
    nearingCompletion,
    overdueGoals,
  };
}

/**
 * សរុបសន្សំ/គោលដៅ ញែកតាមរូបិយប័ណ្ណ (USD មុន)
 */
export function getOverallTotals(goals) {
  const map = {};

  goals.forEach((goal) => {
    const currency = goal.currency || 'USD';
    if (!map[currency]) {
      map[currency] = { currency, current: 0, target: 0 };
    }
    map[currency].current += goal.currentAmount;
    map[currency].target += goal.targetAmount;
  });

  return Object.values(map)
    .map((item) => ({
      ...item,
      remaining: Math.max(0, item.target - item.current),
      percent: toPercent(item.current, item.target),
    }))
    .sort((a, b) => {
      if (a.currency === 'USD') return -1;
      if (b.currency === 'USD') return 1;
      return a.currency.localeCompare(b.currency);
    });
}

/**
 * ចំណាត់ថ្នាក់ Goal តាមភាគរយ (ខ្ពស់ទៅទាប)
 */
export function getGoalRanking(goals) {
  return goals
    .map((goal) => ({
      id: goal.id,
      name: goal.name,
      category: goal.category,
      currency: goal.currency,
      current: goal.currentAmount,
      target: goal.targetAmount,
      progress: getGoalProgress(goal),
      completed: isGoalCompleted(goal),
    }))
    .sort((a, b) => b.progress - a.progress || a.name.localeCompare(b.name));
}

/**
 * ចំនួន Goal តាមប្រភេទ សម្រាប់ Donut chart
 */
export function getCategoryChartData(goals, isEnglish = false) {
  const counts = {};

  goals.forEach((goal) => {
    const id = getCategory(goal.category).id;
    counts[id] = (counts[id] || 0) + 1;
  });

  const total = goals.length;

  return Object.entries(counts)
    .map(([id, count]) => {
      const category = getCategory(id);
      return {
        id: category.id,
        name: isEnglish ? category.labelEn : category.label,
        value: count,
        color: category.color,
        percent: total > 0 ? Math.round((count / total) * 100) : 0,
      };
    })
    .sort((a, b) => b.value - a.value);
}

/**
 * ប្រាក់សន្សំសុទ្ធ (បញ្ចូល − ដក) ក្នុងមួយខែ គិតជាតម្លៃសមមូល USD
 * ត្រឡប់ array តាមលំដាប់ពីខែចាស់ទៅថ្មី
 */
export function getMonthlyActivity(goals, monthsCount = 6, now = new Date()) {
  const months = [];

  for (let i = monthsCount - 1; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push({ key: monthKey(date), date, net: 0 });
  }

  const byKey = Object.fromEntries(months.map((m) => [m.key, m]));

  goals.forEach((goal) => {
    (goal.transactions || []).forEach((tx) => {
      const bucket = byKey[monthKey(new Date(tx.date))];
      if (!bucket) return;
      const value = toUsd(tx.amount, goal.currency);
      bucket.net += tx.type === 'deposit' ? value : -value;
    });
  });

  return months.map((m) => ({ ...m, net: Math.round(m.net * 100) / 100 }));
}

/**
 * ប្រតិបត្តិការថ្មីៗពី Goal ទាំងអស់
 */
export function getRecentTransactions(goals, limit = 5) {
  const all = [];

  goals.forEach((goal) => {
    (goal.transactions || []).forEach((tx) => {
      all.push({
        id: tx.id,
        goalId: goal.id,
        goalName: goal.name,
        currency: goal.currency,
        type: tx.type,
        amount: tx.amount,
        note: tx.note || '',
        date: tx.date,
      });
    });
  });

  return all
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, limit);
}

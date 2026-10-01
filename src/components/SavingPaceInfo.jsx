import { TrendingUp } from 'lucide-react';
import { getSavingPace, isGoalCompleted } from '../utils/goalStatus';
import { formatCurrency } from '../utils/currency';

function SavingPaceInfo({ goal }) {
  const pace = getSavingPace(goal);
  const completed = isGoalCompleted(goal);

  if (completed || !pace) return null;

  let label;
  if (pace.daysRemaining <= 10) {
    label = `${formatCurrency(pace.perDay, goal.currency)}/ថ្ងៃ`;
  } else if (pace.daysRemaining <= 45) {
    label = `${formatCurrency(pace.perWeek, goal.currency)}/សប្តាហ៍`;
  } else {
    label = `${formatCurrency(pace.perMonth, goal.currency)}/ខែ`;
  }

  return (
    <div className="mt-2 flex items-center gap-1.5 rounded-lg bg-indigo-50 px-2.5 py-1.5 text-xs text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">
      <TrendingUp className="h-3.5 w-3.5 shrink-0" />
      <span>
        ត្រូវសន្សំប្រហែល <strong>{label}</strong> ដើម្បីទាន់ deadline
      </span>
    </div>
  );
}

export default SavingPaceInfo;

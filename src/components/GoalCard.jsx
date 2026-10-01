import {
  Pencil,
  Trash2,
  CheckCircle2,
  Wallet,
  Calendar,
  History,
} from 'lucide-react';
import {
  getGoalProgress,
  isGoalCompleted,
  getRemainingAmount,
} from '../utils/goalStatus';
import { formatDeadlineLabel, getDaysRemaining } from '../utils/date';
import { formatCurrency } from '../utils/currency';
import ProgressBar from './ProgressBar';
import CategoryBadge from './CategoryBadge';
import SavingPaceInfo from './SavingPaceInfo';

function GoalCard({ goal, onEdit, onDelete, onTransact, onViewHistory }) {
  const progress = getGoalProgress(goal);
  const completed = isGoalCompleted(goal);
  const remaining = getRemainingAmount(goal);

  const deadlineLabel = formatDeadlineLabel(goal.deadline);
  const daysRemaining = getDaysRemaining(goal.deadline);
  const isOverdue = daysRemaining !== null && daysRemaining < 0 && !completed;

  return (
    <li className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="truncate font-medium text-slate-900 dark:text-slate-100">
              {goal.name}
            </p>
            {completed && (
              <span className="flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/40 dark:text-green-300">
                <CheckCircle2 className="h-3 w-3" />
                សម្រេចហើយ
              </span>
            )}
            {isOverdue && (
              <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700 dark:bg-red-900/40 dark:text-red-300">
                ហួសកាលកំណត់
              </span>
            )}
          </div>
          <div className="mt-1.5 flex flex-wrap items-center gap-2">
            <CategoryBadge categoryId={goal.category} />
            {deadlineLabel && (
              <span
                className={`flex items-center gap-1 text-sm ${
                  isOverdue
                    ? 'font-medium text-red-500'
                    : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                <Calendar className="h-3.5 w-3.5" />
                {deadlineLabel}
              </span>
            )}
          </div>
        </div>

        <div className="flex shrink-0 gap-1">
          <button
            type="button"
            onClick={() => onViewHistory(goal)}
            aria-label={`View transaction history for ${goal.name}`}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700"
          >
            <History className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => onTransact(goal)}
            aria-label={`Deposit or withdraw for ${goal.name}`}
            className="rounded-lg p-2 text-green-600 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-900/30"
          >
            <Wallet className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => onEdit(goal)}
            aria-label={`Edit ${goal.name}`}
            className="rounded-lg p-2 text-indigo-600 hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-indigo-900/30"
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => onDelete(goal)}
            aria-label={`Delete ${goal.name}`}
            className="rounded-lg p-2 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/30"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mt-3">
        <div className="mb-1 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>
            {formatCurrency(goal.currentAmount, goal.currency)} /{' '}
            {formatCurrency(goal.targetAmount, goal.currency)}
          </span>
          <span className="font-medium text-slate-700 dark:text-slate-300">
            {progress}%
          </span>
        </div>

        <ProgressBar progress={progress} completed={completed} />

        <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">
          {completed
            ? 'បានសន្សំគ្រប់ចំនួនហើយ! 🎉'
            : `នៅសល់ ${formatCurrency(remaining, goal.currency)} ត្រូវសន្សំបន្ថែម`}
        </p>

        <SavingPaceInfo goal={goal} />
      </div>
    </li>
  );
}

export default GoalCard;

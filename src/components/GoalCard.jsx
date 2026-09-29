import { Pencil, Trash2, CheckCircle2 } from 'lucide-react';
import { getGoalProgress, isGoalCompleted } from '../utils/goalStatus';
import { CATEGORIES } from '../constants/categories';

function GoalCard({ goal, onEdit, onDelete }) {
  const progress = getGoalProgress(goal);
  const completed = isGoalCompleted(goal);
  const categoryLabel =
    CATEGORIES.find((c) => c.id === goal.category)?.label || goal.category;

  return (
    <li className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="truncate font-medium text-slate-900 dark:text-slate-100">
              {goal.name}
            </p>
            {completed && (
              <span className="flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/40 dark:text-green-300">
                <CheckCircle2 className="h-3 w-3" />
                សម្រេចហើយ
              </span>
            )}
          </div>
          <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
            {categoryLabel}
            {goal.deadline && ` · Deadline: ${goal.deadline}`}
          </p>
        </div>

        <div className="flex shrink-0 gap-1">
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
        <div className="mb-1 flex justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>
            {goal.currentAmount} / {goal.targetAmount} {goal.currency}
          </span>
          <span>{progress}%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
          <div
            className={`h-full rounded-full transition-all ${
              completed ? 'bg-green-500' : 'bg-indigo-500'
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </li>
  );
}

export default GoalCard;

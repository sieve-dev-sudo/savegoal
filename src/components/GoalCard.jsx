import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import {
  getGoalProgress,
  isGoalCompleted,
  getRemainingAmount,
} from '../utils/goalStatus';
import { getDaysRemaining } from '../utils/date';
import { formatCurrency } from '../utils/currency';
import { useLanguage } from '../context/LanguageContext';
import ProgressBar from './ProgressBar';
import GoalThumbnail from './GoalThumbnail';

function GoalCard({ goal, onOpen }) {
  const { t } = useLanguage();
  const progress = getGoalProgress(goal);
  const completed = isGoalCompleted(goal);
  const remaining = getRemainingAmount(goal);

  const daysRemaining = getDaysRemaining(goal.deadline);
  const isOverdue = daysRemaining !== null && daysRemaining < 0 && !completed;

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: -40, transition: { duration: 0.15 } }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800"
    >
      <button
        type="button"
        onClick={() => onOpen(goal)}
        className="flex w-full items-center gap-3 p-3.5 text-left hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-cyan-700 dark:hover:bg-slate-700/40"
      >
        <GoalThumbnail size={64} />

        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-3">
            <div className="flex min-w-0 items-center gap-1.5">
              <p className="truncate text-lg font-medium text-slate-900 dark:text-slate-100">
                {goal.name}
              </p>
              {completed && (
                <CheckCircle2
                  className="h-4 w-4 shrink-0 text-lime-600"
                  aria-label={t.goalCard.completed}
                />
              )}
              {isOverdue && (
                <span className="shrink-0 rounded bg-red-100 px-1.5 py-0.5 text-xs font-medium text-red-700 dark:bg-red-900/40 dark:text-red-300">
                  {t.goalCard.overdue}
                </span>
              )}
            </div>
            <p className="shrink-0 text-lg text-slate-900 dark:text-slate-100">
              {formatCurrency(goal.targetAmount, goal.currency)}
            </p>
          </div>

          <div className="mt-2">
            <ProgressBar progress={progress} completed={completed} />
          </div>

          <div className="mt-1.5 flex items-center justify-between text-sm text-slate-600 dark:text-slate-300">
            <span>{formatCurrency(goal.currentAmount, goal.currency)}</span>
            <span>{formatCurrency(remaining, goal.currency)}</span>
          </div>
        </div>
      </button>
    </motion.li>
  );
}

export default GoalCard;

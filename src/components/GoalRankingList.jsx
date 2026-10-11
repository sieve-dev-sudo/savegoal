import { CheckCircle2 } from 'lucide-react';
import { formatCurrency } from '../utils/currency';
import ProgressBar from './ProgressBar';

function GoalRankingList({ ranking }) {
  return (
    <ul className="space-y-4">
      {ranking.map((item, index) => (
        <li key={item.id}>
          <div className="flex items-center justify-between gap-3 text-sm">
            <div className="flex min-w-0 items-center gap-2">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-medium text-slate-600 dark:bg-slate-700 dark:text-slate-300">
                {index + 1}
              </span>
              <span className="truncate font-medium text-slate-800 dark:text-slate-100">
                {item.name}
              </span>
              {item.completed && (
                <CheckCircle2 className="h-4 w-4 shrink-0 text-lime-600" />
              )}
            </div>
            <span className="shrink-0 font-medium text-slate-700 dark:text-slate-200">
              {item.progress}%
            </span>
          </div>

          <div className="mt-1.5">
            <ProgressBar progress={item.progress} completed={item.completed} />
          </div>

          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            {formatCurrency(item.current, item.currency)} /{' '}
            {formatCurrency(item.target, item.currency)}
          </p>
        </li>
      ))}
    </ul>
  );
}

export default GoalRankingList;

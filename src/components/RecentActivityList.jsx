import { ArrowDownCircle, ArrowUpCircle } from 'lucide-react';
import { formatCurrency } from '../utils/currency';
import { formatDate } from '../utils/date';
import { useLanguage } from '../context/LanguageContext';

function RecentActivityList({ items }) {
  const { t } = useLanguage();

  if (items.length === 0) {
    return (
      <p className="py-6 text-center text-sm text-slate-500 dark:text-slate-400">
        {t.dashboard.noRecent}
      </p>
    );
  }

  return (
    <ul className="divide-y divide-slate-100 dark:divide-slate-700">
      {items.map((item) => {
        const isDeposit = item.type === 'deposit';
        return (
          <li key={item.id} className="flex items-center gap-3 py-3">
            <div
              className={`rounded-full p-2 ${
                isDeposit
                  ? 'bg-lime-100 dark:bg-lime-900/30'
                  : 'bg-red-100 dark:bg-red-900/30'
              }`}
            >
              {isDeposit ? (
                <ArrowDownCircle className="h-4 w-4 text-lime-700 dark:text-lime-400" />
              ) : (
                <ArrowUpCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-slate-800 dark:text-slate-100">
                {item.goalName}
              </p>
              <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                {formatDate(item.date)}
                {item.note ? ` · ${item.note}` : ''}
              </p>
            </div>

            <span
              className={`shrink-0 text-sm font-medium ${
                isDeposit
                  ? 'text-lime-700 dark:text-lime-400'
                  : 'text-red-600 dark:text-red-400'
              }`}
            >
              {isDeposit ? '+' : '−'}
              {formatCurrency(item.amount, item.currency)}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

export default RecentActivityList;

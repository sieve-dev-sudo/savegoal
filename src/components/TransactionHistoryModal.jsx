import { X, ArrowDownCircle, ArrowUpCircle, Inbox } from 'lucide-react';
import { formatDateTime } from '../utils/date';
import { formatCurrency } from '../utils/currency';

function TransactionHistoryModal({ goal, onClose }) {
  const transactions = goal.transactions || [];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="flex max-h-[80vh] w-full max-w-md flex-col rounded-xl bg-white p-5 shadow-xl dark:bg-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              ប្រវត្តិប្រតិបត្តិការ
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {goal.name}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-lg p-1 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {transactions.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center py-8 text-center">
            <Inbox className="h-10 w-10 text-slate-300 dark:text-slate-600" />
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              មិនទាន់មានប្រតិបត្តិការទេ
            </p>
          </div>
        ) : (
          <ul className="flex-1 space-y-2 overflow-y-auto">
            {transactions.map((tx) => {
              const isDeposit = tx.type === 'deposit';
              return (
                <li
                  key={tx.id}
                  className="flex items-start gap-3 rounded-lg border border-slate-200 p-3 dark:border-slate-700"
                >
                  <div
                    className={`mt-0.5 rounded-full p-1.5 ${
                      isDeposit
                        ? 'bg-green-100 dark:bg-green-900/40'
                        : 'bg-red-100 dark:bg-red-900/40'
                    }`}
                  >
                    {isDeposit ? (
                      <ArrowDownCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                    ) : (
                      <ArrowUpCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`font-medium ${
                          isDeposit
                            ? 'text-green-600 dark:text-green-400'
                            : 'text-red-600 dark:text-red-400'
                        }`}
                      >
                        {isDeposit ? '+' : '−'}
                        {formatCurrency(tx.amount, goal.currency)}
                      </span>
                      <span className="shrink-0 text-xs text-slate-400 dark:text-slate-500">
                        {formatDateTime(tx.date)}
                      </span>
                    </div>
                    {tx.note && (
                      <p className="mt-0.5 truncate text-sm text-slate-500 dark:text-slate-400">
                        {tx.note}
                      </p>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

export default TransactionHistoryModal;

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { X, Pencil, Plus, Inbox } from 'lucide-react';
import { useGoals } from '../context/GoalContext';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';
import {
  getGoalProgress,
  isGoalCompleted,
  getRemainingAmount,
  getSavingPace,
} from '../utils/goalStatus';
import { formatCurrency } from '../utils/currency';
import { formatDate, getDaysRemaining } from '../utils/date';
import { sortTransactions } from '../utils/sortGoals';
import CircularProgress from './CircularProgress';
import GoalFormModal from './GoalFormModal';
import DepositWithdrawModal from './DepositWithdrawModal';
import RecordSortDropdown from './RecordSortDropdown';
import { fireGoalCompletedConfetti } from '../utils/confetti';

function formatTargetDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

function formatCountdown(days) {
  if (days === null) return '';
  if (days < 0) return `${Math.abs(days)} Days Overdue`;
  const months = Math.floor(days / 30);
  const remDays = days % 30;
  if (months > 0) return `${months} Months ${remDays} Days To Go`;
  return `${days} Days To Go`;
}

function GoalDetailModal({ goalId, onClose }) {
  const { goals, editGoal, depositToGoal, withdrawFromGoal } = useGoals();
  const { t } = useLanguage();
  const { showToast } = useToast();

  const [tab, setTab] = useState('goal');
  const [recordSort, setRecordSort] = useState('default');
  const [showEdit, setShowEdit] = useState(false);
  const [showTransact, setShowTransact] = useState(false);

  const goal = goals.find((g) => g.id === goalId);

  const sortedTransactions = useMemo(() => {
    if (!goal) return [];
    return sortTransactions(goal.transactions || [], recordSort);
  }, [goal, recordSort]);

  if (!goal) return null;

  const progress = getGoalProgress(goal);
  const completed = isGoalCompleted(goal);
  const remaining = getRemainingAmount(goal);
  const daysRemaining = getDaysRemaining(goal.deadline);
  const pace = getSavingPace(goal);

  const hasFooterContent =
    tab === 'goal' && (goal.deadline || pace || completed);

  const handleSaveEdit = (formData) => {
    editGoal(goal.id, formData);
    showToast(t.toast.goalUpdated, 'success');
    setShowEdit(false);
  };

  const handleDeposit = (amount, note) => {
    const wasCompletedBefore = isGoalCompleted(goal);
    depositToGoal(goal.id, amount, note);
    showToast(t.toast.deposited(`${amount} ${goal.currency}`), 'success');
    const willBeCompleted = goal.currentAmount + amount >= goal.targetAmount;
    if (!wasCompletedBefore && willBeCompleted) {
      setTimeout(() => fireGoalCompletedConfetti(), 200);
    }
    setShowTransact(false);
  };

  const handleWithdraw = (amount, note) => {
    withdrawFromGoal(goal.id, amount, note);
    showToast(t.toast.withdrawn(`${amount} ${goal.currency}`), 'success');
    setShowTransact(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-0 sm:p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        onClick={(e) => e.stopPropagation()}
        className="relative flex h-full w-full flex-col overflow-hidden bg-slate-100 dark:bg-slate-900 sm:h-[580px] sm:max-h-[92vh] sm:max-w-md sm:rounded-2xl"
      >
        {/* ===== Header (ថេរ) ===== */}
        <div className="shrink-0 bg-slate-800 px-4 pb-0 pt-3 text-amber-400">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="rounded-lg p-1 hover:bg-slate-700/50"
            >
              <X className="h-5 w-5" />
            </button>
            <h2 className="truncate text-base font-medium">{goal.name}</h2>
            <button
              type="button"
              onClick={() => setShowEdit(true)}
              aria-label="Edit"
              className="rounded-lg p-1 hover:bg-slate-700/50"
            >
              <Pencil className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-2 flex justify-center gap-8 text-sm">
            <button
              type="button"
              onClick={() => setTab('goal')}
              className={`border-b-2 pb-2 font-medium tracking-wide ${
                tab === 'goal'
                  ? 'border-amber-400 text-amber-400'
                  : 'border-transparent text-slate-400'
              }`}
            >
              GOAL
            </button>
            <button
              type="button"
              onClick={() => setTab('records')}
              className={`border-b-2 pb-2 font-medium tracking-wide ${
                tab === 'records'
                  ? 'border-amber-400 text-amber-400'
                  : 'border-transparent text-slate-400'
              }`}
            >
              RECORDS
            </button>
          </div>
        </div>

        {/* ===== Body (ពង្រីកពេញ + scroll បាន) ===== */}
        {tab === 'goal' ? (
          <div className="flex-1 overflow-y-auto px-4 pb-5 pt-5">
            <div className="flex justify-center">
              <CircularProgress progress={progress} size={190} />
            </div>

            <p className="mt-3 text-center text-xs font-medium uppercase tracking-widest text-slate-400">
              Saved
            </p>
            <p className="text-center text-3xl font-semibold text-slate-800 dark:text-slate-100">
              {formatCurrency(goal.currentAmount, goal.currency)}
            </p>

            <div className="mt-5 flex items-start justify-between px-2">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Remaining
                </p>
                <p className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                  {formatCurrency(remaining, goal.currency)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Goal
                </p>
                <p className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                  {formatCurrency(goal.targetAmount, goal.currency)}
                </p>
              </div>
            </div>

            <div className="mt-5 flex justify-center">
              <button
                type="button"
                onClick={() => setShowTransact(true)}
                className="flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-medium text-slate-800 shadow-md hover:bg-slate-50 dark:bg-slate-700 dark:text-slate-100"
              >
                <Plus className="h-4 w-4 text-indigo-600" />
                Add saving
              </button>
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto bg-white px-4 py-4 dark:bg-slate-800">
            <RecordSortDropdown value={recordSort} onChange={setRecordSort} />

            {sortedTransactions.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Inbox className="h-10 w-10 text-slate-300 dark:text-slate-600" />
                <p className="mt-2 text-sm text-slate-400">{t.history.empty}</p>
              </div>
            ) : (
              <ul className="mt-3 space-y-2">
                {sortedTransactions.map((tx) => (
                  <li
                    key={tx.id}
                    className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3 dark:bg-slate-700/50"
                  >
                    <span className="text-sm text-slate-700 dark:text-slate-200">
                      {formatDate(tx.date)}
                    </span>
                    <span
                      className={`text-sm font-medium ${
                        tx.type === 'deposit'
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-red-600 dark:text-red-400'
                      }`}
                    >
                      {tx.type === 'deposit' ? '' : '− '}
                      {formatCurrency(tx.amount, goal.currency)}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* ===== Footer navy ===== */}
        <div
          className={`shrink-0 bg-slate-800 px-4 text-center text-white ${
            hasFooterContent ? 'py-4' : 'py-3'
          }`}
        >
          {tab === 'goal' && (
            <>
              {goal.deadline && (
                <>
                  <span className="inline-block rounded-full border border-slate-500 px-4 py-1 text-xs">
                    Target on {formatTargetDate(goal.deadline)}
                  </span>
                  <p className="mt-1.5 text-sm font-medium text-amber-400">
                    {formatCountdown(daysRemaining)}
                  </p>
                </>
              )}

              {pace && (
                <div className="mt-3 flex justify-around text-sm">
                  <div>
                    <p className="text-slate-400">Daily</p>
                    <p className="font-semibold">
                      {formatCurrency(pace.perDay, goal.currency)}
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-400">Weekly</p>
                    <p className="font-semibold">
                      {formatCurrency(pace.perWeek, goal.currency)}
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-400">Monthly</p>
                    <p className="font-semibold">
                      {formatCurrency(pace.perMonth, goal.currency)}
                    </p>
                  </div>
                </div>
              )}

              {completed && (
                <p className="mt-2 text-sm font-medium text-green-400">
                  🎉 {t.goalCard.completedMsg}
                </p>
              )}
            </>
          )}

          {!hasFooterContent && <div className="h-2" />}
        </div>
      </motion.div>

      {showEdit && (
        <GoalFormModal
          initialData={goal}
          onSave={handleSaveEdit}
          onClose={() => setShowEdit(false)}
        />
      )}

      {showTransact && (
        <DepositWithdrawModal
          goal={goal}
          onDeposit={handleDeposit}
          onWithdraw={handleWithdraw}
          onClose={() => setShowTransact(false)}
        />
      )}
    </motion.div>
  );
}

export default GoalDetailModal;

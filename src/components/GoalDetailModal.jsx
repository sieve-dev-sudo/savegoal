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

const PACE_ITEMS = [
  { key: 'perDay', label: 'Daily' },
  { key: 'perWeek', label: 'Weekly' },
  { key: 'perMonth', label: 'Monthly' },
];

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
  const { t, isEnglish } = useLanguage();
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

  // Goal ដែលសម្រេចហើយ ត្រូវសន្សំ 0; បើគ្មាន deadline ឬហួសកាលកំណត់ គ្មានតម្លៃ (null)
  const paceValues = completed
    ? { perDay: 0, perWeek: 0, perMonth: 0 }
    : getSavingPace(goal);

  const noTargetLabel = isEnglish
    ? 'No target date'
    : 'មិនទាន់កំណត់កាលបរិច្ឆេទ';
  const setTargetHint = isEnglish
    ? 'Edit the goal to set a target date'
    : 'កែ Goal ដើម្បីកំណត់កាលបរិច្ឆេទគោលដៅ';

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
        className="relative flex h-full w-full flex-col overflow-hidden bg-slate-100 dark:bg-slate-900 sm:h-[760px] sm:max-h-[94vh] sm:max-w-md sm:rounded-2xl"
      >
        {/* ===== Header ===== */}
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
                  ? 'border-amber-400 text-white'
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
                  ? 'border-amber-400 text-white'
                  : 'border-transparent text-slate-400'
              }`}
            >
              RECORDS
            </button>
          </div>
        </div>

        {tab === 'goal' ? (
          <>
            {/* ===== Body ===== */}
            <div className="flex flex-1 flex-col justify-center overflow-y-auto px-4 pb-9 pt-6">
              <div className="flex justify-center">
                <CircularProgress progress={progress} size={210} />
              </div>

              <p className="mt-3 text-center text-sm uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Saved
              </p>
              <p className="text-center text-3xl font-medium text-slate-800 dark:text-slate-100">
                {formatCurrency(goal.currentAmount, goal.currency)}
              </p>

              <div className="mt-6 grid grid-cols-2 text-center">
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    Remaining
                  </p>
                  <p className="text-xl font-medium text-slate-800 dark:text-slate-100">
                    {formatCurrency(remaining, goal.currency)}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    Goal
                  </p>
                  <p className="text-xl font-medium text-slate-800 dark:text-slate-100">
                    {formatCurrency(goal.targetAmount, goal.currency)}
                  </p>
                </div>
              </div>
            </div>

            {/* ===== ប៊ូតុង Add saving ត្រួតលើបន្ទាត់ចែក ===== */}
            <div className="relative z-10 h-0 shrink-0">
              <div className="absolute inset-x-0 flex -translate-y-1/2 justify-center">
                <button
                  type="button"
                  onClick={() => setShowTransact(true)}
                  className="flex items-center gap-3 rounded-full bg-white px-7 py-3 text-base font-medium text-slate-800 shadow-lg hover:bg-slate-50 dark:bg-slate-700 dark:text-slate-100"
                >
                  <Plus className="h-5 w-5 text-indigo-600" />
                  Add saving
                </button>
              </div>
            </div>

            {/* ===== Footer navy: បង្ហាញជានិច្ច ===== */}
            <div className="shrink-0 bg-slate-800 px-4 pb-5 pt-10 text-center text-white">
              <span
                className={`inline-block rounded-md border px-4 py-2 text-sm ${
                  goal.deadline
                    ? 'border-slate-400 text-white'
                    : 'border-slate-600 text-slate-400'
                }`}
              >
                {goal.deadline
                  ? `Target on ${formatTargetDate(goal.deadline)}`
                  : noTargetLabel}
              </span>

              {completed ? (
                <p className="mt-2 text-sm font-medium text-green-400">
                  🎉 {t.goalCard.completedMsg}
                </p>
              ) : goal.deadline ? (
                <p
                  className={`mt-2 text-sm ${
                    daysRemaining !== null && daysRemaining < 0
                      ? 'text-red-400'
                      : 'text-amber-400'
                  }`}
                >
                  {formatCountdown(daysRemaining)}
                </p>
              ) : (
                <p className="mt-2 text-sm text-slate-400">{setTargetHint}</p>
              )}

              <div className="mt-4 grid grid-cols-3 text-sm">
                {PACE_ITEMS.map((item) => (
                  <div key={item.key}>
                    <p className="text-slate-400">{item.label}</p>
                    <p className="text-base">
                      {paceValues
                        ? formatCurrency(paceValues[item.key], goal.currency)
                        : '—'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            {/* ===== Records ===== */}
            <div className="flex-1 overflow-y-auto bg-white px-4 py-4 dark:bg-slate-800">
              <RecordSortDropdown
                value={recordSort}
                onChange={setRecordSort}
              />

              {sortedTransactions.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <Inbox className="h-10 w-10 text-slate-300 dark:text-slate-600" />
                  <p className="mt-2 text-sm text-slate-400">
                    {t.history.empty}
                  </p>
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

            <div className="h-12 shrink-0 bg-slate-800" />
          </>
        )}
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

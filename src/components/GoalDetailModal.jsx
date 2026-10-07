import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Pencil, Plus } from 'lucide-react';
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
import { getDaysRemaining } from '../utils/date';
import CircularProgress from './CircularProgress';
import GoalFormModal from './GoalFormModal';
import DepositWithdrawModal from './DepositWithdrawModal';
import TransactionHistoryModal from './TransactionHistoryModal';
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

  const [showEdit, setShowEdit] = useState(false);
  const [showTransact, setShowTransact] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const goal = goals.find((g) => g.id === goalId);

  if (!goal) return null;

  const progress = getGoalProgress(goal);
  const completed = isGoalCompleted(goal);
  const remaining = getRemainingAmount(goal);
  const daysRemaining = getDaysRemaining(goal.deadline);
  const pace = getSavingPace(goal);

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
        className="relative flex h-full w-full flex-col overflow-y-auto bg-slate-100 dark:bg-slate-900 sm:h-auto sm:max-h-[90vh] sm:w-full sm:max-w-md sm:rounded-2xl"
      >
        {/* Header navy */}
        <div className="sticky top-0 z-10 bg-slate-800 px-4 pb-4 pt-3 text-amber-400 sm:rounded-t-2xl">
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

          <div className="mt-3 flex justify-center gap-8 text-sm">
            <span className="border-b-2 border-amber-400 pb-2 font-medium tracking-wide text-amber-400">
              GOAL
            </span>
            <button
              type="button"
              onClick={() => setShowHistory(true)}
              className="border-b-2 border-transparent pb-2 font-medium tracking-wide text-slate-400"
            >
              RECORDS
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 px-4 pb-8 pt-8">
          <div className="flex justify-center">
            <CircularProgress progress={progress} />
          </div>

          <p className="mt-4 text-center text-xs font-medium uppercase tracking-widest text-slate-400">
            Saved
          </p>
          <p className="text-center text-3xl font-semibold text-slate-800 dark:text-slate-100">
            {formatCurrency(goal.currentAmount, goal.currency)}
          </p>

          <div className="mt-6 flex items-start justify-between px-2">
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

          <div className="mt-6 flex justify-center">
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

        {/* Bottom bar */}
        <div className="bg-slate-800 px-4 pb-6 pt-5 text-center text-white sm:rounded-b-2xl">
          {goal.deadline && (
            <>
              <span className="inline-block rounded-full border border-slate-500 px-4 py-1.5 text-xs">
                Target on {formatTargetDate(goal.deadline)}
              </span>
              <p className="mt-2 text-sm font-medium text-amber-400">
                {formatCountdown(daysRemaining)}
              </p>
            </>
          )}

          {pace && (
            <div className="mt-5 flex justify-around text-sm">
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

      {showHistory && (
        <TransactionHistoryModal
          goal={goal}
          onClose={() => setShowHistory(false)}
        />
      )}
    </motion.div>
  );
}

export default GoalDetailModal;

import { useState } from 'react';
import { ArrowLeft, Pencil, Plus } from 'lucide-react';
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
import CircularProgress from '../components/CircularProgress';
import GoalFormModal from '../components/GoalFormModal';
import DepositWithdrawModal from '../components/DepositWithdrawModal';
import TransactionHistoryModal from '../components/TransactionHistoryModal';
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

function GoalDetailPage({ goalId, onBack }) {
  const { goals, editGoal, depositToGoal, withdrawFromGoal } = useGoals();
  const { t } = useLanguage();
  const { showToast } = useToast();

  const [tab, setTab] = useState('goal');
  const [showEdit, setShowEdit] = useState(false);
  const [showTransact, setShowTransact] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const goal = goals.find((g) => g.id === goalId);

  if (!goal) {
    return (
      <div className="py-10 text-center">
        <p className="text-slate-500 dark:text-slate-400">
          {t.goalsPage.emptyTitle}
        </p>
        <button
          type="button"
          onClick={onBack}
          className="mt-3 text-sm font-medium text-indigo-600 hover:underline"
        >
          {t.nav.goals}
        </button>
      </div>
    );
  }

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
    <div className="-mx-3 -my-4 sm:-mx-4 sm:-my-6">
      <div className="bg-slate-800 px-4 pb-4 pt-3 text-amber-400">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            aria-label="Back"
            className="rounded-lg p-1 hover:bg-slate-700/50"
          >
            <ArrowLeft className="h-5 w-5" />
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
            onClick={() => setShowHistory(true)}
            className="border-b-2 border-transparent pb-2 font-medium tracking-wide text-slate-400"
          >
            RECORDS
          </button>
        </div>
      </div>

      <div className="bg-slate-100 px-4 pb-8 pt-8 dark:bg-slate-900">
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

      <div className="bg-slate-800 px-4 pb-6 pt-5 text-center text-white">
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
    </div>
  );
}

export default GoalDetailPage;

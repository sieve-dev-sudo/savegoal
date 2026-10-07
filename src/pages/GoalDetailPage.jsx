import { useState } from 'react';
import { ArrowLeft, Pencil, Wallet, History } from 'lucide-react';
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
import { formatDeadlineLabel } from '../utils/date';
import CircularProgress from '../components/CircularProgress';
import GoalFormModal from '../components/GoalFormModal';
import DepositWithdrawModal from '../components/DepositWithdrawModal';
import TransactionHistoryModal from '../components/TransactionHistoryModal';
import { fireGoalCompletedConfetti } from '../utils/confetti';

function GoalDetailPage({ goalId, onBack }) {
  const { goals, editGoal, depositToGoal, withdrawFromGoal } = useGoals();
  const { t } = useLanguage();
  const { showToast } = useToast();

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
  const deadlineLabel = formatDeadlineLabel(goal.deadline);
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
    <section>
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          aria-label="Back"
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h2 className="truncate text-base font-semibold text-slate-900 dark:text-slate-100">
          {goal.name}
        </h2>
        <button
          type="button"
          onClick={() => setShowEdit(true)}
          aria-label="Edit"
          className="rounded-lg p-2 text-indigo-600 hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-indigo-900/30"
        >
          <Pencil className="h-5 w-5" />
        </button>
      </div>

      {/* Circular progress card */}
      <div className="mt-6 flex flex-col items-center rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
        <CircularProgress progress={progress} completed={completed} />

        <p className="mt-4 text-xs font-medium uppercase tracking-wide text-slate-400 dark:text-slate-500">
          {t.goalCard.completed === 'Completed' ? 'SAVED' : 'បានសន្សំ'}
        </p>
        <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          {formatCurrency(goal.currentAmount, goal.currency)}
        </p>

        <div className="mt-5 flex w-full items-start justify-between border-t border-slate-100 pt-4 dark:border-slate-700">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500">
              {t.goalCard.completed === 'Completed' ? 'Remaining' : 'នៅសល់'}
            </p>
            <p className="font-semibold text-slate-900 dark:text-slate-100">
              {formatCurrency(remaining, goal.currency)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500">
              {t.goalForm.targetAmount}
            </p>
            <p className="font-semibold text-slate-900 dark:text-slate-100">
              {formatCurrency(goal.targetAmount, goal.currency)}
            </p>
          </div>
        </div>

        <div className="mt-5 flex w-full gap-2">
          <button
            type="button"
            onClick={() => setShowTransact(true)}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700"
          >
            <Wallet className="h-4 w-4" />
            {t.transaction.deposit}
          </button>
          <button
            type="button"
            onClick={() => setShowHistory(true)}
            className="flex items-center justify-center gap-1.5 rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            <History className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Deadline + pace */}
      {goal.deadline && (
        <div className="mt-4 rounded-xl bg-slate-900 p-4 text-center text-white dark:bg-slate-800">
          <span className="inline-block rounded-full border border-slate-600 px-3 py-1 text-xs">
            {t.goalForm.deadline.replace(' (ជម្រើស)', '')}: {goal.deadline}
          </span>
          {deadlineLabel && (
            <p className="mt-2 text-sm font-medium text-amber-400">
              {deadlineLabel}
            </p>
          )}

          {pace && (
            <div className="mt-4 grid grid-cols-3 divide-x divide-slate-700 border-t border-slate-700 pt-3">
              <div>
                <p className="text-xs text-slate-400">Daily</p>
                <p className="text-sm font-semibold">
                  {formatCurrency(pace.perDay, goal.currency)}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Weekly</p>
                <p className="text-sm font-semibold">
                  {formatCurrency(pace.perWeek, goal.currency)}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Monthly</p>
                <p className="text-sm font-semibold">
                  {formatCurrency(pace.perMonth, goal.currency)}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

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
    </section>
  );
}

export default GoalDetailPage;

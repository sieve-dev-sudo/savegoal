import { useState, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Plus, PiggyBank, SearchX } from 'lucide-react';
import { useGoals } from '../context/GoalContext';
import { useToast } from '../context/ToastContext';
import { useLanguage } from '../context/LanguageContext';
import GoalFormModal from '../components/GoalFormModal';
import ConfirmDialog from '../components/ConfirmDialog';
import GoalFilterTabs from '../components/GoalFilterTabs';
import GoalCard from '../components/GoalCard';
import DepositWithdrawModal from '../components/DepositWithdrawModal';
import TransactionHistoryModal from '../components/TransactionHistoryModal';
import SearchBar from '../components/SearchBar';
import SortDropdown from '../components/SortDropdown';
import EmptyState from '../components/EmptyState';
import { filterGoals, isGoalCompleted } from '../utils/goalStatus';
import { searchGoals, sortGoals } from '../utils/sortGoals';
import { fireGoalCompletedConfetti } from '../utils/confetti';

function GoalsPage() {
  const {
    goals,
    addGoal,
    editGoal,
    deleteGoal,
    depositToGoal,
    withdrawFromGoal,
  } = useGoals();
  const { showToast } = useToast();
  const { t } = useLanguage();

  const [showForm, setShowForm] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);
  const [deletingGoal, setDeletingGoal] = useState(null);
  const [transactingGoal, setTransactingGoal] = useState(null);
  const [historyGoalId, setHistoryGoalId] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const counts = useMemo(
    () => ({
      all: goals.length,
      'in-progress': goals.filter((g) => !isGoalCompleted(g)).length,
      completed: goals.filter((g) => isGoalCompleted(g)).length,
    }),
    [goals]
  );

  const visibleGoals = useMemo(() => {
    const filtered = filterGoals(goals, activeFilter);
    const searched = searchGoals(filtered, searchQuery);
    return sortGoals(searched, sortBy);
  }, [goals, activeFilter, searchQuery, sortBy]);

  const historyGoal = goals.find((g) => g.id === historyGoalId) || null;

  const handleOpenAdd = () => {
    setEditingGoal(null);
    setShowForm(true);
  };

  const handleOpenEdit = (goal) => {
    setEditingGoal(goal);
    setShowForm(true);
  };

  const handleSave = (formData) => {
    if (editingGoal) {
      editGoal(editingGoal.id, formData);
      showToast(t.toast.goalUpdated, 'success');
    } else {
      addGoal(formData);
      showToast(t.toast.goalCreated, 'success');
    }
    setShowForm(false);
    setEditingGoal(null);
  };

  const handleConfirmDelete = () => {
    deleteGoal(deletingGoal.id);
    showToast(t.toast.goalDeleted, 'success');
    setDeletingGoal(null);
  };

  const handleDeposit = (amount, note) => {
    const wasCompletedBefore = isGoalCompleted(transactingGoal);
    depositToGoal(transactingGoal.id, amount, note);
    showToast(
      t.toast.deposited(`${amount} ${transactingGoal.currency}`),
      'success'
    );

    const willBeCompleted =
      transactingGoal.currentAmount + amount >= transactingGoal.targetAmount;
    if (!wasCompletedBefore && willBeCompleted) {
      setTimeout(() => fireGoalCompletedConfetti(), 200);
    }

    setTransactingGoal(null);
  };

  const handleWithdraw = (amount, note) => {
    withdrawFromGoal(transactingGoal.id, amount, note);
    showToast(
      t.toast.withdrawn(`${amount} ${transactingGoal.currency}`),
      'success'
    );
    setTransactingGoal(null);
  };

  return (
    <section>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          {t.goalsPage.title}
        </h2>
        <button
          type="button"
          onClick={handleOpenAdd}
          className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        >
          <Plus className="h-4 w-4" />
          <span className="hidden xs:inline">{t.goalsPage.addGoal}</span>
          <span className="xs:hidden">{t.goalsPage.addGoalShort}</span>
        </button>
      </div>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <div className="flex-1">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder={t.goalsPage.searchPlaceholder}
          />
        </div>
        <div className="sm:w-56">
          <SortDropdown value={sortBy} onChange={setSortBy} />
        </div>
      </div>

      <div className="mt-3">
        <GoalFilterTabs
          activeFilter={activeFilter}
          onChange={setActiveFilter}
          counts={counts}
        />
      </div>

      {visibleGoals.length === 0 ? (
        <div className="mt-4">
          {goals.length === 0 ? (
            <EmptyState
              icon={PiggyBank}
              title={t.goalsPage.emptyTitle}
              description={t.goalsPage.emptyDescription}
              action={
                <button
                  type="button"
                  onClick={handleOpenAdd}
                  className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                >
                  <Plus className="h-4 w-4" />
                  {t.goalsPage.addFirstGoal}
                </button>
              }
            />
          ) : (
            <EmptyState
              icon={SearchX}
              title={
                searchQuery
                  ? t.goalsPage.noSearchResults(searchQuery)
                  : t.goalsPage.emptyFilterTitle
              }
              description={t.goalsPage.emptyFilterDescription}
            />
          )}
        </div>
      ) : (
        <ul className="mt-4 space-y-2">
          <AnimatePresence initial={false}>
            {visibleGoals.map((goal) => (
              <GoalCard
                key={goal.id}
                goal={goal}
                onEdit={handleOpenEdit}
                onDelete={setDeletingGoal}
                onTransact={setTransactingGoal}
                onViewHistory={(g) => setHistoryGoalId(g.id)}
              />
            ))}
          </AnimatePresence>
        </ul>
      )}

      <AnimatePresence>
        {showForm && (
          <GoalFormModal
            initialData={editingGoal}
            onSave={handleSave}
            onClose={() => {
              setShowForm(false);
              setEditingGoal(null);
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {deletingGoal && (
          <ConfirmDialog
            title={t.confirm.deleteTitle}
            message={t.confirm.deleteMessage(deletingGoal.name)}
            onConfirm={handleConfirmDelete}
            onCancel={() => setDeletingGoal(null)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {transactingGoal && (
          <DepositWithdrawModal
            goal={transactingGoal}
            onDeposit={handleDeposit}
            onWithdraw={handleWithdraw}
            onClose={() => setTransactingGoal(null)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {historyGoal && (
          <TransactionHistoryModal
            goal={historyGoal}
            onClose={() => setHistoryGoalId(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

export default GoalsPage;

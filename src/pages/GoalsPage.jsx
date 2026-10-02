import { useState, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useGoals } from '../context/GoalContext';
import { useToast } from '../context/ToastContext';
import GoalFormModal from '../components/GoalFormModal';
import ConfirmDialog from '../components/ConfirmDialog';
import GoalFilterTabs from '../components/GoalFilterTabs';
import GoalCard from '../components/GoalCard';
import DepositWithdrawModal from '../components/DepositWithdrawModal';
import TransactionHistoryModal from '../components/TransactionHistoryModal';
import SearchBar from '../components/SearchBar';
import SortDropdown from '../components/SortDropdown';
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
      showToast('បានកែ Goal ជោគជ័យ', 'success');
    } else {
      addGoal(formData);
      showToast('បានបង្កើត Goal ជោគជ័យ', 'success');
    }
    setShowForm(false);
    setEditingGoal(null);
  };

  const handleConfirmDelete = () => {
    deleteGoal(deletingGoal.id);
    showToast('បានលុប Goal', 'success');
    setDeletingGoal(null);
  };

  const handleDeposit = (amount, note) => {
    const wasCompletedBefore = isGoalCompleted(transactingGoal);
    depositToGoal(transactingGoal.id, amount, note);
    showToast(
      `បានបញ្ចូលប្រាក់ ${amount} ${transactingGoal.currency}`,
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
    showToast(`បានដកប្រាក់ ${amount} ${transactingGoal.currency}`, 'success');
    setTransactingGoal(null);
  };

  return (
    <section>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          Goals
        </h2>
        <button
          type="button"
          onClick={handleOpenAdd}
          className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        >
          <Plus className="h-4 w-4" />
          <span className="hidden xs:inline">បង្កើត Goal</span>
          <span className="xs:hidden">បង្កើត</span>
        </button>
      </div>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <div className="flex-1">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="ស្វែងរក Goal តាមឈ្មោះ..."
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
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 text-slate-600 dark:text-slate-300"
        >
          {goals.length === 0
            ? 'មិនទាន់មាន Goal ទេ។ ចុច "បង្កើត Goal" ដើម្បីចាប់ផ្តើម។'
            : searchQuery
              ? `គ្មាន Goal ដែលត្រូវនឹង "${searchQuery}" ទេ។`
              : 'គ្មាន Goal ដែលត្រូវនឹងជម្រើសនេះទេ។'}
        </motion.p>
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
            title="លុប Goal នេះ?"
            message={`តើអ្នកប្រាកដថាចង់លុប "${deletingGoal.name}" មែនទេ? សកម្មភាពនេះមិនអាចត្រឡប់វិញបានទេ។`}
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

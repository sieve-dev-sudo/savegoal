import { useState, useMemo } from 'react';
import { Plus } from 'lucide-react';
import { useGoals } from '../context/GoalContext';
import GoalFormModal from '../components/GoalFormModal';
import ConfirmDialog from '../components/ConfirmDialog';
import GoalFilterTabs from '../components/GoalFilterTabs';
import GoalCard from '../components/GoalCard';
import { filterGoals, isGoalCompleted } from '../utils/goalStatus';

function GoalsPage() {
  const { goals, addGoal, editGoal, deleteGoal } = useGoals();
  const [showForm, setShowForm] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);
  const [deletingGoal, setDeletingGoal] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');

  const counts = useMemo(
    () => ({
      all: goals.length,
      'in-progress': goals.filter((g) => !isGoalCompleted(g)).length,
      completed: goals.filter((g) => isGoalCompleted(g)).length,
    }),
    [goals]
  );

  const visibleGoals = useMemo(
    () => filterGoals(goals, activeFilter),
    [goals, activeFilter]
  );

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
    } else {
      addGoal(formData);
    }
    setShowForm(false);
    setEditingGoal(null);
  };

  const handleConfirmDelete = () => {
    deleteGoal(deletingGoal.id);
    setDeletingGoal(null);
  };

  return (
    <section>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          Goals
        </h2>
        <button
          type="button"
          onClick={handleOpenAdd}
          className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        >
          <Plus className="h-4 w-4" />
          បង្កើត Goal
        </button>
      </div>

      <div className="mt-4">
        <GoalFilterTabs
          activeFilter={activeFilter}
          onChange={setActiveFilter}
          counts={counts}
        />
      </div>

      {visibleGoals.length === 0 ? (
        <p className="mt-4 text-slate-600 dark:text-slate-300">
          {goals.length === 0
            ? 'មិនទាន់មាន Goal ទេ។ ចុច "បង្កើត Goal" ដើម្បីចាប់ផ្តើម។'
            : 'គ្មាន Goal ដែលត្រូវនឹងជម្រើសនេះទេ។'}
        </p>
      ) : (
        <ul className="mt-4 space-y-2">
          {visibleGoals.map((goal) => (
            <GoalCard
              key={goal.id}
              goal={goal}
              onEdit={handleOpenEdit}
              onDelete={setDeletingGoal}
            />
          ))}
        </ul>
      )}

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

      {deletingGoal && (
        <ConfirmDialog
          title="លុប Goal នេះ?"
          message={`តើអ្នកប្រាកដថាចង់លុប "${deletingGoal.name}" មែនទេ? សកម្មភាពនេះមិនអាចត្រឡប់វិញបានទេ។`}
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeletingGoal(null)}
        />
      )}
    </section>
  );
}

export default GoalsPage;

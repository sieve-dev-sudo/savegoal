import { useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { useGoals } from '../context/GoalContext';
import GoalFormModal from '../components/GoalFormModal';
import ConfirmDialog from '../components/ConfirmDialog';

function GoalsPage() {
  const { goals, addGoal, editGoal, deleteGoal } = useGoals();
  const [showForm, setShowForm] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);
  const [deletingGoal, setDeletingGoal] = useState(null);

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

      {goals.length === 0 ? (
        <p className="mt-4 text-slate-600 dark:text-slate-300">
          មិនទាន់មាន Goal ទេ។ ចុច "បង្កើត Goal" ដើម្បីចាប់ផ្តើម។
        </p>
      ) : (
        <ul className="mt-4 space-y-2">
          {goals.map((goal) => (
            <li
              key={goal.id}
              className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-800"
            >
              <div>
                <p className="font-medium text-slate-900 dark:text-slate-100">
                  {goal.name}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {goal.currentAmount} / {goal.targetAmount} {goal.currency}
                  {goal.deadline && ` · Deadline: ${goal.deadline}`}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleOpenEdit(goal)}
                  aria-label={`Edit ${goal.name}`}
                  className="rounded-lg p-2 text-indigo-600 hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-indigo-900/30"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setDeletingGoal(goal)}
                  aria-label={`Delete ${goal.name}`}
                  className="rounded-lg p-2 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/30"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </li>
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

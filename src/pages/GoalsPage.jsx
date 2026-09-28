import { useGoals } from '../context/GoalContext';

function GoalsPage() {
  const { goals, addGoal, deleteGoal, depositToGoal } = useGoals();

  const handleAddTestGoal = () => {
    addGoal({
      name: 'New Phone',
      targetAmount: 500,
      category: 'shopping',
      currency: 'USD',
    });
  };

  return (
    <section>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Goals</h2>
        <button
          type="button"
          onClick={handleAddTestGoal}
          className="rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        >
          + Add Test Goal
        </button>
      </div>

      {goals.length === 0 ? (
        <p className="mt-4 text-slate-600 dark:text-slate-300">
          មិនទាន់មាន Goal ទេ។ ចុចប៊ូតុងខាងលើដើម្បីសាកល្បង។
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
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => depositToGoal(goal.id, 50)}
                  className="rounded-lg bg-green-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
                >
                  +50
                </button>
                <button
                  type="button"
                  onClick={() => deleteGoal(goal.id)}
                  className="rounded-lg bg-red-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default GoalsPage;

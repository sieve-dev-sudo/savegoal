import { useState, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Plus, PiggyBank, SearchX } from 'lucide-react';
import { useGoals } from '../context/GoalContext';
import { useToast } from '../context/ToastContext';
import { useLanguage } from '../context/LanguageContext';
import GoalFormModal from '../components/GoalFormModal';
import GoalCard from '../components/GoalCard';
import GoalDetailModal from '../components/GoalDetailModal';
import SearchBar from '../components/SearchBar';
import SortDropdown from '../components/SortDropdown';
import EmptyState from '../components/EmptyState';
import AddFab from '../components/AddFab';
import { searchGoals, sortGoals } from '../utils/sortGoals';

function GoalsPage() {
  const { goals, addGoal } = useGoals();
  const { showToast } = useToast();
  const { t } = useLanguage();

  const [showForm, setShowForm] = useState(false);
  const [openGoalId, setOpenGoalId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const visibleGoals = useMemo(() => {
    const searched = searchGoals(goals, searchQuery);
    return sortGoals(searched, sortBy);
  }, [goals, searchQuery, sortBy]);

  const handleSave = (formData) => {
    addGoal(formData);
    showToast(t.toast.goalCreated, 'success');
    setShowForm(false);
  };

  return (
    <section>
      {goals.length > 0 && (
        <div className="flex flex-col gap-2 sm:flex-row">
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
      )}

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
                  onClick={() => setShowForm(true)}
                  className="flex items-center gap-1.5 rounded-lg bg-cyan-800 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-900"
                >
                  <Plus className="h-4 w-4" />
                  {t.goalsPage.addFirstGoal}
                </button>
              }
            />
          ) : (
            <EmptyState
              icon={SearchX}
              title={t.goalsPage.noSearchResults(searchQuery)}
              description={t.goalsPage.emptyFilterDescription}
            />
          )}
        </div>
      ) : (
        <ul className="mt-4 space-y-3">
          <AnimatePresence initial={false}>
            {visibleGoals.map((goal) => (
              <GoalCard
                key={goal.id}
                goal={goal}
                onOpen={(g) => setOpenGoalId(g.id)}
              />
            ))}
          </AnimatePresence>
        </ul>
      )}

      <AddFab
        onClick={() => setShowForm(true)}
        label={t.goalsPage.addGoal}
      />

      <AnimatePresence>
        {showForm && (
          <GoalFormModal
            onSave={handleSave}
            onClose={() => setShowForm(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {openGoalId && (
          <GoalDetailModal
            goalId={openGoalId}
            onClose={() => setOpenGoalId(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

export default GoalsPage;

import { useMemo } from 'react';
import {
  Target,
  CheckCircle2,
  TrendingUp,
  AlertTriangle,
  PiggyBank,
} from 'lucide-react';
import { useGoals } from '../context/GoalContext';
import {
  getSummaryStats,
  getProgressChartData,
  getCategoryChartData,
} from '../utils/dashboardStats';
import { formatCurrency } from '../utils/currency';
import StatCard from '../components/StatCard';
import GoalProgressChart from '../components/GoalProgressChart';
import CategoryPieChart from '../components/CategoryPieChart';
import EmptyState from '../components/EmptyState';

function DashboardPage() {
  const { goals } = useGoals();

  const stats = useMemo(() => getSummaryStats(goals), [goals]);
  const progressChartData = useMemo(() => getProgressChartData(goals), [goals]);
  const categoryChartData = useMemo(() => getCategoryChartData(goals), [goals]);

  if (goals.length === 0) {
    return (
      <section>
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          Dashboard
        </h2>
        <div className="mt-4">
          <EmptyState
            icon={PiggyBank}
            title="មិនទាន់មាន Goal ទេ"
            description='បង្កើត Goal ដំបូងនៅ tab "Goals" ដើម្បីមើលស្ថិតិ'
          />
        </div>
      </section>
    );
  }

  return (
    <section>
      <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
        Dashboard
      </h2>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard
          icon={Target}
          label="Goal សរុប"
          value={stats.totalGoals}
          colorClass="bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400"
        />
        <StatCard
          icon={CheckCircle2}
          label="សម្រេចហើយ"
          value={stats.completedGoals}
          colorClass="bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400"
        />
        <StatCard
          icon={TrendingUp}
          label="ជិតសម្រេច (≥70%)"
          value={stats.nearingCompletion.length}
          colorClass="bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400"
        />
        <StatCard
          icon={AlertTriangle}
          label="ហួសកាលកំណត់"
          value={stats.overdueGoals.length}
          colorClass="bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400"
        />
      </div>

      <div className="mt-4 rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
        <h3 className="mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">
          ចំនួនសន្សំសរុប
        </h3>
        <div className="flex flex-wrap gap-4">
          {Object.entries(stats.totalsByCurrency).map(([currency, totals]) => (
            <div key={currency}>
              <p className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                {formatCurrency(totals.current, currency)}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                ពី {formatCurrency(totals.target, currency)} គោលដៅ
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
        <h3 className="mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">
          ភាគរយរបស់ Goal នីមួយៗ
        </h3>
        <GoalProgressChart data={progressChartData} />
      </div>

      <div className="mt-4 rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
        <h3 className="mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">
          ចំនួន Goal តាមប្រភេទ
        </h3>
        <CategoryPieChart data={categoryChartData} />
      </div>

      {stats.nearingCompletion.length > 0 && (
        <div className="mt-4 rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
          <h3 className="mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">
            ជិតសម្រេចហើយ
          </h3>
          <ul className="space-y-1.5">
            {stats.nearingCompletion.map((goal) => (
              <li
                key={goal.id}
                className="flex items-center justify-between text-sm"
              >
                <span className="text-slate-700 dark:text-slate-300">
                  {goal.name}
                </span>
                <span className="font-medium text-amber-600 dark:text-amber-400">
                  {Math.round((goal.currentAmount / goal.targetAmount) * 100)}%
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {stats.overdueGoals.length > 0 && (
        <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900/50 dark:bg-red-900/20">
          <h3 className="mb-2 text-sm font-medium text-red-700 dark:text-red-300">
            ហួសកាលកំណត់
          </h3>
          <ul className="space-y-1.5">
            {stats.overdueGoals.map((goal) => (
              <li
                key={goal.id}
                className="flex items-center justify-between text-sm"
              >
                <span className="text-slate-700 dark:text-slate-300">
                  {goal.name}
                </span>
                <span className="font-medium text-red-600 dark:text-red-400">
                  Deadline: {goal.deadline}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

export default DashboardPage;

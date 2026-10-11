import { useMemo } from 'react';
import {
  Target,
  CheckCircle2,
  TrendingUp,
  AlertTriangle,
  PiggyBank,
} from 'lucide-react';
import { useGoals } from '../context/GoalContext';
import { useLanguage } from '../context/LanguageContext';
import {
  getSummaryStats,
  getOverallTotals,
  getGoalRanking,
  getCategoryChartData,
  getMonthlyActivity,
  getRecentTransactions,
} from '../utils/dashboardStats';
import { getGoalProgress } from '../utils/goalStatus';
import OverallProgressCard from '../components/OverallProgressCard';
import StatCard from '../components/StatCard';
import SectionCard from '../components/SectionCard';
import GoalRankingList from '../components/GoalRankingList';
import MonthlyActivityChart from '../components/MonthlyActivityChart';
import CategoryPieChart from '../components/CategoryPieChart';
import RecentActivityList from '../components/RecentActivityList';
import EmptyState from '../components/EmptyState';

function DashboardPage() {
  const { goals } = useGoals();
  const { t, isEnglish } = useLanguage();

  const stats = useMemo(() => getSummaryStats(goals), [goals]);
  const totals = useMemo(() => getOverallTotals(goals), [goals]);
  const ranking = useMemo(() => getGoalRanking(goals), [goals]);
  const categoryData = useMemo(
    () => getCategoryChartData(goals, isEnglish),
    [goals, isEnglish]
  );
  const monthly = useMemo(() => {
    const locale = isEnglish ? 'en-US' : 'km-KH';
    return getMonthlyActivity(goals, 6).map((month) => ({
      ...month,
      label: month.date.toLocaleDateString(locale, { month: 'short' }),
    }));
  }, [goals, isEnglish]);
  const recent = useMemo(() => getRecentTransactions(goals, 5), [goals]);

  if (goals.length === 0) {
    return (
      <EmptyState
        icon={PiggyBank}
        title={t.goalsPage.emptyTitle}
        description={t.dashboard.empty}
      />
    );
  }

  return (
    <div className="space-y-4">
      <OverallProgressCard totals={totals} />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard
          icon={Target}
          label={t.dashboard.totalGoals}
          value={stats.totalGoals}
          colorClass="bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400"
        />
        <StatCard
          icon={CheckCircle2}
          label={t.dashboard.completed}
          value={stats.completedGoals}
          colorClass="bg-lime-100 text-lime-700 dark:bg-lime-900/30 dark:text-lime-400"
        />
        <StatCard
          icon={TrendingUp}
          label={t.dashboard.nearingCompletion}
          value={stats.nearingCompletion.length}
          colorClass="bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400"
        />
        <StatCard
          icon={AlertTriangle}
          label={t.dashboard.overdue}
          value={stats.overdueGoals.length}
          colorClass="bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400"
        />
      </div>

      {stats.overdueGoals.length > 0 && (
        <SectionCard tone="danger" title={t.dashboard.overdueList}>
          <ul className="space-y-2">
            {stats.overdueGoals.map((goal) => (
              <li
                key={goal.id}
                className="flex items-center justify-between text-sm"
              >
                <span className="truncate pr-3 text-slate-700 dark:text-slate-200">
                  {goal.name}
                </span>
                <span className="shrink-0 font-medium text-red-600 dark:text-red-400">
                  {t.dashboard.deadline}: {goal.deadline}
                </span>
              </li>
            ))}
          </ul>
        </SectionCard>
      )}

      {stats.nearingCompletion.length > 0 && (
        <SectionCard title={t.dashboard.nearingList}>
          <ul className="space-y-2">
            {stats.nearingCompletion.map((goal) => (
              <li
                key={goal.id}
                className="flex items-center justify-between text-sm"
              >
                <span className="truncate pr-3 text-slate-700 dark:text-slate-200">
                  {goal.name}
                </span>
                <span className="shrink-0 font-medium text-amber-600 dark:text-amber-400">
                  {getGoalProgress(goal)}%
                </span>
              </li>
            ))}
          </ul>
        </SectionCard>
      )}

      <SectionCard
        title={t.dashboard.goalRanking}
        hint={t.dashboard.goalRankingHint}
      >
        <GoalRankingList ranking={ranking} />
      </SectionCard>

      <SectionCard
        title={t.dashboard.monthlyActivity}
        hint={t.dashboard.monthlyHint}
      >
        <MonthlyActivityChart data={monthly} />
      </SectionCard>

      <SectionCard title={t.dashboard.categoryChart}>
        <CategoryPieChart data={categoryData} total={stats.totalGoals} />
      </SectionCard>

      <SectionCard title={t.dashboard.recentActivity}>
        <RecentActivityList items={recent} />
      </SectionCard>
    </div>
  );
}

export default DashboardPage;

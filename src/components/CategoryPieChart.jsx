import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { CHART_HEX_COLORS } from '../constants/chartColors';
import { useLanguage } from '../context/LanguageContext';

function CategoryPieChart({ data, total }) {
  const { t } = useLanguage();

  if (data.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-slate-500 dark:text-slate-400">
        {t.dashboard.noData}
      </p>
    );
  }

  return (
    <div className="flex flex-col items-center gap-5 sm:flex-row">
      <div className="relative h-44 w-44 shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={52}
              outerRadius={80}
              paddingAngle={2}
              stroke="none"
            >
              {data.map((entry) => (
                <Cell
                  key={entry.id}
                  fill={CHART_HEX_COLORS[entry.color] || '#64748b'}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>

        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-semibold text-slate-800 dark:text-slate-100">
            {total}
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {t.dashboard.goalsUnit}
          </span>
        </div>
      </div>

      <ul className="w-full space-y-2.5">
        {data.map((entry) => (
          <li
            key={entry.id}
            className="flex items-center justify-between gap-3 text-sm"
          >
            <span className="flex min-w-0 items-center gap-2">
              <span
                className="h-3 w-3 shrink-0 rounded-full"
                style={{
                  backgroundColor: CHART_HEX_COLORS[entry.color] || '#64748b',
                }}
              />
              <span className="truncate text-slate-700 dark:text-slate-200">
                {entry.name}
              </span>
            </span>
            <span className="shrink-0 text-slate-500 dark:text-slate-400">
              {entry.value} · {entry.percent}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryPieChart;

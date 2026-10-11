import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  ReferenceLine,
} from 'recharts';
import { formatCurrency } from '../utils/currency';
import { useLanguage } from '../context/LanguageContext';

function ChartTooltip({ active, payload }) {
  if (!active || !payload || !payload.length) return null;
  const item = payload[0].payload;

  return (
    <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs shadow-lg dark:border-slate-600 dark:bg-slate-800">
      <p className="font-medium text-slate-900 dark:text-slate-100">
        {item.label}
      </p>
      <p className="text-slate-500 dark:text-slate-400">
        {formatCurrency(item.net, 'USD')}
      </p>
    </div>
  );
}

function MonthlyActivityChart({ data }) {
  const { t } = useLanguage();
  const hasActivity = data.some((item) => item.net !== 0);

  if (!hasActivity) {
    return (
      <p className="py-8 text-center text-sm text-slate-500 dark:text-slate-400">
        {t.dashboard.noActivity}
      </p>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="#94a3b8"
          strokeOpacity={0.25}
          vertical={false}
        />
        <XAxis
          dataKey="label"
          tick={{ fontSize: 12, fill: '#94a3b8' }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 11, fill: '#94a3b8' }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip
          content={<ChartTooltip />}
          cursor={{ fill: '#94a3b8', fillOpacity: 0.12 }}
        />
        <ReferenceLine y={0} stroke="#94a3b8" strokeOpacity={0.5} />
        <Bar dataKey="net" radius={[4, 4, 0, 0]}>
          {data.map((entry) => (
            <Cell
              key={entry.key}
              fill={entry.net >= 0 ? '#84cc16' : '#ef4444'}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export default MonthlyActivityChart;

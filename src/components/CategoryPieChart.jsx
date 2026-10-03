import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { CHART_HEX_COLORS } from '../constants/chartColors';

function CategoryPieChart({ data }) {
  if (data.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-slate-500 dark:text-slate-400">
        មិនទាន់មានទិន្នន័យសម្រាប់បង្ហាញទេ
      </p>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={240}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={50}
          outerRadius={80}
          paddingAngle={2}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={CHART_HEX_COLORS[entry.color] || '#64748b'}
            />
          ))}
        </Pie>
        <Tooltip />
        <Legend
          wrapperStyle={{ fontSize: '12px' }}
          formatter={(value) => (
            <span className="text-slate-600 dark:text-slate-300">{value}</span>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default CategoryPieChart;

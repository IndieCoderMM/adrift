import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

type Props = {
  data: TimeEntry[];
};

const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff8042",
  "#ffbb28",
  "#d0ed57",
  "#a4de6c",
  "#8dd1e1",
];

const EmotionDistributionChart = ({ data }: Props) => {
  const counts: Record<string, number> = {};
  data.forEach((entry) => {
    counts[entry.emotion] = (counts[entry.emotion] || 0) + 1;
  });

  const chartData = Object.entries(counts).map(([emotion, value]) => ({
    name: emotion,
    value,
  }));

  return (
    <div className="bg-white p-4 capitalize">
      <h2 className="text-fg/80 mb-2 text-xl font-medium">Emotions Logged</h2>
      <ResponsiveContainer width="100%" height={500}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            outerRadius={150}
            innerRadius={80}
            paddingAngle={2}
            label={({ name, percent }) =>
              `${name} (${(percent ?? 0 * 100).toFixed(0)}%)`
            }
          >
            {chartData.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number, name: string) => [value, `${name}`]}
          />
          <Legend align="right" layout="vertical" verticalAlign="middle" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EmotionDistributionChart;

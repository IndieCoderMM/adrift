import { formatDate } from "@/utils/day";
import { useMemo } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Props = {
  entries: TimeEntry[];
};

const ClarityTrendChart = ({ entries }: Props) => {
  const data = useMemo(() => {
    if (!entries || entries.length === 0) return [];
    const data = entries
      .filter((entry) => entry.feedback && entry.createdAt)
      .map((entry) => ({
        date: formatDate(
          new Date(entry.createdAt ?? 0).toISOString(),
          "YYYY-MM-DD HH:mm",
        ),
        clarity: entry.feedback?.clarity ?? 0,
      }));

    // Sort by date to ensure chronological order
    data.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );

    return data;
  }, [entries]);

  return (
    <div className="p-4">
      <h2 className="text-fg/80 mb-2 text-xl font-medium">
        Reflection Score Over Time
      </h2>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
          <XAxis
            dataKey="date"
            tickFormatter={(d) => formatDate(d, "YYYY-MM-DD")}
          />
          <YAxis domain={[0, 5]} ticks={[1, 2, 3, 4, 5]} />
          <Tooltip formatter={(value: number) => [value, "Score"]} />
          <ReferenceLine
            y={3}
            stroke="#888"
            strokeDasharray="4 4"
            label="Baseline"
          />
          <Line
            type="monotone"
            dataKey="clarity"
            stroke="#6366f1"
            strokeWidth={2}
            dot={{ r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ClarityTrendChart;

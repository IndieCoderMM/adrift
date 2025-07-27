import { useEntriesByDay } from "@/hooks/use-entries-byday";
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
  const { groups, dates } = useEntriesByDay({ entries });

  const data = useMemo(() => {
    if (!groups || Object.keys(groups).length === 0) return [];
    dates.reverse();

    const data = dates.map((date) => {
      const group = groups[date] || [];
      const clarityScores = group.map((entry) => entry.feedback?.clarity || 0);
      const avgClarity =
        clarityScores.length > 0
          ? clarityScores.reduce((a: number, b: number) => a + b, 0) /
            clarityScores.length
          : 0;

      return {
        date: formatDate(date, "YYYY-MM-DD"),
        clarity: avgClarity,
      };
    });

    return data;
  }, [groups, dates]);

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
          <YAxis domain={[1, 5]} ticks={[1, 2, 3, 4, 5]} />
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

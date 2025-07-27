import { formatDate } from "@/utils/day";
import { useMemo } from "react";
import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Props = {
  data: TimeEntry[];
};

export function EmotionFrequencyOverTimeChart({ data }: Props) {
  const { allEmotions, chartData } = useMemo(() => {
    if (!data || data.length === 0) {
      return { allEmotions: [], chartData: [] };
    }

    data.sort((a, b) => {
      return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
    });

    const grouped: Record<string, Record<string, number>> = {};

    data.forEach((entry) => {
      const date = formatDate(entry.timestamp, "YYYY-MM-DD");
      if (!grouped[date]) grouped[date] = {};
      grouped[date][entry.emotion] = (grouped[date][entry.emotion] || 0) + 1;
    });

    const allEmotions = Array.from(new Set(data.map((e) => e.emotion)));

    const chartData = Object.entries(grouped).map(([date, emotionCounts]) => {
      const entry: Record<string, any> = { date };
      allEmotions.forEach((emotion) => {
        entry[emotion] = emotionCounts[emotion] || 0;
      });
      return entry;
    });
    return { allEmotions, chartData };
  }, [data]);

  return (
    <div className="p-4 capitalize">
      <h2 className="mb-2 text-xl font-semibold">Mood Timeline</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          {allEmotions.map((emotion) => (
            <Line
              key={emotion}
              type="monotone"
              dataKey={emotion}
              stroke={`hsl(${(emotion.length * 45) % 360}, 70%, 50%)`}
              strokeWidth={2}
              dot={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

import { formatDate } from "@/utils/day";
import { useMemo } from "react";

export const useEntriesByDay = ({ entries }: { entries: TimeEntry[] }) => {
  const groups = useMemo(() => {
    const groupedEntries = groupByDay(entries);
    return Object.entries(groupedEntries).reduce(
      (acc, [date, entries]) => {
        acc[date] = entries.sort(
          (a, b) =>
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
        );
        return acc;
      },
      {} as Record<string, TimeEntry[]>,
    );
  }, [entries]);

  return {
    groups,
    dates: Object.keys(groups).sort(
      (a, b) => new Date(b).getTime() - new Date(a).getTime(),
    ),
  };
};

function groupByDay(entries: TimeEntry[]) {
  const map: Record<string, TimeEntry[]> = {};
  for (const e of entries) {
    const day = formatDate(e.timestamp, "YYYY-MM-DD");
    if (!map[day]) map[day] = [];
    map[day].push(e);
  }
  return map;
}

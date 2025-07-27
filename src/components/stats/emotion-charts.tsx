"use client";
import { useEntryList } from "@/hooks/use-entry-list";
import ClarityTrendChart from "./clarity-trend";
import EmotionDistributionChart from "./emotion-distribution";
import { EmotionFrequencyOverTimeChart } from "./emotion-frequency";

const EmotionCharts = () => {
  const { entries, isLoading } = useEntryList();

  if (isLoading) {
    return <span>Processing entries...</span>;
  }

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="border-border rounded border p-2">
        <EmotionFrequencyOverTimeChart data={entries} />
      </div>
      <div className="border-border rounded border p-2">
        <EmotionDistributionChart data={entries} />
      </div>
      <div className="border-border rounded border p-2">
        <ClarityTrendChart entries={entries} />
      </div>
    </div>
  );
};

export default EmotionCharts;

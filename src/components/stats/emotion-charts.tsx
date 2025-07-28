"use client";
import { useEntryList } from "@/hooks/use-entry-list";
import Scanning from "../anims/scanning";
import EmptyEntry from "../empty-entry";
import ClarityTrendChart from "./clarity-trend";
import EmotionDistributionChart from "./emotion-distribution";
import { EmotionFrequencyOverTimeChart } from "./emotion-frequency";

const EmotionCharts = () => {
  const { entries, isLoading } = useEntryList();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center">
        <div className="mx-auto flex h-[300px] w-[300px]">
          <Scanning />
        </div>
        <p className="text-center text-lg text-gray-500">
          Scanning journal entries...
        </p>
      </div>
    );
  }

  if (entries.length === 0) {
    return <EmptyEntry />;
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

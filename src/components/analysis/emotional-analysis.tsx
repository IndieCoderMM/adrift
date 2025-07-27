"use client";

import { useEmotionalAnalysis } from "@/hooks/use-emotional-analysis";
import { cn } from "@/utils/tailwind";
import InsightDisplay from "./insight-display";

const EmotionalAnalysis = () => {
  const { insight, analyzing, isLoading, handleAnalysis } =
    useEmotionalAnalysis();
  return (
    <div>
      {!insight ? (
        <section className="px-6 py-12">
          <div className="mx-auto max-w-3xl space-y-6">
            <p className="text-lg tracking-tight text-gray-600">
              Our AI analyzes your recent journal entries to surface emotional
              trends, identify patterns, and suggest meaningful steps forward.
            </p>
            <button
              onClick={handleAnalysis}
              disabled={isLoading || analyzing}
              className={cn(
                `bg-fg disabled:bg-secondary text-bg mt-4 ml-auto cursor-pointer rounded-full px-4 py-2 capitalize hover:brightness-125`,
                isLoading || analyzing
                  ? "cursor-not-allowed"
                  : "hover:brightness-125",
              )}
            >
              {analyzing ? "Analyzing..." : "Get AI Insight"}
            </button>
          </div>
        </section>
      ) : (
        <InsightDisplay insight={insight} />
      )}
    </div>
  );
};

export default EmotionalAnalysis;

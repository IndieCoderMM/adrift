import { getInsightPrompot, zipRecentEntries } from "@/lib/ai";
import { usePuterStore } from "@/lib/puter";
import { useState } from "react";
import { useEntryList } from "./use-entry-list";

export const useEmotionalAnalysis = () => {
  const { entries, isLoading } = useEntryList();
  const [insight, setInsight] = useState<AIEmotionInsight | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const ai = usePuterStore((s) => s.ai);

  const handleAnalysis = async () => {
    try {
      const zippedData = zipRecentEntries(entries, 10);
      const prompt = zippedData.length > 0 ? getInsightPrompot(zippedData) : "";
      setAnalyzing(true);
      const feedback = await ai.feedback(prompt);
      if (!feedback) throw new Error("Failed to get analysis");
      const feedbackText =
        typeof feedback.message.content === "string"
          ? feedback.message.content
          : feedback.message.content[0].text;

      const generated = JSON.parse(feedbackText) as AIEmotionInsight;

      setInsight(generated);
    } catch (err) {
      console.log("Failed to generate reflection: ", err);
    } finally {
      setAnalyzing(false);
    }
  };

  return {
    insight,
    analyzing,
    handleAnalysis,
    isLoading,
  };
};

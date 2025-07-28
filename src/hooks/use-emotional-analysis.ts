import { getInsightPrompot, zipRecentEntries } from "@/lib/ai";
import { usePuterStore } from "@/lib/puter";
import { useAppStore } from "@/lib/store";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { useEntryList } from "./use-entry-list";

export const useEmotionalAnalysis = () => {
  const { entries, isLoading } = useEntryList();
  const [insight, setInsight] = useState<AIEmotionInsight | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const auth = usePuterStore((s) => s.auth);
  const ai = usePuterStore((s) => s.ai);
  const setOpenLogin = useAppStore((s) => s.setOpenLogin);

  const handleAnalysis = useCallback(async () => {
    try {
      setAnalyzing(true);
      const zippedData = zipRecentEntries(entries, 10);
      const prompt = zippedData.length > 0 ? getInsightPrompot(zippedData) : "";
      const feedback = await ai.feedback(prompt);
      if (!feedback) throw new Error("Failed to get analysis");
      const feedbackText =
        typeof feedback.message.content === "string"
          ? feedback.message.content
          : feedback.message.content[0].text;

      const generated = JSON.parse(feedbackText) as AIEmotionInsight;

      setInsight(generated);
    } catch (error) {
      console.error("Error during emotional analysis:", error);
      toast.error("Failed to analyze your entries. Please try again.");
    } finally {
      setAnalyzing(false);
    }
  }, [auth, entries]);

  const toastedAnalysis = useCallback(() => {
    if (!auth.isAuthenticated) {
      setOpenLogin(true);
      return;
    }

    if (!entries || entries.length === 0) {
      toast.info("No entries found to analyze.");
      return;
    }

    toast.promise(handleAnalysis, {
      pending: "Analyzing your entries...",
    });
  }, [auth.isAuthenticated, entries, handleAnalysis]);

  return {
    insight,
    analyzing,
    handleAnalysis: toastedAnalysis,
    isLoading,
  };
};

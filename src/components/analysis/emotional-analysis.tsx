"use client";

import { useEmotionalAnalysis } from "@/hooks/use-emotional-analysis";
import { usePuterStore } from "@/lib/puter";
import { useAppStore } from "@/lib/store";
import { cn } from "@/utils/tailwind";
import { IconLogin2, IconSparkles } from "@tabler/icons-react";
import Image from "next/image";
import InsightDisplay from "./insight-display";

const EmotionalAnalysis = () => {
  const auth = usePuterStore((s) => s.auth);
  const setOpenLogin = useAppStore((s) => s.setOpenLogin);
  const { insight, analyzing, isLoading, handleAnalysis } =
    useEmotionalAnalysis();

  return (
    <div>
      {!insight ? (
        <>
          <section className="flex max-w-3xl flex-col items-end gap-4 md:flex-row">
            <div className="">
              <Image src="/ai.svg" alt="AI analysis" width={300} height={300} />
            </div>
            <div className="flex flex-1 flex-col space-y-6">
              <p className="text-xl tracking-tight text-gray-600">
                Our AI analyzes your recent journal entries to surface emotional
                trends, identify patterns, and suggest meaningful steps forward.
              </p>
              <div>
                {auth.isAuthenticated ? (
                  <button
                    onClick={handleAnalysis}
                    disabled={isLoading || analyzing}
                    className={cn(
                      `btn min-w-[200px] font-semibold`,
                      isLoading || analyzing
                        ? "cursor-not-allowed"
                        : "hover:brightness-125",
                    )}
                  >
                    <IconSparkles className="size-8" />
                    {analyzing ? "Analyzing..." : "Get AI Insight"}
                  </button>
                ) : (
                  <button
                    onClick={() => setOpenLogin(true)}
                    className="btn min-w-[200px] font-semibold"
                  >
                    <IconLogin2 className="mr-1 size-8" />
                    Log in
                  </button>
                )}
              </div>
            </div>
          </section>
        </>
      ) : (
        <InsightDisplay insight={insight} />
      )}
    </div>
  );
};

export default EmotionalAnalysis;

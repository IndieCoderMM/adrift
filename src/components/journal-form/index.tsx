"use client";

import { usePuterStore } from "@/lib/puter";
import { cn } from "@/utils/tailwind";
import { useEffect } from "react";
import EmotionPicker from "./emotion-picker";
import { useJournalForm } from "./use-journal-form";

const JournalForm = () => {
  const isLoading = usePuterStore((s) => s.isLoading);
  const {
    reflection,
    status,
    generating,
    step,
    skipped,
    handleDateChange,
    handleGenerateReflection,
    handleEmotion,
    handleChangeStep,
    handleSubmit,
  } = useJournalForm();

  useEffect(() => {
    if (isLoading) return;

    // Auto generate first prompt
    handleGenerateReflection(true);
  }, [isLoading, handleGenerateReflection]);

  return (
    <div className="h-full">
      <div className="mb-2 flex items-center gap-4">
        <h2 className="text-2xl tracking-tight capitalize">
          {reflection.question}
        </h2>
      </div>
      <form
        onSubmit={handleSubmit}
        className="relative flex h-full flex-col gap-2 overflow-y-auto"
      >
        <div className={cn("flex flex-col py-1")}>
          <input
            type="datetime-local"
            className="border-fg rounded border border-b-2 px-2 py-1 text-2xl"
            name="timestamp"
            onChange={handleDateChange}
            required
          />
          <button
            key={"skip-btn"}
            type="button"
            className="text-secondary cursor-pointer self-end p-1 text-sm italic underline disabled:cursor-not-allowed"
            onClick={() => handleGenerateReflection()}
            disabled={generating || skipped}
            title={
              generating
                ? "Please wait..."
                : skipped
                  ? "Please log an entry for this prompt."
                  : "You can skip once before next entry."
            }
          >
            {generating ? "Generating..." : "Skip"}
          </button>
        </div>

        <div
          className={cn(
            "flex flex-col py-1",
            step !== 1 ? "h-0 w-0 overflow-hidden" : "w-auto",
          )}
        >
          <span>How did you feel at this time?</span>
          <EmotionPicker onChange={handleEmotion} size={300} />
        </div>

        {/*//TODO: Make this modal */}
        <div
          className={cn(
            "flex flex-col py-1",
            step !== 2 ? "h-0 w-0 overflow-hidden" : "w-auto",
          )}
        >
          <textarea
            name="note"
            rows={5}
            className="bg-muted/10 w-full resize-none rounded p-2 text-xl focus:outline-none"
            placeholder={reflection.note_prompt}
            required
          ></textarea>
        </div>
        <div className="flex items-center gap-2">
          {step === 2 ? (
            <button
              type="button"
              key="back-btn"
              className="text-fg/80 hover:text-fg cursor-pointer px-4 py-2 underline"
              onClick={() => handleChangeStep(-1)}
            >
              Back
            </button>
          ) : null}
          {step === 1 ? (
            <button
              type="button"
              key="next-btn"
              className="bg-fg text-bg ml-auto cursor-pointer rounded-full px-4 py-2 hover:brightness-125"
              onClick={() => handleChangeStep(1)}
            >
              Next
            </button>
          ) : step === 2 ? (
            <button
              type="submit"
              key="submit-btn"
              className={cn(
                "bg-fg disabled:bg-secondary text-bg ml-auto cursor-pointer rounded-full px-4 py-2 capitalize hover:brightness-125",
                status === "error" && "bg-red-500",
              )}
              disabled={status !== "idle"}
            >
              {status !== "idle" ? status : "Save"}
            </button>
          ) : null}
        </div>
      </form>
    </div>
  );
};

export default JournalForm;

"use client";

import { usePuterStore } from "@/lib/puter";
import { getEmotionVisual } from "@/utils/emotions";
import { cn } from "@/utils/tailwind";
import { motion } from "motion/react";
import { useEffect, useRef } from "react";
import EmotionPicker from "./emotion-picker";
import { useJournalForm } from "./use-journal-form";

const slideIn = {
  initial: { y: 100, opacity: 0 },
  animate: { y: 0, opacity: 1 },
};

const JournalForm = () => {
  const ref = useRef<HTMLInputElement | null>(null);
  const isLoading = usePuterStore((s) => s.isLoading);
  const auth = usePuterStore((s) => s.auth);
  const {
    reflection,
    status,
    generating,
    step,
    skipped,
    emotion,
    handleDateChange,
    handleGenerateReflection,
    handleEmotion,
    handleChangeStep,
    handleSubmit,
  } = useJournalForm();

  useEffect(() => {
    if (ref.current) {
      // Reset empty date
      ref.current.value = "";
    }
  }, [reflection]);

  // TODO: Uncomment this on production
  // useEffect(() => {
  //   if (isLoading || !auth.isAuthenticated) return;
  //
  //   // Auto generate first prompt
  //   handleGenerateReflection(true);
  // }, [isLoading, auth.isAuthenticated, handleGenerateReflection]);

  const emotionVisual = getEmotionVisual(emotion);

  return (
    <div className="h-full">
      <div className="mb-2 flex items-center gap-4">
        <h2 className="text-2xl tracking-tight capitalize">
          {reflection.question}
        </h2>
      </div>
      <form
        onSubmit={handleSubmit}
        className="relative flex h-full flex-col gap-2 overflow-hidden"
      >
        <div className={cn("flex flex-col py-1")}>
          <input
            ref={ref}
            type="datetime-local"
            className="border-fg rounded border border-b-2 px-2 py-1 text-2xl disabled:cursor-not-allowed"
            name="timestamp"
            onChange={handleDateChange}
            disabled={generating}
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

        <div className="relative min-h-[50vh] w-full">
          <motion.div
            variants={slideIn}
            initial={false}
            animate={step === 1 ? "animate" : "initial"}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            className={cn(
              "absolute top-0 left-0 flex w-full flex-col py-1",
              step !== 1 && "pointer-events-none opacity-0",
            )}
          >
            <span>How did you feel at this time?</span>
            <div className="grid md:grid-cols-5">
              <div className="col-span-3 flex items-center">
                <EmotionPicker onChange={handleEmotion} size={300} />
              </div>
              <div className="col-span-2 flex flex-col items-center justify-center">
                <div className="flex items-center justify-center">
                  <span className="text-7xl">{emotionVisual.emoji}</span>
                </div>
                <span
                  className="mt-2 text-xl font-semibold capitalize"
                  style={{
                    color: emotionVisual.color,
                  }}
                >
                  {emotion.length ? emotion : "Neutral"}
                </span>
              </div>
            </div>
          </motion.div>

          {/*//TODO: Make this modal */}
          <motion.div
            variants={slideIn}
            initial={false}
            animate={step === 2 ? "animate" : "initial"}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            className={cn(
              "absolute top-0 left-0 w-full py-1",
              step !== 2 && "pointer-events-none opacity-0",
            )}
          >
            <textarea
              name="note"
              rows={5}
              className="border-fg bg-bg w-full resize-none rounded border p-2 text-xl focus:outline-none"
              placeholder={reflection.note_prompt}
              required
            ></textarea>
          </motion.div>
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

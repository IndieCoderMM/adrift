"use client";

import { generateReflectionPrompt, getAiPrompt } from "@/lib/ai";
import { usePuterStore } from "@/lib/puter";
import { useAppStore } from "@/lib/store";
import { generateID, getEntryKey, getQuestionKey } from "@/utils/storage";
import { FormEventHandler, useState } from "react";

const emotions = ["very sad", "sad", "neutral", "happy", "very happy"];

type Status = "idle" | "uploading" | "processing" | "error" | "success";

const PromptForm = () => {
  const [reflection, setReflection] = useState<Reflection>({
    id: "test",
    question: "When did I last talk with a family member?",
    action: "phoned a family",
    note_prompt: "Any memorable thing about this moment?",
    type: "family",
  });
  const kv = usePuterStore((s) => s.kv);
  const ai = usePuterStore((s) => s.ai);
  const auth = usePuterStore((s) => s.auth);
  const setOpenLogin = useAppStore((s) => s.setOpenLogin);
  const [status, setStatus] = useState<Status>("idle");
  const [generating, setGenerating] = useState(false);

  const handleGenerateReflection = async () => {
    if (!auth || !auth.isAuthenticated) {
      setOpenLogin(true);
      return;
    }
    try {
      setGenerating(true);
      // BUG: Why this feedback is cached?
      const feedback = await ai.feedback(generateReflectionPrompt("family"));
      if (!feedback) throw new Error("Failed to generate question");
      const feedbackText =
        typeof feedback.message.content === "string"
          ? feedback.message.content
          : feedback.message.content[0].text;

      const reflection = JSON.parse(feedbackText) as Reflection;
      const id = generateID();
      setReflection({ ...reflection, id });
    } catch (err) {
      console.log("Failed to generate reflection: ", err);
    } finally {
      setGenerating(false);
    }
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!auth || !auth.isAuthenticated) {
      setOpenLogin(true);
      return;
    }

    const form = e.currentTarget.closest("form");
    if (!form) {
      console.log("Form not found");
      return;
    }

    const formData = new FormData(form);
    const timestamp = formData.get("timestamp") as string;
    const emotion = formData.get("emotion") as string;
    const note = formData.get("note") as string;

    const id = generateID();

    const data: Partial<TimeEntry> = {
      id,
      timestamp,
      note,
      reflection_id: reflection.id,
      label: reflection.question,
      action: reflection.action,
      emotion: emotions[Math.max(Number(emotion), emotions.length - 1)],
    };

    try {
      setStatus("uploading");
      await kv.set(getQuestionKey(reflection.id), JSON.stringify(reflection));
      await kv.set(getEntryKey(id), JSON.stringify(data));

      setStatus("processing");
      const feedback = await ai.feedback(getAiPrompt({ entry: data }));
      if (!feedback) return setStatus("error");
      const feedbackText =
        typeof feedback.message.content === "string"
          ? feedback.message.content
          : feedback.message.content[0].text;

      data.feedback = JSON.parse(feedbackText);
      //data.tags = Array.isArray(data.feedback?.tags) ? data.feedback.tags : [];
      await kv.set(getEntryKey(id), JSON.stringify(data));
      setStatus("success");
      form.reset();
    } catch (err) {
      console.error(err);
      setStatus("error");
    } finally {
      setTimeout(() => {
        setStatus("idle");
      }, 5000);
    }
  };

  return (
    <div>
      <div className="mb-2 flex items-center gap-4">
        <h2 className="text-2xl capitalize">{reflection.question}</h2>
        <button
          type="button"
          className="text-secondary cursor-pointer text-sm italic underline"
          onClick={handleGenerateReflection}
          disabled={generating}
        >
          {generating ? "Generating..." : "Skip"}
        </button>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col py-1">
          <input type="date" className="text-2xl" name="timestamp" required />
        </div>
        <div className="flex flex-col py-1">
          <label htmlFor="emotion">How did you feel at this time?</label>
          <input
            type="range"
            name="emotion"
            id="emotion"
            min={0}
            max={5}
            className="accent-fg"
          />
        </div>
        <div className="flex flex-col py-1">
          <textarea
            name="note"
            rows={5}
            className="border-muted resize-y rounded border p-2 text-xl focus:outline-none"
            placeholder={reflection.note_prompt}
            required
          ></textarea>
        </div>

        <div className="mt-8 flex w-full items-center justify-between">
          {status !== "idle" ? (
            <span className="text-sm capitalize italic">{status}</span>
          ) : null}
          <button
            type="submit"
            className="bg-fg text-bg ml-auto cursor-pointer rounded-full px-4 py-2 hover:brightness-125"
            disabled={status !== "idle"}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default PromptForm;

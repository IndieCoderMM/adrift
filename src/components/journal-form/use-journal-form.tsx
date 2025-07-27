import { generateReflectionPrompt, getAiPrompt } from "@/lib/ai";
import { usePuterStore } from "@/lib/puter";
import { useAppStore } from "@/lib/store";
import { generateID, getEntryKey, getQuestionKey } from "@/utils/storage";
import { useRouter } from "next/navigation";
import { FormEventHandler, useCallback, useState } from "react";

type FormStatus = "idle" | "uploading" | "processing" | "error" | "success";

export const useJournalForm = () => {
  const [reflection, setReflection] = useState<Reflection>({
    id: "loading",
    question: "Let's me create a new prompt for you",
    action: "loading",
    note_prompt: "loading",
    type: "loading",
  });
  const kv = usePuterStore((s) => s.kv);
  const ai = usePuterStore((s) => s.ai);
  const auth = usePuterStore((s) => s.auth);
  const isLoading = usePuterStore((s) => s.isLoading);
  const setOpenLogin = useAppStore((s) => s.setOpenLogin);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [generating, setGenerating] = useState(false);
  const [emotion, setEmotion] = useState("");
  const [step, setStep] = useState(0);
  const [skipped, setSkipped] = useState(false);
  const router = useRouter();

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;
    const value = input.value;
    if (!value) return;

    const date = new Date(value);
    if (isNaN(date.getTime())) {
      console.error("Invalid date format");
      return;
    }

    if (step <= 0) {
      setStep(1); // Move to the next step after date selection
    }
  };

  const handleGenerateReflection = useCallback(
    async (auto = false) => {
      if (isLoading) {
        console.log("Waiting for auth to be ready");
        return;
      }

      if (!auth.isAuthenticated) {
        setOpenLogin(true);
        return;
      }

      if (skipped) {
        console.log("Reflection generation skipped");
        return;
      }

      if (!auto) {
        // Limit user skipping a question to once
        setSkipped(true);
      }

      try {
        setGenerating(true);
        const items = (await kv.list(getQuestionKey("*"), true)) as KVItem[];
        const entries = items?.map(
          (entry) => JSON.parse(entry.value) as Reflection,
        );

        const answeredQuestions = entries?.map((e) => e.question) || [];
        const types = ["family", "work", "friends", "self"];

        const randType = types[Math.floor(Math.random() * types.length)];

        // BUG: Why this feedback is cached?
        const feedback = await ai.feedback(
          generateReflectionPrompt(randType, [
            ...answeredQuestions,
            reflection.type !== "loading" ? reflection.question : "",
          ]),
        );
        if (!feedback) throw new Error("Failed to generate question");
        const feedbackText =
          typeof feedback.message.content === "string"
            ? feedback.message.content
            : feedback.message.content[0].text;

        const generated = JSON.parse(feedbackText) as Reflection;
        const id = generateID();
        setReflection({ ...generated, id });
        setStep(0);
        setEmotion(""); // Reset emotion on new reflection
        setStatus("idle");
      } catch (err) {
        console.log("Failed to generate reflection: ", err);
      } finally {
        setGenerating(false);
      }
    },
    [isLoading, auth.isAuthenticated, setOpenLogin, skipped],
  );

  const handleEmotion = useCallback((emotion: string) => {
    setEmotion(emotion);
  }, []);

  const handleChangeStep = (change: number) => {
    setStep((prev) => {
      const newStep = prev + change;
      if (newStep < 0 || newStep > 2) return prev; // Prevent going out of bounds
      return newStep;
    });
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
    const note = formData.get("note") as string;

    const id = generateID();

    const data: Partial<TimeEntry> = {
      id,
      timestamp,
      note,
      reflection_id: reflection.id,
      label: reflection.question,
      action: reflection.action,
      emotion,
      createdAt: Date.now(),
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
      form.reset();
      setStatus("success");
      setStep(0);
      router.push(`/entries/${id}`);
    } catch (err) {
      console.error(err);
      setStatus("error");
    } finally {
      setTimeout(() => {
        setStatus("idle");
      }, 5000);
    }
  };

  return {
    reflection,
    status,
    generating,
    emotion,
    step,
    skipped,
    handleDateChange,
    handleGenerateReflection,
    handleEmotion,
    handleChangeStep,
    handleSubmit,
  };
};

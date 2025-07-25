"use client";

import { usePuterStore } from "@/lib/puter";
import { generateID, getEntryKey } from "@/utils/storage";
import { FormEventHandler } from "react";

const PromptForm = () => {
  const prompt = "When did I last phone a friend?";
  const kv = usePuterStore((s) => s.kv);
  const ai = usePuterStore((s) => s.ai);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
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

    const data = {
      id,
      label: prompt,
      timestamp,
      emotion,
      note,
    };

    try {
      await kv.set(getEntryKey(id), JSON.stringify(data));

      //const feedback = await ai.feedback();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="mb-2 flex items-center gap-4">
        <h2 className="text-2xl capitalize">{prompt}</h2>
        <button
          type="button"
          className="text-secondary cursor-pointer text-sm italic underline"
        >
          Skip
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
            placeholder="Write one memorable about this time..."
            required
          ></textarea>
        </div>

        <div className="mt-8 flex w-full justify-end">
          <button
            type="submit"
            className="bg-fg text-bg cursor-pointer rounded-full px-4 py-2 hover:brightness-125"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default PromptForm;

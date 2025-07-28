"use client";
import { usePuterStore } from "@/lib/puter";
import { getEmotionVisual } from "@/utils/emotions";
import { getEntryKey } from "@/utils/storage";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import {
  IconFileTextSpark,
  IconStar,
  IconStarFilled,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PersonalNoteEditor from "./note-editor";

const EntryView = ({ id }: { id: string }) => {
  const kv = usePuterStore((s) => s.kv);
  const [loading, setLoading] = useState(true);
  const [entry, setEntry] = useState<TimeEntry | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadEntry = async () => {
      setLoading(true);
      try {
        const item = await kv.get(getEntryKey(id));
        if (!item) return;

        const data = JSON.parse(item);

        setEntry(data);
      } catch (err) {
        console.error("Failed to load entry:", err);
      } finally {
        setLoading(false);
      }
    };

    loadEntry();
  }, [id]);

  const handleDelete = async () => {
    if (!id) return;
    try {
      await kv.delete(getEntryKey(id));
      router.replace("/");
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[80vh] flex-col items-center justify-center">
        <div className="w-[400px]">
          <DotLottieReact src="/anims/searching.lottie" loop autoplay />
        </div>
        <span className="text-secondary text-xl">Loading entry...</span>
      </div>
    );
  }

  if (!entry)
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <span className="text-red-500">Entry not found</span>
      </div>
    );

  const emoteVisual = getEmotionVisual(entry.emotion);

  return (
    <div>
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 p-6 md:grid-cols-2">
        {/* Left Column: Entry Detail */}
        <div className="space-y-6">
          <div>
            <h1 className="text-xl font-semibold">
              Last Time I {entry.action}
            </h1>
            <p className="mt-1 text-2xl font-medium text-gray-500">
              {entry.timestamp}
            </p>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Emotion
            </label>
            <p
              style={{
                color: emoteVisual.color,
              }}
              className="text-base font-medium capitalize"
            >
              {emoteVisual.emoji} {entry.emotion}
            </p>
          </div>

          <PersonalNoteEditor entry={entry} />

          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => router.back()}
              className="cursor-pointer px-2 text-sm text-black hover:underline"
            >
              Back
            </button>
            <button
              onClick={handleDelete}
              className="cursor-pointer px-2 text-sm text-red-600 hover:underline"
            >
              Delete Entry
            </button>
          </div>
        </div>

        {/* Right Column: AI Review */}
        <div className="max-h-[500px] space-y-4 overflow-y-auto rounded-xl bg-gradient-to-b from-green-50 via-green-50/10 to-white p-5 shadow-sm">
          <div className="flex items-center gap-2">
            <IconFileTextSpark className="size-6 text-green-800" />
            <h2 className="text-lg font-semibold text-green-800">AI Review</h2>
          </div>
          {entry.feedback ? (
            <>
              <div>
                <h3 className="text-sm font-medium text-gray-600">Summary</h3>
                <p className="mt-1 text-sm text-gray-800">
                  {entry.feedback.summary}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-600">
                  Emotional Insight
                </h3>
                <p className="mt-1 text-sm text-gray-800">
                  {entry.feedback.emotional_insight}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-600">
                  Reflection Score
                </h3>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }, (_, i) =>
                    i < (entry.feedback?.clarity ?? 0) ? (
                      <IconStarFilled
                        key={i}
                        className={`size-5 text-yellow-400`}
                      />
                    ) : (
                      <IconStar key={i} className="text-muted/50 size-5" />
                    ),
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-600">
                  Follow-up Prompts
                </h3>
                <ul className="mt-1 ml-5 list-disc space-y-1 text-sm text-gray-800">
                  {entry.feedback.follow_ups.map((q, i) => (
                    <li key={i}>{q}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-600">
                  Growth Actions
                </h3>
                <ul className="mt-1 ml-5 list-disc space-y-1 text-sm text-gray-800">
                  {entry.feedback.growth_actions.map((a, i) => (
                    <li key={i}>{a}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-600">Tags</h3>
                <div className="mt-1 flex flex-wrap gap-2">
                  {entry.feedback.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-indigo-100 px-2 py-0.5 text-xs text-indigo-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-600">Category</h3>
                <div className="mt-1 flex flex-wrap gap-2">
                  {entry.feedback.category.map((cat) => (
                    <span
                      key={cat}
                      className="rounded-full bg-gray-200 px-2 py-0.5 text-xs text-gray-700"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <p className="text-gray-500">
              No AI review available for this entry.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EntryView;

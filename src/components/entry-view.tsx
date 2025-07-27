"use client";
import { usePuterStore } from "@/lib/puter";
import { getEntryKey } from "@/utils/storage";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
      <div className="flex h-[80vh] items-center justify-center">
        <span className="text-gray-500">Loading entry...</span>
      </div>
    );
  }

  if (!entry)
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <span className="text-red-500">Entry not found</span>
      </div>
    );

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
            <p className="text-base font-medium text-indigo-600 capitalize">
              {entry.emotion}
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="note"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Personal Note
              </label>
              <button className="cursor-pointer px-2 text-sm text-indigo-600 hover:underline">
                Edit
              </button>
            </div>
            <textarea
              id="note"
              className="min-h-[120px] w-full resize-none rounded-md border border-gray-300 p-3 text-sm shadow-sm focus:outline-none"
              defaultValue={entry.note}
              readOnly
            />
          </div>

          <div className="flex justify-between">
            <Link
              href={"/"}
              className="cursor-pointer px-2 text-sm text-black hover:underline"
            >
              Back
            </Link>
            <button
              onClick={handleDelete}
              className="cursor-pointer px-2 text-sm text-red-600 hover:underline"
            >
              Delete Entry
            </button>
          </div>
        </div>

        {/* Right Column: AI Review */}
        <div className="max-h-[500px] space-y-4 overflow-y-auto rounded-xl border border-gray-200 bg-gray-50 p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800">AI Review</h2>
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
                <h3 className="text-sm font-medium text-gray-600">Clarity</h3>
                <p className="mt-1 text-sm text-gray-800">
                  {entry.feedback.clarity}/5
                </p>
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
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default EntryView;

"use client";

import { useEntriesByDay } from "@/hooks/use-entries-byday";
import { useEntryList } from "@/hooks/use-entry-list";
import { formatDate } from "@/utils/day";
import { getEmotionVisual } from "@/utils/emotions";
import Link from "next/link";

const EntryList = () => {
  const { entries, isLoading } = useEntryList();
  const { groups } = useEntriesByDay({ entries });

  if (isLoading) {
    // Skeleton loading state
    return (
      <div className="space-y-4 p-4">
        {Array.from({ length: 2 }).map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="mb-2 h-6 w-[120px] rounded bg-gray-100" />
            <ul className="border-muted relative flex flex-col gap-2 border-l pl-4">
              {Array.from({ length: 2 }).map((_, idx) => (
                <li key={idx} className="flex items-center space-x-2">
                  <div className="h-24 w-full rounded bg-gray-100" />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4">
      {Object.entries(groups).map(([date, dayEntries]) => (
        <div key={date}>
          <h3 className="mb-2 text-lg font-semibold text-gray-700">
            {formatDate(date, "ddd MMMM D, YYYY")}
          </h3>
          <ul className="border-muted relative flex flex-col gap-2 border-l pl-4">
            {dayEntries.map((entry) => (
              <li key={entry.id} className="">
                <div className="border-muted bg-bg absolute left-0 h-2 w-2 -translate-x-1/2 translate-y-2 rounded-full border" />
                <Link
                  href={`/entries/${entry.id}`}
                  className="border-muted hover:border-fg flex cursor-pointer flex-col rounded border bg-white p-3"
                >
                  <p className="text-sm font-medium text-gray-800">
                    {entry.label}
                  </p>
                  {entry.note && (
                    <p className="mt-1 w-[90%] truncate text-sm text-gray-500">
                      {entry.note}
                    </p>
                  )}
                  <div className="mt-1 flex items-center gap-4">
                    <div className="text-muted text-xs capitalize">
                      {formatDate(entry.timestamp, "hh:mm a")}
                      {entry.emotion && (
                        <>
                          <span className="mx-1">•</span>
                          <span
                            className="font-medium capitalize"
                            style={{
                              color: getEmotionVisual(entry.emotion).color,
                            }}
                          >
                            {entry.emotion}
                          </span>
                        </>
                      )}
                    </div>
                    {entry.feedback?.tags && entry.feedback.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {entry.feedback.tags.map((tag) => (
                          <span key={tag} className="text-muted text-xs">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default EntryList;

"use client";
import { usePuterStore } from "@/lib/puter";
import { getEntryKey } from "@/utils/storage";
import { useEffect, useState } from "react";
import LogItem from "./log-item";

const TimeLogs = () => {
  const kv = usePuterStore((s) => s.kv);
  const [entries, setEntries] = useState<TimeEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      const items = (await kv.list(getEntryKey("*"), true)) as KVItem[];

      const entries = items?.map(
        (entry) => JSON.parse(entry.value) as TimeEntry,
      );

      if (entries?.length) {
        entries.sort(
          (a, b) =>
            new Date(b.createdAt ?? 0).getTime() -
            new Date(a.createdAt ?? 0).getTime(),
        );
        setEntries(entries);
      }
      setIsLoading(false);
    })();
  }, []);

  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between">
        <h2>Recent Entries</h2>
        <button
          type="button"
          className="text-secondary cursor-pointer text-sm italic underline"
        >
          View All
        </button>
      </div>
      {isLoading ? (
        <span>Loading entries...</span>
      ) : !entries || entries.length === 0 ? (
        <span>No entry yet.</span>
      ) : (
        <ul className="flex max-h-[80vh] flex-col gap-2 overflow-y-auto">
          {entries.map((log) => (
            <LogItem key={log.id} log={log} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TimeLogs;

import { usePuterStore } from "@/lib/puter";
import { getEntryKey } from "@/utils/storage";
import { useEffect, useState } from "react";

export const useEntryList = () => {
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
            new Date(b.timestamp ?? 0).getTime() -
            new Date(a.timestamp ?? 0).getTime(),
        );
        setEntries(entries);
      }
      setIsLoading(false);
    })();
  }, []);

  return { entries, isLoading };
};

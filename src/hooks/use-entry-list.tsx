import { usePuterStore } from "@/lib/puter";
import { getEntryKey } from "@/utils/storage";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const useEntryList = () => {
  const kv = usePuterStore((s) => s.kv);
  const auth = usePuterStore((s) => s.auth);
  const initializing = usePuterStore((s) => s.isLoading);
  const [entries, setEntries] = useState<TimeEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!auth.isAuthenticated || initializing) return;
    (async () => {
      setIsLoading(true);

      try {
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
      } catch (error) {
        console.error("Failed to load entries:", error);
        toast.error("Please try again later.");
      } finally {
        setIsLoading(false);
      }
    })();
  }, [auth.isAuthenticated, initializing]);

  return { entries, isLoading };
};

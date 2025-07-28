"use client";
import { useEntryList } from "@/hooks/use-entry-list";
import { usePuterStore } from "@/lib/puter";
import { motion } from "motion/react";
import Link from "next/link";
import LogItem from "./log-item";

const containerVariants = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      staggerDirection: -1,
    },
  },
};

const itemVariants = {
  initial: { y: -40, opacity: 0 },
  animate: { y: 0, opacity: 1 },
};

const TimeLogs = () => {
  const auth = usePuterStore((s) => s.auth);
  const { entries, isLoading } = useEntryList();

  if (!auth.isAuthenticated) {
    return null;
  }

  return (
    <div className="border-border w-full max-w-[300px] border-l p-2">
      <div className="mb-2 flex w-full items-center justify-between">
        <h2>Recent Activities</h2>
        <Link
          href={"/calendar"}
          className="text-secondary cursor-pointer text-sm italic underline"
        >
          View All
        </Link>
      </div>
      {isLoading ? (
        <div className="flex flex-col gap-4">
          {/* Skeleton loading state*/}
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="border-border relative flex w-full cursor-pointer flex-col items-center gap-1 rounded border border-b-2 px-1 py-2"
            >
              <div className="bg-fg/5 flex h-6 w-full items-center justify-center rounded" />
              <div className="h-4 w-5/6 rounded bg-gray-100" />
            </div>
          ))}
        </div>
      ) : !entries || entries.length === 0 ? (
        <span>No entry yet.</span>
      ) : (
        <motion.ul
          variants={containerVariants}
          initial="initial"
          animate="animate"
          className="flex max-h-[80vh] flex-col gap-4 overflow-y-auto"
        >
          {entries.slice(0, 20).map((log) => (
            <motion.li
              key={log.id}
              variants={itemVariants}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="w-full"
            >
              <LogItem key={log.id} log={log} />
            </motion.li>
          ))}
        </motion.ul>
      )}
    </div>
  );
};

export default TimeLogs;

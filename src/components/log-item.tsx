import { fromDate } from "@/utils/day";
import Link from "next/link";

type LogItemProps = {
  log: TimeEntry;
};

const LogItem = ({ log }: LogItemProps) => {
  return (
    <Link
      href={`/entries/${log.id}`}
      className="group border-border flex w-full cursor-pointer flex-col rounded border p-1"
    >
      <h3 className="text-fg text-sm">
        Last time I <span className="text-fg font-medium">{log.action}</span>{" "}
        was
      </h3>
      <p>{fromDate(log.timestamp)}</p>
      <span className="absolute right-0 bottom-0 hidden text-xs group-hover:block">
        View Detail
      </span>
    </Link>
  );
};

export default LogItem;

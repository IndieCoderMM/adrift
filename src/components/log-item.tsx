import { fromDate } from "@/utils/day";
import Link from "next/link";

type LogItemProps = {
  log: TimeEntry;
};

const LogItem = ({ log }: LogItemProps) => {
  return (
    <Link
      href={`/entries/${log.id}`}
      className="group border-border relative flex w-full cursor-pointer flex-col gap-1 rounded border border-b-2 px-1 py-2"
    >
      <span className="bg-fg/5 flex items-center justify-center">
        {fromDate(log.timestamp)}
      </span>

      <h3 className="text-fg text-center text-sm">
        I <span className="text-fg font-medium">{log.action}</span>
      </h3>
    </Link>
  );
};

export default LogItem;

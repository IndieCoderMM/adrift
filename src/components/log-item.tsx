import { fromDate } from "@/utils/day";

type LogItemProps = {
  log: TimeEntry;
};

const LogItem = ({ log }: LogItemProps) => {
  return (
    <div className="border-border flex w-full flex-col rounded border p-1">
      <h3 className="text-fg text-sm">
        Last time I <span className="text-fg font-medium">{log.action}</span>{" "}
        was
      </h3>
      <p>{fromDate(log.timestamp)}</p>
    </div>
  );
};

export default LogItem;

import LogItem from "./log-item";

const TimeLogs = ({ logs }: { logs: TimeEntry[] }) => {
  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between">
        <h2>Recent Entries</h2>
        <button
          type="button"
          className="text-secondary cursor-pointer text-sm italic underline"
        >
          Filter
        </button>
      </div>
      <ul className="flex flex-col gap-2">
        {logs.map((log) => (
          <LogItem key={log.id} log={log} />
        ))}
      </ul>
    </div>
  );
};

export default TimeLogs;

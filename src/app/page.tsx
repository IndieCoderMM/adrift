import JournalForm from "@/components/journal-form";
import TimeLogs from "@/components/time-logs";

export default function Home() {
  return (
    <main className="flex h-full">
      <div className="flex-1 p-4">
        <JournalForm />
      </div>
      <TimeLogs />
    </main>
  );
}

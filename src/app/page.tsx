import JournalForm from "@/components/journal-form";
import TimeLogs from "@/components/time-logs";

export default function Home() {
  return (
    <main className="grid h-full grid-cols-12">
      <div className="col-span-8 p-4">
        <JournalForm />
      </div>
      <div className="border-border col-span-4 border-l p-2">
        <TimeLogs />
      </div>
    </main>
  );
}

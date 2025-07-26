import PromptForm from "@/components/prompt-form";
import Sidebar from "@/components/sidebar";
import TimeLogs from "@/components/time-logs";

export default function Home() {
  return (
    <main className="grid h-full grid-cols-12">
      <div className="col-span-2 p-1">
        <Sidebar />
      </div>
      <div className="border-border col-span-7 border-x p-2">
        <PromptForm />
      </div>
      <div className="col-span-3 p-2">
        <TimeLogs />
      </div>
    </main>
  );
}

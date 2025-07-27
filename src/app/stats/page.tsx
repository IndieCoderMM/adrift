import Sidebar from "@/components/sidebar";
import { EmotionCharts } from "@/components/stats";

export default function Dashboard() {
  return (
    <main className="grid h-full grid-cols-12">
      <div className="col-span-2 p-1">
        <Sidebar />
      </div>
      <div className="border-border col-span-10 border-x p-2">
        <EmotionCharts />
      </div>
    </main>
  );
}

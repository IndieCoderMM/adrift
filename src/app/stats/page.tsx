"use client";

import LoginRequired from "@/components/login-required";
import { EmotionCharts } from "@/components/stats";
import { usePuterStore } from "@/lib/puter";

export default function Dashboard() {
  const auth = usePuterStore((s) => s.auth);

  if (!auth.isAuthenticated) {
    return (
      <LoginRequired
        text="Emotional statistics like mood trends and reflection scores will be
        available once you start journaling."
        cta="Start journaling now!"
        image="/report.svg"
      />
    );
  }

  return (
    <main className="px-4 pt-8 pb-20">
      <EmotionCharts />
    </main>
  );
}

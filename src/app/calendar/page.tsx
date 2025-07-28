"use client";
import EntryList from "@/components/calendar/entry-list";
import LoginRequired from "@/components/login-required";
import { usePuterStore } from "@/lib/puter";

const CalendarPage = () => {
  const auth = usePuterStore((s) => s.auth);

  if (!auth.isAuthenticated) {
    return (
      <LoginRequired
        text="Once you start journaling, you will be able to see your entries here."
        cta="Start journaling now!"
        image="/calendar.svg"
      />
    );
  }
  return (
    <main className="w-full">
      <EntryList />
    </main>
  );
};

export default CalendarPage;

"use client";

import { useAppStore } from "@/lib/store";
import { cn } from "@/utils/tailwind";
import {
  IconCalendarEvent,
  IconChartLine,
  IconMenu,
  IconNotebook,
  IconSparkles,
} from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Journal", icon: IconNotebook },
  { href: "/stats", label: "Statistics", icon: IconChartLine },
  { href: "/calendar", label: "Events", icon: IconCalendarEvent },
  { href: "/analysis", label: "AI Analysis", icon: IconSparkles },
];

const Sidebar = () => {
  const pathname = usePathname();
  const isOpen = useAppStore((s) => s.openSidebar);
  const setOpenSidebar = useAppStore((s) => s.setOpenSidebar);

  const toggleSidebar = () => {
    setOpenSidebar(!isOpen);
  };

  const isActive = (href: string) => {
    return pathname === href || (href === "/" && pathname === "/");
  };

  return (
    <div className="relative h-svh w-full">
      <div
        className={cn("border-border bg-bg flex h-svh flex-col border-r")}
        style={{ width: isOpen ? "16rem" : "4rem" }}
      >
        <button
          type="button"
          onClick={toggleSidebar}
          className={cn(
            "hover:text-accent flex h-12 w-12 cursor-pointer items-center justify-center p-2 transition",
          )}
        >
          <IconMenu className="size-8" />
        </button>
        <div className="mt-2 flex w-full flex-col gap-2 p-2">
          {navLinks.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`btn gap-2 ${isActive(href) ? "active" : ""}`}
            >
              <Icon className="size-8 shrink-0 stroke-1" />
              {isOpen && <p className="flex-1 text-left text-sm">{label}</p>}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

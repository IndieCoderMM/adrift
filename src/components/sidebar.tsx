"use client";

import {
  IconCalendarEvent,
  IconChartLine,
  IconHome2,
  IconSparkles,
} from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home", icon: IconHome2 },
  { href: "/stats", label: "Statistics", icon: IconChartLine },
  { href: "/calendar", label: "Journal Calendar", icon: IconCalendarEvent },
  { href: "/analysis", label: "Emotional Analysis", icon: IconSparkles },
];

const Sidebar = () => {
  const pathname = usePathname();

  const isActive = (href: string) => {
    return pathname === href || (href === "/" && pathname === "/");
  };

  return (
    <div className="relative h-svh w-full">
      <div className="fixe border-border inset-y-0 left-0 flex h-svh w-[220px] flex-col border-r">
        <div className="mt-2 flex w-full flex-col gap-2 p-2">
          {navLinks.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`btn gap-4 ${isActive(href) ? "active" : ""}`}
            >
              <Icon className="mr-4 size-5 stroke-1" />
              <p className="flex-1 text-left text-sm">{label}</p>
            </Link>
          ))}
          <button type="button" className="btn">
            Jump to Date
          </button>
          <button type="button" className="btn">
            Export Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

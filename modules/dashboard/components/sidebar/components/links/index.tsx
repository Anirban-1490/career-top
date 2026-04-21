"use client";

import {
  BriefcaseBusiness,
  Building2,
  Home,
  Layout,
  ListChecks,
  StickyNote,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const sidebarLinks = [
  {
    label: "Home",
    id: "home",
    url: "/dashboard",
    icon: Home,
  },
  {
    label: "Resume Builder",
    id: "resume",
    url: "/dashboard/resume",
    icon: StickyNote,
  },
  {
    label: "Resume Optimizer",
    id: "resume-optimizer",
    url: "/dashboard/resume-optimizer",
    icon: ListChecks,
  },
  {
    label: "Job Search",
    id: "jobs",
    url: "/dashboard/jobs",
    icon: BriefcaseBusiness,
  },
  {
    label: "Industry Trends",
    id: "trends",
    url: "/dashboard/trends",
    icon: Building2,
  },
  {
    label: "Jobs Tracker",
    id: "tracker",
    url: "/dashboard/tracker",
    icon: Layout,
  },
];
export default function SidebarLinks() {
  const fullPathName = usePathname();

  const [tabId, setTabId] = useState("home");
  const pathName = fullPathName.trim().split("/")[2];
  const fullTabId = pathName || tabId;
  return (
    <>
      {sidebarLinks.map((link) => {
        return (
          <li
            key={link.id}
            onClick={() => {
              setTabId(link.id);
            }}
            className="!list-none"
          >
            <Link
              href={link.url}
              className={`font-semibold flex gap-5 items-center p-2.5 rounded-sm ${
                fullTabId == link.id
                  ? "bg-neon-red"
                  : " text-foreground/50 hover:bg-secondary hover:text-foreground"
              } `}
            >
              {<link.icon />}
              {link.label}
            </Link>
          </li>
        );
      })}
    </>
  );
}

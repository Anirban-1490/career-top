"use client";

import { BriefcaseBusiness, Building2, Home, StickyNote } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

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
    label: "Job Search",
    id: "jobs",
    url: "",
    icon: BriefcaseBusiness,
  },
  {
    label: "Industry Trends",
    id: "trends",
    url: "/dashboard/trends",
    icon: Building2,
  },
];

interface ISidebarProps {
  activeId?: string;
}
export function SideBar({ activeId }: ISidebarProps) {
  const fullPathName = usePathname();

  const [tabId, setTabId] = useState(activeId ? activeId : "home");
  const pathName = fullPathName.trim().split("/")[2];
  const fullTabId = pathName || tabId;

  return (
    <aside className=" w-[21rem] shrink-0  sticky left-0 top-0   px-6 py-10">
      <div className="flex flex-col">
        <ul className=" flex flex-col gap-4 pl-0!">
          {sidebarLinks.map((link) => {
            return (
              <li
                key={link.id}
                onClick={(ev) => {
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
        </ul>
      </div>
    </aside>
  );
}

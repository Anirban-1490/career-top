import { SideBar } from "@/modules/dashboard/components/sidebar";
import React from "react";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className=" flex-grow flex ">
      <SideBar />
      <main className=" ml-84 flex-grow bg-secondary rounded-tl-lg p-10">
        {children}
      </main>
    </section>
  );
}

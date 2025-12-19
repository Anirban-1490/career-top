import React from "react";
import { EditorNavbar } from "./components/resume-navbar";
import { EditorSidebar } from "./components/sidebar";
import { EditorOutput } from "./components/output";

export function Editor() {
  return (
    <main className="h-dvh overflow-hidden flex flex-col">
      <EditorNavbar />
      <main className="flex w-full flex-grow  overflow-hidden">
        <EditorSidebar />
        <EditorOutput />
      </main>
    </main>
  );
}

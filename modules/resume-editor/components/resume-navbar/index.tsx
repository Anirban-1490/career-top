"use client";

import { Button } from "@/components/ui/button";
import { Download, Home, Share } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export function EditorNavbar() {
  const router = useRouter();

  return (
    <header className="">
      <div className="py-3 px-10 flex justify-between ">
        <div>
          <Button
            variant={"ghost"}
            className=" capitalize font-bold  text-base"
            onClick={() => {
              router.back();
            }}
          >
            <Home /> go back
          </Button>
        </div>
        <div className=" flex gap-4">
          <Button className=" capitalize font-bold  text-base">
            <Download /> Download resume
          </Button>
          <Button variant={"ghost"} className=" font-bold  text-base">
            <Share /> Share
          </Button>
        </div>
      </div>
    </header>
  );
}

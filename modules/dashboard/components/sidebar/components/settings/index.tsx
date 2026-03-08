import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getDomain } from "@/lib/utils";
import axios from "axios";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { PropsWithChildren } from "react";

export function SettingsPopup({ children }: PropsWithChildren) {
  const router = useRouter();
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[59rem] pb-0! pr-0! rounded-2xl!  overflow-hidden">
        <DialogHeader className="h-0! overflow-hidden">
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>
        <section className="w-full h-[38rem] flex  relative overflow-hidden ">
          <aside className="  w-[16rem] h-full flex flex-col pb-6 ">
            <Button
              variant={"ghost"}
              size={"lg"}
              onClick={async (ev) => {
                const res = await axios.delete(`${getDomain()}/api/sign-out`);
                if (res.status === 200) {
                  router.replace("/sign-up");
                }
              }}
              className="!list-none font-semibold flex gap-5 items-center p-2.5 mt-auto w-fit"
            >
              <LogOut />
              Log Out
            </Button>
          </aside>
          <main className=" bg-secondary flex-grow"></main>
        </section>
      </DialogContent>
    </Dialog>
  );
}

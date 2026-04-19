"use client";

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
import { DecodedIdToken } from "firebase-admin/auth";

import { LogOut, User as UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";

//TODO : DELETE ACCOUNT FUNCTION

export function SettingsPopup({
  children,
  user,
}: PropsWithChildren & { user: DecodedIdToken | null }) {
  const router = useRouter();

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[59rem] pb-0! pr-0! rounded-2xl!  overflow-hidden">
        <DialogHeader className="h-0! overflow-hidden">
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>
        <section className="w-full h-[38rem] flex  relative overflow-hidden ">
          <aside className="  w-[16rem] h-full  pb-6 pr-6">
            <ul className="h-full flex flex-col w-full pl-0!">
              <li className="!list-none w-full">
                <Button
                  // href={link.url}
                  className={` w-full font-semibold gap-5 justify-start items-center gap-1 p-2.5  ${
                    true ? "bg-neon-red" : " text-foreground/50 "
                  } `}
                >
                  <UserIcon />
                  Account
                </Button>
              </li>
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
            </ul>
          </aside>
          <main className=" bg-secondary flex-grow p-6">
            <h3 className="text-2xl font-bold">Account</h3>
            <div className="mt-20 flex flex-col gap-10">
              <div>
                <div className="text-base font-semibold">Email</div>
                <div className="text-sm mt-1 opacity-65">{user?.email}</div>
              </div>
              <div>
                <div className="text-base font-semibold">Name</div>
                <div className="text-sm mt-1 opacity-65">
                  {user?.name || "User"}
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-base font-semibold">
                    Delete my account
                  </div>
                  <div className="text-sm mt-1 opacity-65">
                    Permanently delete your account and all associated data
                  </div>
                </div>
                <div>
                  <Button>Delete Account</Button>
                </div>
              </div>
            </div>
          </main>
        </section>
      </DialogContent>
    </Dialog>
  );
}

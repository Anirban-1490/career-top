import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

import { user } from "@/lib/user";
import SidebarLinks from "./components/links";
import SettingsWrapper from "./components/settings";
import { SettingsPopup } from "./components/settings/components/popup";

export function SideBar() {
  return (
    <aside className=" w-[21rem] shrink-0  fixed left-0 top-0   px-6 py-10 h-full">
      <div className="flex flex-col h-full">
        <ul className=" flex flex-col gap-4 pl-0! h-full">
          <SidebarLinks />
          <SettingsWrapper>
            <SettingsPopup user={user}>
              <Button
                key={"settings"}
                variant={"ghost"}
                size={"lg"}
                className="!list-none font-semibold flex gap-5 items-center p-2.5 mt-auto w-fit"
              >
                <Settings />
                Settings
              </Button>
            </SettingsPopup>
          </SettingsWrapper>
        </ul>
      </div>
    </aside>
  );
}

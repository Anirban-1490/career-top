import { Input } from "@/components/ui/input";
import { Navbar } from "./components/navbar";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export const CareerUPHome = () => {
  return (
    <main>
      <Navbar />
      <section className=" flex justify-center py-14">
        <div className=" flex flex-col gap-12 items-center mx-10">
          <div>
            <h1 className=" text-xxl font-light text-center">
              No Stress Job Hunting
              <div className=" font-bold">HUNT • APPLY • INTERVIEW</div>
            </h1>
          </div>

          <div className="w-full flex flex-col gap-4 items-center">
            <div className="w-[min(100%,40rem)] relative">
              <Input type="text" className="w-full h-[3.5rem] !text-md " />
              <Button
                size={"lg"}
                className=" absolute right-2 top-[50%] translate-y-[-50%]"
              >
                <Search className="w-[4rem]" />
                Search
              </Button>
            </div>
            <div className="w-[min(100%,50rem)] bg-foreground h-[20rem] rounded-md"></div>
          </div>
        </div>
      </section>
    </main>
  );
};

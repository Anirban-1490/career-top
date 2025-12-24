import { Button } from "@/components/ui/button";
import Link from "next/link";

export const Navbar = () => {
  return (
    <header className=" py-4.5  sticky top-0 z-10 bg-background ">
      <div className=" h-full mx-20 flex items-center gap-4">
        <h2 className=" w-fit font-bold text-md  first-letter:text-neon-red first-letter:text-5xl">
          CareerTOP
        </h2>
        <div className="flex-1">
          <button></button>
        </div>
        <div className="flex gap-4">
          <Button variant={"ghost"} className=" uppercase font-bold  text-base">
            LOG IN
          </Button>
          <Link href={"/dashboard"}>
            <Button
              size={"lg"}
              className=" uppercase font-bold  text-base bg-neon-red text-white hover:bg-accent-neon-red"
            >
              SIGN UP
            </Button>
          </Link>
        </div>
      </div>
      <nav></nav>
    </header>
  );
};

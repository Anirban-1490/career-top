import { Button } from "@/components/ui/button";

export const Navbar = () => {
  return (
    <header className="h-xl py-lg">
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
          <Button
            size={"lg"}
            className=" uppercase font-bold  text-base bg-neon-red text-white hover:bg-accent-neon-red"
          >
            SIGN UP
          </Button>
        </div>
      </div>
      <nav></nav>
    </header>
  );
};

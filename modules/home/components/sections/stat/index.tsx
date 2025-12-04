import React from "react";
import { Counter } from "../../counter";

export function StatSection() {
  return (
    <div className="flex flex-col justify-between w-[80rem] h-[26rem] py-16 bg-neon-red rounded-tr-[5rem] rounded-tl-[5rem] rounded-br-[5rem]">
      <div className=" flex  justify-center gap-4">
        <div className=" px-4 border-foreground flex justify-center basis-full">
          <div className=" flex flex-col gap-2 ">
            <Counter
              endValue={400000}
              startValue={2000}
              className=" text-6xl font-semibold"
            />
            {/* <div className=" text-7xl font-semibold">400,000+</div> */}
            <div className=" text-2xl">New job&apos;s posted</div>
          </div>
        </div>
        <div className=" px-4 border-l-2 border-r-2 border-foreground flex justify-center basis-full">
          <div className=" flex flex-col gap-2 ">
            <Counter
              endValue={8000000}
              startValue={5000}
              className=" text-6xl font-semibold"
            />
            <div className=" text-2xl">Total job&apos;s</div>
          </div>
        </div>
        <div className=" px-4  flex justify-center  basis-full">
          <div className=" flex flex-col gap-2 ">
            <Counter
              endValue={100000}
              startValue={1000}
              className=" text-6xl font-semibold"
            />
            <div className=" text-2xl">Daily job seekers</div>
          </div>
        </div>
      </div>
      <div className="flex px-8 items-center">
        <h3 className=" text-4xl flex-1">
          Fresh Jobs. Real Opportunities.{" "}
          <div>Join Thousands Getting Hired!</div>
        </h3>
        <div>
          {/* <Button
                    size={"lg"}
                    className=" uppercase font-bold  text-base bg-foreground text-neon-red "
                  >
                    SIGN UP
                  </Button> */}
        </div>
      </div>
    </div>
  );
}

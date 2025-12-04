import { Bubble } from "@/components/common/bubble";
import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <div>
      <Bubble
        bubbleNotchPosition="bottom-right"
        bubbleProps={{
          className:
            " bg-neon-red mx-auto py-16 h-[35rem] bg-linear-to-r from-accent-neon-red to-neon-red",
        }}
      >
        <div className="h-full flex flex-col justify-center items-center gap-10">
          <div className="flex flex-col justify-center items-center gap-2">
            <h2 className=" text-6xl font-semibold  text-center">
              Take Your Job Search <br /> To The Next Level
            </h2>
            <p className=" text-base max-w-[40rem] px-24 text-center">
              Unlock more opportunities with Careertop. Discover jobs that match
              you and score interviews quicker — free to use.
            </p>
          </div>
          <Button
            size={"lg"}
            className={`uppercase h-[4rem] text-base hover:bg-initial hover:scale-105 
                  bg-background font-semibold px-8
                `}
          >
            Sign Up For Free
          </Button>
        </div>
      </Bubble>
    </div>
  );
}

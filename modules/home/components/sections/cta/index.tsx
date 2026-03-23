import { Bubble } from "@/components/common/bubble";
import { Button } from "@/components/ui/button";
import { DotPattern } from "@/components/ui/dot-pattern";
import Link from "next/link";

export function CTA() {
  return (
    <div>
      <Bubble
        bubbleNotchPosition="bottom-right"
        bubbleProps={{
          className:
            "  mx-auto py-16 h-[35rem] relative border  border-neon-red",
        }}
      >
        <div className="h-full flex flex-col justify-center items-center gap-10 z-1">
          <div className="flex flex-col justify-center items-center gap-2">
            <h2 className=" text-6xl font-semibold  text-center">
              Take Your Job Search <br /> To The Next Level
            </h2>
            <p className=" text-base max-w-[40rem] px-24 text-center">
              Unlock more opportunities with Careertop. Discover jobs that match
              you and score interviews quicker — free to use.
            </p>
          </div>
          <Link
            href={"/sign-up"}
            className={`uppercase text-base hover:bg-initial hover:scale-105 
                  bg-neon-red font-semibold px-8 py-4 rounded-md
                `}
          >
            Sign Up For Free
          </Link>
        </div>
        <DotPattern
          width={20}
          height={20}
          cx={1}
          cy={1}
          cr={1}
          glow
          className="absolute text-neon-red!"
          // className={cn(
          //   "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]",
          // )}
        />
      </Bubble>
    </div>
  );
}

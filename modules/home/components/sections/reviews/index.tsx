import { Bubble } from "@/components/common/bubble";
import Image from "next/image";
import { Counter } from "../../counter";
import { reviews } from "@/modules/home/model/review";

export function ReviewSection() {
  return (
    <Bubble
      bubbleNotchPosition="top-left"
      bubbleProps={{ className: " bg-neon-red mx-auto py-16" }}
    >
      <div className=" px-20 flex flex-col gap-[2rem]">
        <h2 className=" uppercase text-5xl font-semibold w-fit">
          trusted by{" "}
          <Counter
            className=" bg-neon-orange p-3 w-fit text-background my-3"
            startValue={4000}
            endValue={100000}
          />{" "}
          users worldwide
        </h2>
        <div className=" flex flex-col gap-6 w-full items-end">
          {reviews.map((review) => {
            return (
              <Bubble
                bubbleNotchPosition="top-right"
                key={review.id}
                bubbleBorderRadius="2rem"
                bubbleProps={{
                  className: " w-[min(100%,42rem)]  bg-foreground p-5 py-7",
                }}
              >
                <p className=" text-base text-background">{review.review}</p>
                <div className="mt-3 flex gap-1 items-center">
                  <div className="relative w-[2rem] h-[2rem] object-contain overflow-hidden rounded-full">
                    <Image
                      src={review.profileImage}
                      alt={review.name}
                      fill
                      className=" absolute"
                    />
                  </div>
                  <div className="text-background  text-sm">
                    <span className=" font-semibold">{review.name}</span>/
                    <span className=" ml-1  opacity-65">{review.role}</span>
                  </div>
                </div>
              </Bubble>
            );
          })}
        </div>
      </div>
    </Bubble>
  );
}

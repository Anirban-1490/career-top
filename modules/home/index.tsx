import { Navbar } from "./components/navbar";
import SearchJob from "./components/search-job";
import { Counter } from "./components/counter";
import { Card } from "@/components/common/card";
import Image from "next/image";
import { featureData } from "./model/features-data";
import { Bubble } from "@/components/common/bubble";
import { reviews } from "./model/review";
import { pricingPlans } from "./model/price-data";
import { Button } from "@/components/ui/button";
import { CircleCheck } from "lucide-react";

const CareerUPHome = () => {
  return (
    <main>
      <Navbar />
      <section className=" flex justify-center py-14 my-20 ">
        <div className=" flex flex-col gap-12 items-center mx-10">
          <div>
            <h1 className=" text-xxl font-light text-center">
              No Stress Job Hunting
              <div className=" font-bold text-neon-red">
                HUNT • <span>APPLY</span> • INTERVIEW
              </div>
            </h1>
          </div>

          <SearchJob />
        </div>
      </section>
      <section className="flex justify-center mb-[10rem]">
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
      </section>
      <section className=" mb-40">
        <div className=" flex flex-col items-center gap-16">
          <div className="">
            <h2 className=" text-center text-5xl font-semibold">
              Top companies our job seekers choose
            </h2>
            <p className="text-neon-red text-center mt-2 text-md">
              Our users have secured positions at industry-leading companies
              such as
            </p>
          </div>
          <div className="h-[5rem] w-full overflow-hidden">
            <div className="company_name__container h-full  flex  w-[250%] ">
              <div className=" text-foreground flex-grow item item1 text-3xl">
                Company 1
              </div>
              <div className=" text-foreground flex-grow item item2 text-3xl">
                Company 2
              </div>
              <div className=" text-foreground flex-grow item item3 text-3xl">
                Company 3
              </div>
              <div className=" text-foreground flex-grow item item4 text-3xl">
                Company 4
              </div>
              <div className=" text-foreground flex-grow item item5 text-3xl">
                Company 1
              </div>
              <div className=" text-foreground flex-grow item item6 text-3xl">
                Company 2
              </div>
              <div className=" text-foreground flex-grow  item item7 text-3xl">
                Company 3
              </div>
              <div className=" text-foreground flex-grow item item8 text-3xl">
                Company 4
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className=" mb-40">
        <div className="flex flex-col gap-16 items-center">
          <div className=" flex flex-col items-center">
            <h2 className=" text-center text-5xl font-semibold w-fit">
              Make
              <span className=" inline-block mb-3 ml-1 text-neon-red">
                Your Job Search 10X
              </span>{" "}
              <br /> better with Careertop
            </h2>
          </div>
          <div className=" px-[10rem] grid grid-cols-4 gap-4 gap-y-6">
            {featureData.map((feature) => {
              const cardProps = feature.parentClassName
                ? { className: feature.parentClassName }
                : {};

              return (
                <Card
                  title="AI Resume Builder"
                  description="Use AI to make your resume ATS-friendly, boost your score."
                  key={feature.id}
                  cardProps={{ ...cardProps }}
                  titleProps={{ className: "text-md font-semibold mb-2" }}
                  descriptionProps={{ className: "text-base" }}
                >
                  <div
                    style={{ backgroundImage: `url(/${feature.url})` }}
                    className={` bg-no-repeat bg-cover relative w-full h-full overflow-hidden rounded-xl rounded-bl-none rounded-br-none`}
                  ></div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
      <section className="mb-40">
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
                    <p className=" text-base text-background">
                      {review.review}
                    </p>
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
      </section>
      <section className="mb-40">
        <div className=" flex flex-col gap-16">
          <div className=" flex flex-col items-center">
            <h2 className=" text-center text-5xl font-semibold w-fit">
              <span className=" inline-block mb-3 ml-1 text-neon-red">
                Low Pricing,
              </span>{" "}
              <br /> Packed With Features
            </h2>
          </div>
          <div className=" flex gap-20 justify-center">
            {pricingPlans.map((pricing) => {
              return (
                <Card
                  description={pricing.name}
                  descriptionFirst
                  title={
                    <>
                      {pricing.originalPrice && (
                        <span className=" inline-block mr-2 text-md  line-through font-normal">
                          {pricing.originalPrice}
                        </span>
                      )}
                      {pricing.price}
                    </>
                  }
                  key={pricing.id}
                  cardProps={{
                    className: `basis-[25rem] h-auto px-10 py-12 pb-25 hover:bg-unset hover:text-unset ${
                      pricing.id !== "plan_premium"
                        ? "bg-transparent border border-neon-red"
                        : ""
                    }`,
                  }}
                  titleProps={{ className: "text-3xl font-bold" }}
                >
                  <div className=" flex flex-col mt-[2rem] gap-13">
                    <Button
                      size={"lg"}
                      className={`uppercase h-[3rem] text-base hover:bg-initial hover:scale-105 ${
                        pricing.id == "plan_premium"
                          ? "bg-foreground text-neon-red "
                          : " bg-transparent border border-neon-red"
                      }`}
                    >
                      Subscribe
                    </Button>
                    <div>
                      <h4 className="mb-5">What&apos;s Included:</h4>
                      <ul className=" flex flex-col gap-4">
                        {pricing.features.map((pricingFeature) => {
                          return (
                            <li
                              className=" flex items-center gap-4"
                              key={pricingFeature.id}
                            >
                              <CircleCheck
                                className={`${
                                  pricing.id !== "plan_premium"
                                    ? " text-neon-red"
                                    : " "
                                }`}
                              />
                              {pricingFeature.label}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
      <section className="mb-40">
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
                  Unlock more opportunities with Careertop. Discover jobs that
                  match you and score interviews quicker — free to use.
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
      </section>
      <footer></footer>
    </main>
  );
};

export default CareerUPHome;

import { Card } from "@/components/common/card";
import { Button } from "@/components/ui/button";
import { pricingPlans } from "@/modules/home/model/price-data";
import { CircleCheck } from "lucide-react";
import React from "react";

export function PricingSection() {
  return (
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
  );
}

"use client";

import { EmptyContent } from "../empty-content";
import { ContainerWithSpinner } from "@/components/common/container-with-spinner";
import { IndustryPreferenceDialog } from "./component/industry-preference-dialog";
import { checkUserIndustryPreferenceTrends } from "@/action/trends";
import { useQuery } from "@tanstack/react-query";

import { Card } from "@/components/common/card";
import { IndustryGrowthChart } from "./component/industry-growth-chart";
import { TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SalaryRangeChart } from "./component/salary-range-chart";
import dayjs from "dayjs";
import { Button } from "@/components/ui/button";

export function IndustryTrend() {
  const { isFetching, data: userPreference } = useQuery({
    queryKey: ["industry-trend"],
    queryFn: () => checkUserIndustryPreferenceTrends(),
    refetchOnWindowFocus: false,
    gcTime: 0,
  });

  if (isFetching) {
    return <ContainerWithSpinner />;
  }

  return (
    <section className="w-full  flex flex-col">
      {!userPreference && (
        <EmptyContent
          Container={IndustryPreferenceDialog}
          buttonContent={"Add Preference"}
          description="Create your own industry preference to view latest trends"
          title="No Preference Found"
          buttonProps={{
            onClick: () => {},
          }}
        />
      )}
      {userPreference && (
        <>
          <div className=" flex gap-3 items-center mb-10">
            <h2 className=" text-3xl font-semibold ">Industry Trends</h2>
            <Badge className=" text-xs whitespace-normal">
              Next Update:{" "}
              {dayjs(userPreference.nextUpdate).format("YYYY-MM-DD")}
            </Badge>
            <IndustryPreferenceDialog
              initialData={{
                currentSkills: userPreference.currentSkills,
                experience: userPreference.experience,
                industry: userPreference.industry,
                specialization: userPreference.specialization,
              }}
            >
              <Button className=" ml-auto" size={"sm"}>
                Change Preference
              </Button>
            </IndustryPreferenceDialog>
          </div>
          <div className=" grid grid-cols-[repeat(4,_minmax(0,_1fr))] grid-rows-[repeat(auto-fit,_minmax(0,_1fr))] gap-3 h-full flex-grow">
            <Card
              cardProps={{
                className: "bg-background",
              }}
              title={"Demand Level"}
              description={`Current demand of ${userPreference.specialization}`}
              descriptionProps={{ className: "opacity-50" }}
            >
              <div className="text-5xl flex justify-center items-center h-full">
                {userPreference.aiResponse.demandLevel}
                <TrendingUp />
              </div>
            </Card>
            <Card
              cardProps={{ className: "bg-background " }}
              title={"Industry Growth"}
              description={`Growth rate of ${userPreference.specialization} in last 5 months`}
              descriptionProps={{ className: "opacity-50" }}
            >
              <IndustryGrowthChart
                data={userPreference.aiResponse.growthRate}
              />
            </Card>
            <Card
              cardProps={{ className: "bg-background  w-full" }}
              title={"Recommended Skills"}
              description={`Skills to get a entry in ${userPreference.specialization}`}
              descriptionProps={{ className: "opacity-50" }}
            >
              <div className=" flex flex-wrap gap-2 w-full">
                {userPreference.aiResponse.recommendedSkills.map(
                  (rSkill, index) => {
                    return (
                      <Badge
                        className=" text-sm whitespace-normal"
                        variant={"secondary"}
                        key={index}
                      >
                        {rSkill}
                      </Badge>
                    );
                  },
                )}
              </div>
            </Card>
            <Card
              cardProps={{ className: "bg-background " }}
              title={"Top Skills"}
              description={`Top skills in ${userPreference.specialization} that gives the highest position`}
              descriptionProps={{ className: "opacity-50" }}
            >
              <div className=" flex flex-wrap gap-2">
                {userPreference.aiResponse.topSkills.map((tSkill, index) => {
                  return (
                    <Badge className=" text-sm whitespace-normal" key={index}>
                      {tSkill}
                    </Badge>
                  );
                })}
              </div>
            </Card>
            <Card
              cardProps={{ className: "bg-background  col-span-full " }}
              title={"Salary Ranges"}
              description={`Salary Range of ${userPreference.specialization} in different roles ($)`}
              descriptionProps={{ className: "opacity-50" }}
            >
              <SalaryRangeChart data={userPreference.aiResponse.salaryRanges} />
            </Card>
          </div>
        </>
      )}
    </section>
  );
}

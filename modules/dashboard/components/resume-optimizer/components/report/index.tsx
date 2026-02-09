"use client";

import { getUserOptimziedResume } from "@/action/optimizer";
import { ContainerWithSpinner } from "@/components/common/container-with-spinner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const borderColorMap = {
  CRITICAL: "border-neon-red",
  URGENT: "border-neon-purple",
  OPTIONAL: "border-neon-orange",
};

export function ResumeReport({ resumeId }: { resumeId: string }) {
  const router = useRouter();
  const { data, isFetching } = useQuery({
    queryKey: ["optimised-resume", resumeId],
    queryFn: async () => {
      return getUserOptimziedResume(resumeId);
    },
    refetchOnWindowFocus: false,
  });

  if (isFetching) return <ContainerWithSpinner />;
  if (!data?.optimizedResume?.aiResponse)
    return (
      <section>
        <p>Nothing to Analyze. Please provide a valid resume</p>
      </section>
    );
  const { optimization, grade, score, totalFixCount } =
    data.optimizedResume.aiResponse;

  return (
    <section className="w-full max-h-full overflow-hidden">
      <div className="flex gap-4 mb-10 sticky top-0">
        {" "}
        <Button
          onClick={(ev) => {
            ev.preventDefault();
            router.back();
          }}
          variant={"ghost"}
        >
          <ArrowLeft />
          Back
        </Button>
        <Badge variant={"outline"}>{data.optimizedResume.file.name}</Badge>
      </div>
      <div className=" flex  gap-10 items-center mt-2 mb-25 sticky top-0">
        <div className=" flex  items-center gap-3 h-full">
          <div className=" text-center  rounded-md overflow-hidden">
            <p className="px-12 py-2 text-md bg-neon-orange ">
              {totalFixCount.critical}
            </p>
            <h5 className=" text-sm uppercase  bg-neon-orange/50">
              Critical Fix
            </h5>
          </div>
          <div className=" text-center  rounded-md overflow-hidden">
            <p className="px-12 py-2 text-md bg-neon-red ">
              {totalFixCount.urgent}
            </p>
            <h5 className=" text-sm uppercase  bg-neon-red/50">Urgent Fix</h5>
          </div>
          <div className=" text-center  rounded-md overflow-hidden">
            <p className="px-12 py-2 text-md bg-neon-purple ">
              {totalFixCount.optional}
            </p>
            <h5 className=" text-sm uppercase  bg-neon-purple/50">
              Optional Fix
            </h5>
          </div>
        </div>
        <h2 className=" text-center text-3xl bg-neon-red min-w-23 p-4 ml-auto">
          {grade}
        </h2>

        <h2 className=" text-center text-3xl w-fit p-4 ">{score}</h2>
      </div>
      <div className=" flex flex-col gap-12 max-h-[65vh] overflow-auto">
        {Object.entries(optimization!).map((entry, index) => {
          const [section, val] = entry;
          if (!val) return;
          return (
            <div key={index}>
              <div className=" flex">
                <h2 className=" uppercase text-3xl font-bold">{section}</h2>
                <div className="flex ml-auto gap-3 px-4">
                  <Badge className=" text-neon-red" variant={"outline"}>
                    {val.fixCount.critical} Critical
                  </Badge>
                  <Badge className=" text-neon-purple" variant={"outline"}>
                    {val.fixCount.urgent} Urgent
                  </Badge>
                  <Badge className=" text-neon-orange" variant={"outline"}>
                    {val.fixCount.optional} Optional
                  </Badge>
                </div>
              </div>
              <ul className=" flex flex-col gap-3 mt-5 px-0!">
                {val?.improvements.map((improvement, index) => {
                  return (
                    <li
                      className={`px-7  min-h-17 place-content-center rounded-md border-l-3 ${borderColorMap[improvement.status]} list-none!`}
                      key={index}
                    >
                      {improvement.text}
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}

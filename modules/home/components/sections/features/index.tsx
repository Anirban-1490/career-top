import { Card } from "@/components/common/card";
import { featureData } from "@/modules/home/model/features-data";

export function FeatureSection() {
  return (
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
  );
}

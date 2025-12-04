import { Navbar } from "./components/navbar";
import SearchJob from "./components/search-job";
import { Footer } from "@/components/common/footer";
import { StatSection } from "./components/sections/stat";
import { InView } from "@/components/common/in-view";
import { TopCompaniesSection } from "./components/sections/top-companies";
import { FeatureSection } from "./components/sections/features";
import { ReviewSection } from "./components/sections/reviews";
import { PricingSection } from "./components/sections/pricing";
import { CTA } from "./components/sections/cta";

const CareerUPHome = () => {
  return (
    <main>
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
        <InView>
          <StatSection />
        </InView>
      </section>
      <section className=" mb-40">
        <InView>
          <TopCompaniesSection />
        </InView>
      </section>
      <section className=" mb-40">
        <InView>
          <FeatureSection />
        </InView>
      </section>
      <section className="mb-40">
        <InView>
          <ReviewSection />
        </InView>
      </section>
      <section className="mb-40">
        <InView>
          <PricingSection />
        </InView>
      </section>
      <section className="mb-40">
        <InView>
          <CTA />
        </InView>
      </section>
      <Footer />
    </main>
  );
};

export default CareerUPHome;

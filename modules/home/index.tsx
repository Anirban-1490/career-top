import { Navbar } from "./components/navbar";
import SearchJob from "./components/search-job";
import { Counter } from "./components/counter";

const CareerUPHome = () => {
  return (
    <main>
      <Navbar />
      <section className=" flex justify-center py-14 mb-20">
        <div className=" flex flex-col gap-12 items-center mx-10">
          <div>
            <h1 className=" text-xxl font-light text-center">
              No Stress Job Hunting
              <div className=" font-bold">HUNT • APPLY • INTERVIEW</div>
            </h1>
          </div>

          <SearchJob />
        </div>
      </section>
      <section className="flex justify-center mb-2xl">
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
      <section>
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
    </main>
  );
};

export default CareerUPHome;

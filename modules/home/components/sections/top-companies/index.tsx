export function TopCompaniesSection() {
  return (
    <div className=" flex flex-col items-center gap-16">
      <div className="">
        <h2 className=" text-center text-5xl font-semibold">
          Top companies our job seekers choose
        </h2>
        <p className="text-neon-red text-center mt-2 text-md">
          Our users have secured positions at industry-leading companies such as
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
  );
}

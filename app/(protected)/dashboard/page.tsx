import { user } from "@/lib/user";

export default async function DashboardPage() {
  return (
    <section className="h-full">
      <div>
        <h2 className=" text-center">
          {" "}
          Hi, {(user?.name as string).split(" ")[0]}
        </h2>
      </div>
    </section>
  );
}

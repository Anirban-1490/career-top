import { UserProfile } from "@/action/user-profile";

export default async function DashboardPage() {
  const user = await UserProfile();
  return (
    <section className="h-full">
      <div>
        <h2 className=" text-center">
          {" "}
          Hi, {user ? (user.name as string).split(" ")[0] : "User"}
        </h2>
      </div>
    </section>
  );
}

import { UserAuthForm } from "@/appcomponents/home/user-login";
import CreateCampaign from "@/appcomponents/home/create-campaign";
import Image from "next/image";
import { getCurrentUser } from "~/server/session";

export default async function HomePage() {
  const user = await getCurrentUser();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white text-black">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <Image
          src="/logo.png"
          alt="Never a one shot"
          width="420"
          height="64"
          className="mr-4"
        />
        {user == null ? <UserAuthForm /> : <CreateCampaign />}
      </div>
    </main>
  );
}

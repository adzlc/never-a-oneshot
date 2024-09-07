import { Separator } from "@/components/ui/separator";
import { Tabs } from "@/components/ui/tabs";
import { MainNav } from "~/app/_components/layouts/main-nav";
import { type Campaign } from "~/data/typings";
import { getServerAuthSession } from "~/server/auth";

export default async function MainLayout({
  children,
  campaign: campaign,
}: {
  children: React.ReactNode;
  campaign: Campaign | null | undefined;
}) {
  const session = await getServerAuthSession();
  const user = {
    name: session?.user.name,
    image: session?.user.image,
    email: session?.user.email,
  };
  return (
    <div className="flex-col md:flex relative">
      <div className="border-b sticky top-0 z-50 w-full bg-white">
        <div className="flex h-12 items-center px-4 md:h-24">
          <div className="ml-auto flex w-full space-x-2 md:justify-start">
            <MainNav
              campaign={campaign}
              user={user}
              className="mx-6"
            />
          </div>
        </div>
        <div className="ml-5 border-b md:hidden">
          <h1 className="text-xl font-bold text-sims">
            {campaign ? campaign?.name : "Campaigns"}
          </h1>
        </div>
      </div>
      <Separator />
      <div className="h-full w-full bg-secondarybackground min-h-[calc(100vh-7rem)]">
        {children}
      </div>
    </div>
  );
}

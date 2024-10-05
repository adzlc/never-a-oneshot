import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { MainNav } from "~/app/_components/layouts/main-nav";
import { get } from "~/server/actions/campaign-actions";
import { getServerAuthSession } from "~/server/auth";
import { UserAccountNav } from "./user-account-nav";

export default async function MainLayout({
  children,
  campaignId,
}: {
  children: React.ReactNode;
  campaignId: string;
}) {
  const campaign = await get(campaignId);

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
            <Link href="/" legacyBehavior passHref>
              <Image
                src="/logo.png"
                alt="Never a oneshot"
                width="420"
                height="64"
                className="mr-4 hidden cursor-pointer md:flex"
              />
            </Link>
            <nav className="hidden gap-6 md:justify-start  md:flex">
              <MainNav
                campaign={campaign}
                user={user}
                className="mx-6"
              />
            </nav>
            <div className="flex justify-end w-full">
              <div className="ml-auto flex hidden items-center  w-full space-x-2 md:justify-end md:flex">
                <h1 className="text-primary text-2xl font-bold text-sims">
                  {campaign ? campaign?.name : "Campaigns"}
                </h1>
                <div>
                  <UserAccountNav user={user} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Separator />
      <div className="h-full w-full bg-secondarybackground min-h-[calc(100vh-7rem)]">
        {children}
      </div>
    </div>
  );
}

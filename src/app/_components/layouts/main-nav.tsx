"use client";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { FaCat, FaHome } from "react-icons/fa";
import { FaPerson } from "react-icons/fa6";
import { type Campaign } from "~/data/typings";
import Image from "next/image";
import React from "react";
import { UserAccountNav } from "./user-account-nav";

interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  campaign?: Campaign | undefined | null;
  user: {
    name: string | null | undefined;
    image: string | null | undefined;
    email: string | null | undefined;
  };
}

export function MainNav({
  className,
  campaign,
  user,
  ...props
}: SidebarProps) {
  return (
    <>
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
        <NavigationMenu>
          <NavigationMenuList>
            {campaign && (
              <>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Visit</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-6 w-[500px] grid-cols-[.75fr_1fr]">
                      <li className="row-span-3">
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          href={`/playercharacters/${campaign.id}`}
                        >
                          <FaPerson />
                          <div className="mb-2 mt-4 text-lg font-medium">
                            Player Characters
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            {`View the ${campaign.name}'s Player's Characters.`}
                          </p>
                        </a>
                      </li>
                      <li className="row-span-2">
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          href={`/npcs/${campaign.id}`}
                        >
                          <FaPerson />
                          <div className="mb-2 mt-4 text-lg font-medium">
                            NPCs
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            {`View the ${campaign.name}'s NPCs.`}
                          </p>
                        </a>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>Create</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-6 w-[500px] grid-cols-[.75fr_1fr]">
                      <li className="row-span-3">
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          href={`/playercharacters/create/${campaign.id}`}
                        >
                          <FaPerson />
                          <div className="mb-2 mt-4 text-lg font-medium">
                            PlayerCharacter
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Create a Character for your Campaign.
                          </p>
                        </a>
                      </li>
                      <li className="row-span-3">
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          href={`/npcs/create/${campaign.id}`}
                        >
                          <FaPerson />
                          <div className="mb-2 mt-4 text-lg font-medium">
                            NPC
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Create an NPC for your Campaign.
                          </p>
                        </a>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link
                    href={`/campaign/${campaign.id}`}
                    legacyBehavior
                    passHref
                  >
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Edit Campaign
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </>
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </nav>
      <div className="flex justify-end w-full">
        <div className="ml-auto flex hidden items-center  w-full space-x-2 md:justify-end md:flex">
          <h1 className="text-2xl font-bold text-sims">
            {campaign ? campaign?.name : "Campaigns"}
          </h1>
          <div>
            <UserAccountNav user={user} />
          </div>
        </div>
      </div>
    </>
  );
}

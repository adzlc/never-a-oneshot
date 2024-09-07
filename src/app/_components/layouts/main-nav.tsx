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
          alt="Neighbourhoods"
          width="420"
          height="64"
          className="mr-4 hidden cursor-pointer md:flex"
        />
      </Link>
      <Link href="/" legacyBehavior passHref>
        <Image
          src="/mobile_logo.png"
          alt="Neighbourhoods"
          width="218"
          height="36"
          className="mr-4 cursor-pointer md:hidden"
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
                    <ul className="ml-30 grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      <li className="row-span-1">
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          href={`/sims/${campaign.id}`}
                        >
                          <FaHome />
                          <div className="mb-2 mt-4 text-lg font-medium">
                            Neighbourhood
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            {`View the ${campaign.name}'s Sims.`}
                          </p>
                        </a>
                      </li>
                      <li className="row-span-1">
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          href={`/pets/${campaign.id}`}
                        >
                          <FaCat />
                          <div className="mb-2 mt-4 text-lg font-medium">
                            Pets
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            {`View the ${campaign.name}'s Pets.`}
                          </p>
                        </a>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>Create</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      <li className="row-span-3">
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          href={`/sims/create/${campaign.id}`}
                        >
                          <FaPerson />
                          <div className="mb-2 mt-4 text-lg font-medium">
                            Sim
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Create a sim for your neighbourhood.
                          </p>
                        </a>
                      </li>
                      <li className="row-span-3">
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          href={`/pets/create/${campaign.id}`}
                        >
                          <FaCat />
                          <div className="mb-2 mt-4 text-lg font-medium">
                            Pet
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Create a pet for your neighbourhood.
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
    </>
  );
}

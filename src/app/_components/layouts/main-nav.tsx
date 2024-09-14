"use client";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { FaHome } from "react-icons/fa";
import { FaPerson } from "react-icons/fa6";
import { type Campaign } from "~/data/typings";
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
      <NavigationMenu>
        <NavigationMenuList>
          {campaign && (
            <>
              <NavigationMenuItem>
                <NavigationMenuTrigger className=" text-primary">Visit</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 w-[500px] grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <a
                        className="text-primary flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href={`/${campaign.id}`}
                      >
                        <FaHome />
                        <div className="mb-2 mt-4 text-lg font-medium">
                          {campaign.name}
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          {`View the ${campaign.name}`}
                        </p>
                      </a>
                    </li>
                    <li className="row-span-3">
                      <a
                        className="text-primary flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href={`/${campaign.id}/playercharacters`}
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
                        className="  text-primary flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href={`/${campaign.id}/npcs`}
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
                    <li className="row-span-2">
                      <a
                        className="  text-primary flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href={`/${campaign.id}/campaignsessions`}
                      >
                        <FaPerson />
                        <div className="mb-2 mt-4 text-lg font-medium">
                          Campaign Sessions
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          {`View the ${campaign.name}'s sessions.`}
                        </p>
                      </a>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </>
          )}
        </NavigationMenuList>
      </NavigationMenu>

    </>
  );
}

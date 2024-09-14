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
import { Menu, MenuDescription, MenuItem, MenuLink, MenuTitle } from "./menu-item";

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
    <NavigationMenu>
      <NavigationMenuList>
        {campaign && (
          <>
            <NavigationMenuItem>
              <NavigationMenuTrigger className=" text-primary">Visit</NavigationMenuTrigger>
              <NavigationMenuContent>
                <Menu>
                  <MenuItem>
                    <MenuLink href={`/${campaign.id}`}>
                      <FaHome />
                      <MenuTitle>Home</MenuTitle>
                      <MenuDescription>{`View the ${campaign.name}`}</MenuDescription>
                    </MenuLink>
                  </MenuItem>
                  <MenuItem>
                    <MenuLink href={`/${campaign.id}/playercharacters`}>
                      <FaPerson />
                      <MenuTitle>Player Characters</MenuTitle>
                      <MenuDescription>{`View the ${campaign.name}'s Player's Characters`}</MenuDescription>
                    </MenuLink>
                  </MenuItem>
                  <MenuItem>
                    <MenuLink href={`/${campaign.id}/npcs`}>
                      <FaPerson />
                      <MenuTitle>Campaign NPCs</MenuTitle>
                      <MenuDescription>{`View the ${campaign.name}'s NPCs`}</MenuDescription>
                    </MenuLink>
                  </MenuItem>
                  <MenuItem>
                    <MenuLink href={`/${campaign.id}/campaignsessions`}>
                      <FaPerson />
                      <MenuTitle>Campaign Sessions</MenuTitle>
                      <MenuDescription>{`View the ${campaign.name}'s sessions`}</MenuDescription>
                    </MenuLink>
                  </MenuItem>
                  <MenuItem>
                    <MenuLink href={`/${campaign.id}/campaignitems`}>
                      <FaPerson />
                      <MenuTitle>Campaign Items</MenuTitle>
                      <MenuDescription>{`View the ${campaign.name}'s items`}</MenuDescription>
                    </MenuLink>
                  </MenuItem>
                </Menu>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

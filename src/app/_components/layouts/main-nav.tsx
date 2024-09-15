"use client";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { FaCalendar, FaExclamation, FaHome } from "react-icons/fa";
import { FaBagShopping, FaPerson, FaUserGroup } from "react-icons/fa6";
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
                      <FaUserGroup />
                      <MenuTitle>Campaign NPCs</MenuTitle>
                      <MenuDescription>{`View the ${campaign.name}'s NPCs`}</MenuDescription>
                    </MenuLink>
                  </MenuItem>
                  <MenuItem>
                    <MenuLink href={`/${campaign.id}/campaignsessions`}>
                      <FaCalendar />
                      <MenuTitle>Campaign Sessions</MenuTitle>
                      <MenuDescription>{`View the ${campaign.name}'s sessions`}</MenuDescription>
                    </MenuLink>
                  </MenuItem>
                  <MenuItem>
                    <MenuLink href={`/${campaign.id}/campaignitems`}>
                      <FaBagShopping />
                      <MenuTitle>Campaign Items</MenuTitle>
                      <MenuDescription>{`View the ${campaign.name}'s items`}</MenuDescription>
                    </MenuLink>
                  </MenuItem>
                  <MenuItem>
                    <MenuLink href={`/${campaign.id}/quests`}>
                      <FaExclamation />
                      <MenuTitle>Quests</MenuTitle>
                      <MenuDescription>{`View the ${campaign.name}'s quests`}</MenuDescription>
                    </MenuLink>
                  </MenuItem>
                  <MenuItem>
                    <MenuLink href={`/${campaign.id}/locations`}>
                      <FaExclamation />
                      <MenuTitle>Locations</MenuTitle>
                      <MenuDescription>{`View the ${campaign.name}'s locations`}</MenuDescription>
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

import Link, { LinkProps } from "next/link";
import React from "react";
import { cn } from "~/lib/utils";

const Menu = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => (
  <ul
    className={cn(
      "grid gap-3 p-6 w-[500px] grid-cols-[.75fr_1fr]",
      className
    )}
    {...props}
  />
))
Menu.displayName = "Menu"

const MenuItem = React.forwardRef<
  HTMLLIElement,
  React.HTMLAttributes<HTMLLIElement>
>(({ className, ...props }, ref) => (
  <li
    className={cn(
      "row-span-2",
      className
    )}
    {...props}
  />
))
MenuItem.displayName = "MenuLink"


/**
 * Extends next/Link and just forces classes on it.
 */
const MenuLink = React.forwardRef<
  HTMLAnchorElement,
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & LinkProps & React.RefAttributes<HTMLAnchorElement>
>(({ className, href, ...props }, ref) => (
  <Link
    ref={ref}
    href={href}
    className={cn(
      "text-primary flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md",
      className
    )}
    {...props}
  />

))
MenuLink.displayName = "MenuLink"

const MenuTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "mb-2 mt-4 text-lg font-medium",
      className
    )}
    {...props}
  />
))
MenuTitle.displayName = "MenuTitle"

const MenuDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "text-sm leading-tight text-muted-foreground",
      className
    )}
    {...props}
  />
))
MenuDescription.displayName = "MenuDescription"

export { Menu, MenuItem, MenuLink, MenuTitle, MenuDescription };
"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useTheme } from "@/lib/theme-provider";
import { MenuIcon, XIcon, MoonIcon, SunIcon, VoteIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { NavLink } from "@/types";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks: NavLink[] = [
    { href: "/public", label: "Elections" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const authLinks: NavLink[] = [
    { href: "/voter", label: "Voter Dashboard" },
    { href: "/candidate", label: "Candidate Dashboard" },
    { href: "/admin", label: "Admin Dashboard" },
  ];

  const ThemeToggleButton = () => (
    <Button
      onClick={toggleTheme}
      size="icon"
      variant="ghost"
      aria-label="Toggle theme"
      className="ml-2"
    >
      {theme === "dark" ? <MoonIcon /> : <SunIcon />}
    </Button>
  );

  const Logo = () => (
    <Link href="/" className="flex items-center gap-2">
      <VoteIcon className="text-primary" />
      <span className="text-xl font-bold">ChainElect</span>
    </Link>
  );

  const renderNavLinks = (links: NavLink[], inDropdown = false) => {
    if (inDropdown) {
      return links.map((link) => (
        <DropdownMenuItem key={link.href} asChild>
          <Link href={link.href}>{link.label}</Link>
        </DropdownMenuItem>
      ));
    }

    return links.map((link) => (
      <NavigationMenuItem key={link.href}>
        <NavigationMenuLink
          className={navigationMenuTriggerStyle()}
          active={pathname === link.href}
          asChild
        >
          <Link href={link.href}>{link.label}</Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
    ));
  };

  return (
    <header className="sticky top-0 z-50 bg-background border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Logo />

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center">
            <NavigationMenu>
              <NavigationMenuList>{renderNavLinks(navLinks)}</NavigationMenuList>
            </NavigationMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">Access</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>{renderNavLinks(authLinks, true)}</DropdownMenuContent>
            </DropdownMenu>

            <ThemeToggleButton />
          </div>

          {/* Mobile Nav Trigger */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggleButton />
            <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  {isMenuOpen ? <XIcon /> : <MenuIcon />}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                {renderNavLinks(navLinks, true)}
                <DropdownMenuItem className="my-2 border-t" disabled />
                {renderNavLinks(authLinks, true)}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}

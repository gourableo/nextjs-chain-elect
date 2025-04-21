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

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: "/public", label: "Elections" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const authLinks = [
    { href: "/voter/login", label: "Voter Login" },
    { href: "/candidate/login", label: "Candidate Login" },
    { href: "/admin/login", label: "Admin" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <VoteIcon className="text-primary" />
            <span className="text-xl font-bold">ChainElect</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center">
            <NavigationMenu>
              <NavigationMenuList>
                {navLinks.map((link) => (
                  <NavigationMenuItem key={link.href}>
                    <Link href={link.href}>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                        active={pathname === link.href}
                      >
                        {link.label}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">Access</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {authLinks.map((link) => (
                  <DropdownMenuItem key={link.href} asChild>
                    <Link href={link.href}>{link.label}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button onClick={toggleTheme} size="icon" variant="ghost" className="ml-2">
              {theme === "dark" ? <MoonIcon /> : <SunIcon />}
            </Button>
          </div>

          {/* Mobile Nav Trigger */}
          <div className="md:hidden flex items-center gap-2">
            <Button onClick={toggleTheme} size="icon" variant="ghost" aria-label="Toggle theme">
              {theme === "dark" ? <MoonIcon /> : <SunIcon />}
            </Button>
            <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  {isMenuOpen ? <XIcon /> : <MenuIcon />}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                {navLinks.map((link) => (
                  <DropdownMenuItem key={link.href} asChild>
                    <Link href={link.href}>{link.label}</Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuItem className="my-2 border-t" disabled />
                {authLinks.map((link) => (
                  <DropdownMenuItem key={link.href} asChild>
                    <Link href={link.href}>{link.label}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}

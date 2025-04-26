"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useAccount, useDisconnect } from "wagmi";
import { MenuIcon, XIcon, MoonIcon, SunIcon, VoteIcon, Wallet, LaptopIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConnectWalletButton } from "@/components/common/ConnectWalletButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
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
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();
  const [isClient, setIsClient] = useState(false);

  // Set client-side rendering flag after mount
  useEffect(() => {
    setIsClient(true);
  }, []);

  const navLinks: NavLink[] = [
    { href: "/", label: "Home" },
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost" aria-label="Toggle theme" className="ml-2">
          {theme === "dark" ? <MoonIcon /> : theme === "light" ? <SunIcon /> : <LaptopIcon />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <SunIcon className="mr-2 h-4 w-4" /> Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <MoonIcon className="mr-2 h-4 w-4" /> Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          <LaptopIcon className="mr-2 h-4 w-4" /> System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
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

            {isClient &&
              (isConnected && address ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="ml-2">
                      <Wallet className="mr-2 h-4 w-4" />
                      {address.substring(0, 6) + "..." + address.substring(address.length - 4)}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {renderNavLinks(authLinks, true)}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => disconnect()}>Disconnect</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <ConnectWalletButton className="ml-2" />
              ))}

            <ThemeToggleButton />
          </div>

          {/* Mobile Nav Trigger */}
          <div className="md:hidden flex items-center gap-2">
            {isClient &&
              (isConnected && address ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Wallet className="mr-1 h-4 w-4" />
                      {address.substring(0, 4) + "..."}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {renderNavLinks(authLinks, true)}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => disconnect()}>Disconnect</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <ConnectWalletButton size="sm" />
              ))}

            <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  {isMenuOpen ? <XIcon /> : <MenuIcon />}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                {renderNavLinks(navLinks, true)}
                <DropdownMenuSeparator />
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    {theme === "dark" ? (
                      <>
                        <MoonIcon className="mr-2 h-4 w-4" /> Appearance
                      </>
                    ) : theme === "light" ? (
                      <>
                        <SunIcon className="mr-2 h-4 w-4" /> Appearance
                      </>
                    ) : (
                      <>
                        <LaptopIcon className="mr-2 h-4 w-4" /> Appearance
                      </>
                    )}
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem onClick={() => setTheme("light")}>
                        <SunIcon className="mr-2 h-4 w-4" /> Light
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setTheme("dark")}>
                        <MoonIcon className="mr-2 h-4 w-4" /> Dark
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setTheme("system")}>
                        <LaptopIcon className="mr-2 h-4 w-4" /> System
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}

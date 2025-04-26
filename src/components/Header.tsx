"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useTheme } from "@/lib/theme-provider";
import { useAccount, useDisconnect } from "wagmi";
import { MenuIcon, XIcon, MoonIcon, SunIcon, VoteIcon, ExternalLink, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConnectWalletButton } from "@/components/common/ConnectWalletButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { NavLink } from "@/types";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { toast } from "sonner";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();
  const [hasWallet, setHasWallet] = useState<boolean | null>(null);

  // Check for wallet existence when component mounts
  useEffect(() => {
    const checkWallet = () => {
      const hasEthereum = typeof window !== "undefined" && window.ethereum !== undefined;
      setHasWallet(hasEthereum);
    };

    checkWallet();
  }, []);

  const handleDisconnect = async () => {
    disconnect(
      {},
      {
        onSettled: () => {
          toast.warning("Disconnected, see you later!");
        },
      },
    );
  };

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

  const WalletSection = () => {
    if (isConnected && address) {
      return (
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
            <DropdownMenuItem onClick={handleDisconnect}>Disconnect</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }

    if (hasWallet === false) {
      return (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              onClick={() => window.open("https://metamask.io/download/", "_blank")}
              className="flex items-center gap-2"
            >
              Install Wallet <ExternalLink size={16} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>You need a Web3 wallet like MetaMask to use all features</TooltipContent>
        </Tooltip>
      );
    }

    return <ConnectWalletButton />;
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

            <WalletSection />
            <ThemeToggleButton />
          </div>

          {/* Mobile Nav Trigger */}
          <div className="md:hidden flex items-center gap-2">
            <WalletSection />
            <ThemeToggleButton />

            <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  {isMenuOpen ? <XIcon /> : <MenuIcon />}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                {renderNavLinks(navLinks, true)}
                {isConnected && (
                  <>
                    <DropdownMenuSeparator />
                    {renderNavLinks(authLinks, true)}
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}

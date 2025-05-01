import Link from "next/link";
import { MenuIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { NavLink } from "@/types";
import { MobileThemeSwitcher } from "./theme/MobileThemeSwitcher";

interface MobileNavigationProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  navLinks: NavLink[];
}

export function MobileNavigation({ isMenuOpen, setIsMenuOpen, navLinks }: MobileNavigationProps) {
  return (
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
        <DropdownMenuSeparator />
        <MobileThemeSwitcher />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

import Link from "next/link";
import { NavLink } from "@/types";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

interface DesktopNavigationProps {
  navLinks: NavLink[];
  pathname: string;
}

export function DesktopNavigation({ navLinks, pathname }: DesktopNavigationProps) {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {navLinks.map((link) => (
          <NavigationMenuItem key={link.href}>
            <NavigationMenuLink
              className={navigationMenuTriggerStyle()}
              active={pathname === link.href}
              asChild
            >
              <Link href={link.href}>{link.label}</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

import { useTheme } from "next-themes";
import { MoonIcon, SunIcon, LaptopIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeDropdownContent } from "./ThemeDropdownContent";

export function DesktopThemeSwitcher() {
  const { theme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost" aria-label="Toggle theme" className="ml-2">
          {theme === "dark" ? <MoonIcon /> : theme === "light" ? <SunIcon /> : <LaptopIcon />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <ThemeDropdownContent />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

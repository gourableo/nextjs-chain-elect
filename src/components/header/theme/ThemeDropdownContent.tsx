import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { MoonIcon, SunIcon, LaptopIcon } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeDropdownContent() {
  const { theme, setTheme } = useTheme();
  return (
    <>
      <DropdownMenuItem onClick={() => setTheme("light")} disabled={theme === "light"}>
        <SunIcon className="mr-2 h-4 w-4" /> Light
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => setTheme("dark")} disabled={theme === "dark"}>
        <MoonIcon className="mr-2 h-4 w-4" /> Dark
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => setTheme("system")} disabled={theme === "system"}>
        <LaptopIcon className="mr-2 h-4 w-4" /> System
      </DropdownMenuItem>
    </>
  );
}

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { MoonIcon, SunIcon, LaptopIcon } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeDropdownContent() {
  const { setTheme } = useTheme();
  return (
    <>
      <DropdownMenuItem onClick={() => setTheme("light")}>
        <SunIcon className="mr-2 h-4 w-4" /> Light
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => setTheme("dark")}>
        <MoonIcon className="mr-2 h-4 w-4" /> Dark
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => setTheme("system")}>
        <LaptopIcon className="mr-2 h-4 w-4" /> System
      </DropdownMenuItem>
    </>
  );
}

import {
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu";
import { MoonIcon, SunIcon, LaptopIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { ThemeDropdownContent } from "./ThemeDropdownContent";

export function MobileThemeSwitcher() {
  const { theme } = useTheme();

  return (
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
          <ThemeDropdownContent />
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
}

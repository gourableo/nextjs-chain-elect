import Link from "next/link";
import { useDisconnect } from "wagmi";
import { Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConnectWalletButton } from "@/components/common/ConnectWalletButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { NavLink } from "@/types";

interface WalletDisplayProps {
  isConnected: boolean;
  address: `0x${string}` | undefined;
  authLinks: NavLink[];
  isMobile?: boolean;
  className?: string;
}

export function WalletDisplay({
  isConnected,
  address,
  authLinks,
  isMobile = false,
  className = "",
}: WalletDisplayProps) {
  const { disconnect } = useDisconnect();

  if (!isConnected || !address) {
    return <ConnectWalletButton className={className} size={isMobile ? "sm" : undefined} />;
  }

  const displayAddress = isMobile
    ? `${address.substring(0, 4)}...`
    : `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size={isMobile ? "sm" : undefined} className={className}>
          <Wallet className={`${isMobile ? "mr-1" : "mr-2"} h-4 w-4`} />
          {displayAddress}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {authLinks.map((link) => (
          <DropdownMenuItem key={link.href} asChild>
            <Link href={link.href}>{link.label}</Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => disconnect()}>Disconnect</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

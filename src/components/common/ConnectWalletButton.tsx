"use client";
import { useEffect, useState } from "react";
import { useAccount, useConnect } from "wagmi";
import { injected } from "wagmi/connectors";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ExternalLinkIcon, WalletIcon } from "lucide-react";
import { VariantProps } from "class-variance-authority";
import { buttonVariants } from "@/components/ui/button";
import { BaseError } from "viem";

interface ConnectWalletButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  showInstallOption?: boolean;
  asChild?: boolean;
}

export function ConnectWalletButton({
  showInstallOption = true,
  variant = "default",
  size = "default",
  className,
  asChild = false,
  ...props
}: ConnectWalletButtonProps) {
  const { connectAsync } = useConnect();
  const { isConnected } = useAccount();
  const [hasWallet, setHasWallet] = useState<boolean | null>(null);

  // Check for wallet availability after component mounts
  useEffect(() => {
    const checkWallet = () => {
      const hasEthereum = typeof window !== "undefined" && window.ethereum !== undefined;
      setHasWallet(hasEthereum);
    };

    checkWallet();
  }, []);

  // Don't render if already connected
  if (isConnected) return null;

  // Handle wallet connection
  const handleConnect = () => {
    toast.promise(connectAsync({ connector: injected() }), {
      loading: "Waiting for wallet confirmation...",
      success: () => {
        console.log("Connected");
        return "Wallet connected! Now you can interact with the DApp.";
      },
      error: (err: BaseError) => {
        console.warn("Failed to connect: ", err);
        return err.shortMessage || "Failed to connect to wallet";
      },
    });
  };

  // Show install button when no wallet is detected
  if (hasWallet === false && showInstallOption) {
    return (
      <Button
        variant="outline"
        onClick={() => window.open("https://metamask.io/download/", "_blank")}
        className={className}
        size={size}
        asChild={asChild}
        {...props}
      >
        <ExternalLinkIcon className="mr-2" /> Install MetaMask
      </Button>
    );
  }

  return (
    <Button
      onClick={handleConnect}
      variant={variant}
      size={size}
      className={className}
      disabled={hasWallet === null} // Disable while checking
      asChild={asChild}
      {...props}
    >
      <WalletIcon className="mr-2" />
      {hasWallet === null ? "Checking wallet..." : "Connect Wallet"}
    </Button>
  );
}

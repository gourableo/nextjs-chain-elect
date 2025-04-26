"use client";
import { useEffect, useState } from "react";
import { useAccount, useConnect } from "wagmi";
import { injected } from "wagmi/connectors";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ExternalLink } from "lucide-react";
import { BaseError } from "viem";

export function ConnectWalletButton() {
  const { connectAsync } = useConnect();
  const { isConnected } = useAccount();
  const [hasWallet, setHasWallet] = useState<boolean | null>(null);

  // Check for wallet availability after component mounts
  useEffect(() => {
    const checkWallet = async () => {
      // Check if window.ethereum exists (MetaMask or compatible provider)
      const hasEthereum = typeof window !== "undefined" && window.ethereum !== undefined;
      setHasWallet(hasEthereum);
    };

    checkWallet();
  }, []);

  // Don't render if already connected
  if (isConnected) return null;

  // Handle wallet connection
  const handleConnect = async () => {
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

  // Show appropriate button based on wallet availability
  if (hasWallet === false) {
    return (
      <Button
        variant="outline"
        onClick={() => window.open("https://metamask.io/download/", "_blank")}
        className="flex items-center gap-2"
      >
        Install MetaMask <ExternalLink size={16} />
      </Button>
    );
  }

  return (
    <Button
      onClick={handleConnect}
      variant="default"
      disabled={hasWallet === null} // Disable while checking
    >
      {hasWallet === null ? "Checking wallet..." : "Connect Wallet"}
    </Button>
  );
}

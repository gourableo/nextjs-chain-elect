"use client";
import { BaseError, useAccount, useSwitchChain } from "wagmi";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { AlertTriangleIcon } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";
import { sepolia } from "viem/chains";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isConnected, chain } = useAccount();
  const { switchChainAsync } = useSwitchChain();

  const [hasWallet, setHasWallet] = useState<boolean | null>(null);
  const [isClientSide, setIsClientSide] = useState(false);

  useEffect(() => {
    // Check if MetaMask or other wallet is available
    const checkWallet = () => {
      const hasEthereum = typeof window !== "undefined" && window.ethereum !== undefined;
      setHasWallet(hasEthereum);
    };

    setIsClientSide(true);
    checkWallet();
  }, []);

  // Wait for client-side hydration
  if (!isClientSide) return null;

  // Check if wallet is connected to Sepolia network
  const isWrongNetwork = isConnected && chain?.id !== sepolia.id;

  const handleSwitchNetwork = async () => {
    if (!isConnected) return;

    toast.promise(
      switchChainAsync({
        chainId: sepolia.id,
      }),
      {
        loading: "Waiting for wallet confirmation...",
        success: "Successfully switched to Sepolia Network",
        error: (err: unknown) => {
          const typedError = err as BaseError;
          return typedError.shortMessage || "Failed to switch to Sepolia Network";
        },
      },
    );
  };

  if (!isConnected || isWrongNetwork) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Authentication Required</CardTitle>
            <CardDescription>
              {!isConnected
                ? hasWallet === false
                  ? "You need a Web3 wallet to access this page"
                  : "Connect your wallet from the header to access this page"
                : "Please switch to the Sepolia network to access this page"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!isConnected ? (
              hasWallet === false ? (
                <Alert>
                  <AlertTriangleIcon className="h-4 w-4" />
                  <AlertDescription>
                    You need to install a Web3 wallet like MetaMask first
                  </AlertDescription>
                </Alert>
              ) : null
            ) : null}

            {isWrongNetwork ? (
              <>
                <Alert variant="destructive">
                  <AlertTriangleIcon className="h-4 w-4" />
                  <AlertDescription>
                    You are connected to {chain?.name || "an unsupported network"}. Please switch
                    to Sepolia Test Network.
                  </AlertDescription>
                </Alert>
                <div className="flex justify-center mt-4">
                  <Button onClick={handleSwitchNetwork} className="bg-primary hover:bg-primary/90">
                    Switch to Sepolia
                  </Button>
                </div>
              </>
            ) : null}
          </CardContent>
          <CardFooter className="flex justify-center border-t pt-4">
            <Link href="/" className="text-sm text-muted-foreground hover:underline">
              Return to Home
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
}

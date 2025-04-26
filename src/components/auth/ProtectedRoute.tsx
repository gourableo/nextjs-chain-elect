"use client";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { ConnectWalletButton } from "@/components/common/ConnectWalletButton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ExternalLink, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isConnected } = useAccount();
  const [hasWallet, setHasWallet] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if MetaMask or other wallet is available
    const checkWallet = () => {
      const hasEthereum = typeof window !== "undefined" && window.ethereum !== undefined;
      setHasWallet(hasEthereum);
    };

    checkWallet();
  }, []);

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Authentication Required</CardTitle>
            <CardDescription>Connect your wallet to access this page</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {hasWallet === false ? (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  You need a Web3 wallet like MetaMask to use this feature
                </AlertDescription>
              </Alert>
            ) : (
              <p className="text-sm text-muted-foreground">
                Click the button below to connect your wallet and access this page
              </p>
            )}

            <div className="flex justify-center">
              {hasWallet === false ? (
                <Button
                  variant="outline"
                  onClick={() => window.open("https://metamask.io/download/", "_blank")}
                  className="flex items-center gap-2"
                >
                  Install MetaMask <ExternalLink size={16} />
                </Button>
              ) : (
                <ConnectWalletButton />
              )}
            </div>
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

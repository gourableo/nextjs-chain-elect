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
import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isConnected } = useAccount();
  const [hasWallet, setHasWallet] = useState<boolean | null>(null);
  const [isClientSide, setIsClientSide] = useState(false);

  useEffect(() => {
    // Check if MetaMask or other wallet is available
    const checkWallet = () => {
      const hasEthereum = typeof window !== "undefined" && window.ethereum !== undefined;
      setHasWallet(hasEthereum);
    };

    checkWallet();
    setIsClientSide(true);
  }, []);

  // Wait for client-side hydration
  if (!isClientSide) return null;

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Authentication Required</CardTitle>
            <CardDescription>
              {hasWallet === false
                ? "You need a Web3 wallet to access this page"
                : "Connect your wallet from the header to access this page"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {hasWallet === false && (
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  You need to install a Web3 wallet like MetaMask first
                </AlertDescription>
              </Alert>
            )}
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

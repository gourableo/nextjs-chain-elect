"use client";

import { useVoterContract } from "@/hooks/useVoterContract";
import { VoterRegistrationForm } from "./VoterRegistrationForm";
import { VoterUpdateForm } from "./VoterUpdateForm";
import { WalletConnect } from "./WalletConnect";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useEffect } from "react";

export function Dashboard() {
  const { isConnected, isRegistered, refetchRegistrationStatus } = useVoterContract();

  // Refresh registration status when the component mounts
  useEffect(() => {
    if (isConnected) {
      refetchRegistrationStatus();
    }
  }, [isConnected]);

  if (!isConnected) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
        <WalletConnect />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="container mx-auto max-w-4xl">
        <header className="mb-8 text-center">
          <h1 className="text-2xl font-bold mb-2">Decentralized Voting System</h1>
          <p className="text-gray-600">
            Securely manage your voter registration and participate in elections
          </p>
        </header>

        <div className="mb-6">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Wallet Connected</AlertTitle>
            <AlertDescription>
              Your MetaMask wallet is connected.
              {isRegistered
                ? " You are registered as a voter."
                : " Please register to participate in elections."}
            </AlertDescription>
          </Alert>
        </div>

        <div className="flex justify-center">
          {isRegistered ? <VoterUpdateForm /> : <VoterRegistrationForm />}
        </div>
      </div>
    </div>
  );
}

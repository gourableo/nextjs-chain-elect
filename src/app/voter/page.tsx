"use client";

import { useEffect, useState } from "react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { VoterRegistrationForm } from "@/components/voter/VoterRegistrationForm";
import { VoterUpdateForm } from "@/components/voter/VoterUpdateForm";
import { useVoterContract } from "@/hooks/useVoterContract";

export default function VoterDashboard() {
  const { isRegistered, refetchRegistrationStatus } = useVoterContract();
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  // Set page as loaded after initial render to avoid hydration issues
  useEffect(() => {
    setIsPageLoaded(true);
  }, []);

  // Avoid rendering until after client-side hydration
  if (!isPageLoaded) {
    return null;
  }

  return (
    <ProtectedRoute>
      <div className="flex flex-col items-center">
        <div className="w-full max-w-4xl mb-8">
          <h1 className="text-3xl font-bold mb-4 text-center">Voter Dashboard</h1>
          <p className="text-center text-muted-foreground mb-8">
            Securely manage your voter registration and participate in elections
          </p>

          <div className="mb-6">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Wallet Connected</AlertTitle>
              <AlertDescription>
                Your wallet is connected.
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
    </ProtectedRoute>
  );
}

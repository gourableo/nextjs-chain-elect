"use client";

import { PageHeader } from "@/components/common/PageHeader";
import { VoterRegistrationForm } from "@/components/voter/VoterRegistrationForm";
import { VoterDashboard } from "@/components/voter/VoterDashboard";
import { useGetMyRegistrationStatus } from "@/hooks/useVoterDatabase";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { useEffect, useState } from "react";

export default function VoterPage() {
  const { isRegistered: initialRegStatus, isLoading: initialLoading } =
    useGetMyRegistrationStatus();
  const [isRegistered, setIsRegistered] = useState<boolean | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  // Set initial registration status
  useEffect(() => {
    if (!initialLoading) {
      setIsRegistered(initialRegStatus);
      setIsLoading(false);
    }
  }, [initialRegStatus, initialLoading]);

  // Handle registration status changes
  const handleRegistrationStatusChange = (newStatus: boolean) => {
    setIsRegistered(newStatus);
  };

  return (
    <div className="container max-w-4xl py-8">
      <PageHeader
        title="Voter Portal"
        description="Register as a voter or manage your voter information"
      />

      {isLoading ? (
        <LoadingSpinner message="Checking your registration status..." />
      ) : isRegistered ? (
        <VoterDashboard onRegistrationStatusChangeAction={handleRegistrationStatusChange} />
      ) : (
        <VoterRegistrationForm
          onRegistrationSuccessAction={() => handleRegistrationStatusChange(true)}
        />
      )}
    </div>
  );
}

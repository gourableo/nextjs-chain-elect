"use client";

import { PageHeader } from "@/components/common/PageHeader";
import { VoterRegistrationForm } from "@/components/voter/VoterRegistrationForm";
import { VoterDashboard } from "@/components/voter/VoterDashboard";
import { useGetMyRegistrationStatus } from "@/hooks/useVoterDatabase";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { useEffect } from "react";

export default function VoterPage() {
  const { isRegistered, isLoading, refetch } = useGetMyRegistrationStatus();

  // Periodically check registration status to catch any changes
  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 10000); // Refetch every 10 seconds

    return () => clearInterval(interval);
  }, [refetch]);

  return (
    <div className="container max-w-4xl py-8">
      <PageHeader
        title="Voter Portal"
        description="Register as a voter or manage your voter information"
      />

      {isLoading ? (
        <LoadingSpinner message="Checking your registration status..." />
      ) : isRegistered ? (
        <VoterDashboard />
      ) : (
        <VoterRegistrationForm />
      )}
    </div>
  );
}

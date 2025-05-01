"use client";

import { PageHeader } from "@/components/common/PageHeader";
import { CandidateRegistrationForm } from "@/components/candidate/CandidateRegistrationForm";
import { CandidateDashboard } from "@/components/candidate/CandidateDashboard";
import { useGetMyRegistrationStatus } from "@/hooks/useCandidateDatabase";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { useEffect, useState } from "react";

export default function CandidatePage() {
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
        title="Candidate Portal"
        description="Register as a candidate or manage your candidacy information"
      />

      {isLoading ? (
        <LoadingSpinner message="Checking your registration status..." />
      ) : isRegistered ? (
        <CandidateDashboard onRegistrationStatusChangeAction={handleRegistrationStatusChange} />
      ) : (
        <CandidateRegistrationForm
          onRegistrationSuccessAction={() => handleRegistrationStatusChange(true)}
        />
      )}
    </div>
  );
}

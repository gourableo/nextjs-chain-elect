"use client";

import { useEffect } from "react";
import { useGetMyDetails, useGetMyRegistrationStatus } from "@/hooks/useCandidateDatabase";
import { CandidateInformation } from "@/components/candidate/CandidateInformation";
import { CandidateActions } from "@/components/candidate/CandidateActions";
import { Card, CardContent } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

export function CandidateDashboard({
  onRegistrationStatusChangeAction,
}: {
  onRegistrationStatusChangeAction: (status: boolean) => void;
}) {
  const { candidateDetails, isLoading, isError, refetch } = useGetMyDetails();
  const { refetch: refetchRegistrationStatus } = useGetMyRegistrationStatus();

  // Function to handle successful updates
  const handleUpdateAction = async () => {
    // Refetch candidate details
    refetch();

    // Check registration status and notify parent if changed
    const registrationResult = await refetchRegistrationStatus();
    if (registrationResult.data === false) {
      onRegistrationStatusChangeAction(false);
    }
  };

  useEffect(() => {
    // Set up an interval to periodically refetch data (less frequently)
    const interval = setInterval(() => {
      refetch();
    }, 30000); // Reduced to every 30 seconds to be less aggressive

    return () => clearInterval(interval);
  }, [refetch]);

  if (isLoading) {
    return <LoadingSpinner message="Loading your candidate information..." />;
  }

  if (isError || !candidateDetails) {
    return (
      <Alert variant="destructive" className="mb-6">
        <InfoIcon className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Failed to load your candidate information. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      {candidateDetails.status === false && (
        <Alert className="mb-6">
          <InfoIcon className="h-4 w-4" />
          <AlertTitle>Your candidacy is inactive</AlertTitle>
          <AlertDescription>
            Your candidacy is currently inactive and won&apos;t be visible to voters.
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardContent className="p-6">
          <CandidateInformation candidateDetails={candidateDetails} />
        </CardContent>
      </Card>

      <CandidateActions candidateDetails={candidateDetails} onUpdateAction={handleUpdateAction} />
    </div>
  );
}

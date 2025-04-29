"use client";

import { useGetMyDetails } from "@/hooks/useVoterDatabase";
import { VoterInformation } from "@/components/voter/VoterInformation";
import { VoterActions } from "@/components/voter/VoterActions";
import { Card, CardContent } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

export function VoterDashboard() {
  const { voterDetails, isLoading, isError, refetch } = useGetMyDetails();

  if (isLoading) {
    return <LoadingSpinner message="Loading your voter information..." />;
  }

  if (isError || !voterDetails) {
    return (
      <Alert variant="destructive" className="mb-6">
        <InfoIcon className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Failed to load your voter information. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      {voterDetails.hasVoted && (
        <Alert className="mb-6">
          <InfoIcon className="h-4 w-4" />
          <AlertTitle>You have already voted</AlertTitle>
          <AlertDescription>Your vote has been recorded in the election.</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardContent className="p-6">
          <VoterInformation voterDetails={voterDetails} />
        </CardContent>
      </Card>

      <VoterActions voterDetails={voterDetails} onUpdate={refetch} />
    </div>
  );
}

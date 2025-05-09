"use client";

import { useEffect, useState } from "react";
import { useGetMyDetails, useGetMyRegistrationStatus } from "@/hooks/useVoterDatabase";
import { VoterInformation } from "@/components/voter/VoterInformation";
import { VoterActions } from "@/components/voter/VoterActions";
import { Card, CardContent } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function VoterDashboard({
  onRegistrationStatusChangeAction,
}: {
  onRegistrationStatusChangeAction: (status: boolean) => void;
}) {
  const { voterDetails, isLoading, isError, refetch } = useGetMyDetails();
  const { refetch: refetchRegistrationStatus } = useGetMyRegistrationStatus();
  const [activeTab, setActiveTab] = useState("information");

  // Function to handle successful updates
  const handleUpdateAction = async () => {
    // Refetch voter details
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

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="information">Information</TabsTrigger>
          <TabsTrigger value="actions">Actions</TabsTrigger>
        </TabsList>

        <TabsContent value="information">
          <Card>
            <CardContent className="p-6">
              <VoterInformation voterDetails={voterDetails} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="actions">
          <VoterActions voterDetails={voterDetails} onUpdateAction={handleUpdateAction} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

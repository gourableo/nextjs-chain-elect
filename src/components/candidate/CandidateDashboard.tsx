"use client";

import { useEffect } from "react";
import {
  useGetMyCandidateDetails,
  useGetMyRegistrationStatus,
} from "@/hooks/useCandidateDatabase";
import { CandidateInformation } from "@/components/candidate/CandidateInformation";
import { CandidateActions } from "@/components/candidate/CandidateActions";
import { Card, CardContent } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function CandidateDashboard({
  onRegistrationStatusChangeAction,
}: {
  onRegistrationStatusChangeAction: (status: boolean) => void;
}) {
  const { candidateDetails, isLoading, isError, refetch } = useGetMyCandidateDetails();
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
    // Set up an interval to periodically refetch data
    const interval = setInterval(() => {
      refetch();
    }, 30000); // Every 30 seconds

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
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid grid-cols-3">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="manifesto">Manifesto</TabsTrigger>
          <TabsTrigger value="actions">Actions</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardContent className="p-6">
              <CandidateInformation 
                candidateDetails={candidateDetails}
                view="full"
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="manifesto">
          <Card>
            <CardContent className="p-6">
              <CandidateInformation 
                candidateDetails={candidateDetails}
                view="manifesto"
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="actions">
          <CandidateActions candidateDetails={candidateDetails} onUpdateAction={handleUpdateAction} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

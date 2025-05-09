import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";
import { VoterRegistrationForm } from "../forms/VoterRegistrationForm";

interface VoterRegistrationProps {
  onRegistrationSuccess: () => void;
}

export function VoterRegistration({ onRegistrationSuccess }: VoterRegistrationProps) {
  return (
    <div className="space-y-6">
      <Alert variant="default" className="mb-6">
        <InfoIcon className="h-4 w-4" />
        <AlertTitle>Important Information</AlertTitle>
        <AlertDescription>
          By registering as a voter, you are confirming your eligibility to participate in the election.
          Your information will be securely stored on the blockchain.
        </AlertDescription>
      </Alert>

      <Card className="w-full">
        <CardHeader>
          <CardDescription className="text-base">
            Complete all required fields below to register for the election.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <VoterRegistrationForm onRegistrationSuccessAction={onRegistrationSuccess} />
        </CardContent>
      </Card>
    </div>
  );
}
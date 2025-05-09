import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";
import { CandidateRegistrationForm } from "../forms/CandidateRegistrationForm";

interface CandidateRegistrationProps {
  onRegistrationSuccess: () => void;
}

export function CandidateRegistration({ onRegistrationSuccess }: CandidateRegistrationProps) {
  return (
    <div className="space-y-6">
      <Alert variant="default" className="mb-6">
        <InfoIcon className="h-4 w-4" />
        <AlertTitle>Important Information</AlertTitle>
        <AlertDescription>
          By registering as a candidate, you are agreeing to have your information publicly
          displayed on the blockchain. Make sure all details are accurate as they will be visible
          to voters.
        </AlertDescription>
      </Alert>

      <Card className="w-full">
        <CardHeader>
          <CardDescription className="text-base">
            Complete all required fields below. Your profile will be reviewed before final
            approval.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CandidateRegistrationForm onRegistrationSuccessAction={onRegistrationSuccess} />
        </CardContent>
      </Card>
    </div>
  );
}

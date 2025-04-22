"use client";

import { useEffect, useState } from "react";
import { useVoterContract } from "@/hooks/useVoterContract";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function VoterUpdateForm() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const { voterDetails, updateVoterInfo, isUpdating, refetchVoterData } = useVoterContract();

  useEffect(() => {
    if (voterDetails) {
      setName(voterDetails.name);
      setAge(voterDetails.age.toString());
    }
  }, [voterDetails]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Validation
    if (!name.trim()) {
      setError("Name is required");
      return;
    }

    const ageNumber = parseInt(age);
    if (isNaN(ageNumber) || ageNumber < 18) {
      setError("Age must be at least 18");
      return;
    }

    // Update voter information
    try {
      updateVoterInfo(name.trim(), ageNumber);
      setSuccess("Your information has been updated successfully");

      // Refetch data after a successful update
      setTimeout(() => {
        refetchVoterData();
      }, 2000);
    } catch (err) {
      setError("Failed to update. Please try again.");
      console.error(err);
    }
  };

  if (!voterDetails) {
    return (
      <Card className="w-full max-w-md">
        <CardContent className="py-4">
          <div className="flex justify-center items-center h-24">
            <Loader2 className="h-6 w-6 animate-spin mr-2" />
            <p className="text-muted-foreground">Loading voter details...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Update Voter Information</CardTitle>
          {voterDetails.hasVoted && <Badge variant="secondary">Voted</Badge>}
        </div>
        <CardDescription>Update your voter registration information</CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="mb-4 border-green-200 text-green-800 dark:border-green-800 dark:text-green-300 bg-green-50 dark:bg-green-950/30">
            <CheckCircle className="h-4 w-4" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        {voterDetails.hasVoted ? (
          <Alert className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Cannot Update</AlertTitle>
            <AlertDescription>
              You have already voted in this election. Your information cannot be updated now.
            </AlertDescription>
          </Alert>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                disabled={isUpdating || voterDetails.hasVoted}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Enter your age"
                min="18"
                disabled={isUpdating || voterDetails.hasVoted}
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isUpdating || voterDetails.hasVoted}
            >
              {isUpdating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Information"
              )}
            </Button>
          </form>
        )}
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground">
        <p>
          {voterDetails.hasVoted
            ? "Once you have voted, your information cannot be updated for this election."
            : "You can update your information until you cast your vote."}
        </p>
      </CardFooter>
    </Card>
  );
}

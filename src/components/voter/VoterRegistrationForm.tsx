"use client";

import { useState } from "react";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useAddVoter, Gender } from "@/hooks/useVoterDatabase";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";

export function VoterRegistrationForm() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState<Gender>(0);
  const [address, setAddress] = useState("");

  const { addVoter, isPending, isConfirming } = useAddVoter();

  const isLoading = isPending || isConfirming;
  const isFormValid = name.trim() && age && address.trim();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      await addVoter({
        name: name.trim(),
        age: parseInt(age),
        gender,
        presentAddress: address.trim(),
      });

      toast.success("Registration submitted successfully");
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Register as a Voter</CardTitle>
        <CardDescription>
          Complete this form to register yourself as a voter in the election.
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="Your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              type="number"
              min="18"
              placeholder="Your age (must be 18+)"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Gender</Label>
            <RadioGroup
              value={gender.toString()}
              onValueChange={(value) => setGender(parseInt(value) as Gender)}
              disabled={isLoading}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="0" id="male" />
                <Label htmlFor="male">Male</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="1" id="female" />
                <Label htmlFor="female">Female</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Present Address</Label>
            <Textarea
              id="address"
              placeholder="Your current address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              disabled={isLoading}
              required
              rows={3}
            />
          </div>
        </CardContent>

        <CardFooter>
          <Button type="submit" className="w-full" disabled={isLoading || !isFormValid}>
            {isLoading && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? "Processing..." : "Register as Voter"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

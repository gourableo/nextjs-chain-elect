import { useState, useEffect } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { useAddVoter, Gender } from "@/hooks/useVoterDatabase";
import { Loader2Icon } from "lucide-react";
import { useForm } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { VoterFormSchema, VoterFormValues } from "@/lib/schemas/voter-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function VoterRegistrationForm({
  onRegistrationSuccessAction,
}: {
  onRegistrationSuccessAction: () => void;
}) {
  const { addVoter, isPending, isConfirming, isConfirmed } = useAddVoter();
  const isLoading = isPending || isConfirming;

  // Define the form
  const form = useForm<VoterFormValues>({
    resolver: valibotResolver(VoterFormSchema),
    defaultValues: {
      name: "",
      age: "",
      gender: 0,
      presentAddress: "",
    },
    mode: "onBlur",
  });

  // Listen for confirmation
  useEffect(() => {
    if (isConfirmed) {
      onRegistrationSuccessAction(); // Notify parent component of successful registration
    }
  }, [isConfirmed, onRegistrationSuccessAction]);

  async function onSubmit(values: VoterFormValues) {
    await addVoter({
      name: values.name,
      age: Number(values.age),
      gender: values.gender as Gender,
      presentAddress: values.presentAddress,
    });
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Register as a Voter</CardTitle>
        <CardDescription>
          Complete this form to register yourself as a voter in the election.
        </CardDescription>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your full name" {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Your age (must be 18+)"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <FormControl>
                    <RadioGroup
                      value={field.value.toString()}
                      onValueChange={(value) => field.onChange(parseInt(value))}
                      className="flex gap-4"
                      disabled={isLoading}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="0" id="male" />
                        <FormLabel htmlFor="male" className="cursor-pointer">
                          Male
                        </FormLabel>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="1" id="female" />
                        <FormLabel htmlFor="female" className="cursor-pointer">
                          Female
                        </FormLabel>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="presentAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Present Address</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Your current address"
                      {...field}
                      disabled={isLoading}
                      rows={3}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>

          <CardFooter>
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading || !form.formState.isValid}
            >
              {isLoading && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
              {isPending ? "Submitting..." : isConfirming ? "Confirming..." : "Register as Voter"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}

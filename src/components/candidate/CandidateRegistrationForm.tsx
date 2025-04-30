import { useEffect } from "react";
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
import { useAddCandidate } from "@/hooks/useCandidateDatabase";
import { Loader2Icon } from "lucide-react";
import { useForm } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { CandidateFormSchema, CandidateFormValues } from "@/lib/schemas/candidate-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export function CandidateRegistrationForm({
  onRegistrationSuccessAction,
}: {
  onRegistrationSuccessAction: () => void;
}) {
  const { addCandidate, isPending, isConfirming, isConfirmed } = useAddCandidate();
  const isLoading = isPending || isConfirming;

  // Define the form
  const form = useForm<CandidateFormValues>({
    resolver: valibotResolver(CandidateFormSchema),
    defaultValues: {
      name: "",
      age: undefined,
      email: "",
      qualifications: "",
      manifesto: "",
    },
    mode: "onBlur",
  });

  // Listen for confirmation
  useEffect(() => {
    if (isConfirmed) {
      onRegistrationSuccessAction(); // Notify parent component of successful registration
    }
  }, [isConfirmed, onRegistrationSuccessAction]);

  async function onSubmit(values: CandidateFormValues) {
    await addCandidate({
      name: values.name,
      age: values.age,
      email: values.email,
      qualifications: values.qualifications,
      manifesto: values.manifesto,
    });
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Register as a Candidate</CardTitle>
        <CardDescription>
          Complete this form to register yourself as a candidate in the election.
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
                      min="18"
                      step="1"
                      onKeyDown={(e) => {
                        // Block decimal point (.) input
                        if (e.key === "." || e.key === ",") {
                          e.preventDefault();
                        }
                      }}
                      value={field.value || ""}
                      onChange={(e) => {
                        // Convert to integer by dropping any decimals
                        const value = parseInt(e.target.value);
                        field.onChange(isNaN(value) ? undefined : value);
                      }}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Your email" {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="qualifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Qualifications</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Your educational and professional qualifications"
                      {...field}
                      disabled={isLoading}
                      rows={3}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="manifesto"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Manifesto</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Your election manifesto and plans"
                      {...field}
                      disabled={isLoading}
                      rows={5}
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
              {isPending
                ? "Submitting..."
                : isConfirming
                  ? "Confirming..."
                  : "Register as Candidate"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}

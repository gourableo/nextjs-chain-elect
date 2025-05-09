import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useDeleteCandidate, useUpdateCandidate } from "@/hooks/useCandidateDatabase";
import { Loader2Icon, PencilIcon, Trash2Icon } from "lucide-react";
import { useForm } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import {
  CandidateFormSchema,
  CandidateFormValues,
  candidateFormToContractParams,
  contractDataToCandidateForm,
} from "@/lib/schemas/candidate-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FormDatePickerControl } from "@/components/ui/custom/form-date-picker";
import { CandidateDetails } from "@/types";

export function CandidateActions({
  candidateDetails,
  onUpdateAction,
}: {
  candidateDetails: CandidateDetails;
  onUpdateAction: () => void;
}) {
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);

  const {
    deleteCandidate,
    isPending: isDeleting,
    isConfirming: isDeletionConfirming,
    isConfirmed: isDeletionConfirmed,
  } = useDeleteCandidate();
  const isDeleteProcessing = isDeleting || isDeletionConfirming;

  // Listen for confirmation of deletion
  useEffect(() => {
    if (isDeletionConfirmed) {
      onUpdateAction(); // Just call the update function, don't refresh the router here
    }
  }, [isDeletionConfirmed, onUpdateAction]);

  const handleDelete = async () => {
    await deleteCandidate();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Manage Your Candidacy</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 sm:flex-row">
          <Button
            variant="outline"
            onClick={() => setShowUpdateDialog(true)}
            className="flex items-center"
          >
            <PencilIcon className="mr-2 h-4 w-4" /> Update Information
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" disabled={isDeleteProcessing}>
                {isDeleteProcessing ? (
                  <>
                    <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                    {isDeletionConfirming ? "Confirming..." : "Processing..."}
                  </>
                ) : (
                  <>
                    <Trash2Icon className="mr-2 h-4 w-4" /> Cancel Candidacy
                  </>
                )}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action will cancel your candidacy. You will need to register again if you
                  want to run as a candidate in the future.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>No, keep my candidacy</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  className="bg-destructive text-destructive-foreground"
                >
                  Yes, cancel candidacy
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>

      {showUpdateDialog && (
        <UpdateCandidateDialog
          candidateDetails={candidateDetails}
          onClose={() => setShowUpdateDialog(false)}
          onUpdateAction={onUpdateAction}
        />
      )}
    </div>
  );
}

function UpdateCandidateDialog({
  candidateDetails,
  onClose,
  onUpdateAction,
}: {
  candidateDetails: CandidateDetails;
  onClose: () => void;
  onUpdateAction: () => void;
}) {
  const { updateCandidate, isPending, isConfirming, isConfirmed } = useUpdateCandidate();
  const isProcessing = isPending || isConfirming;

  // Define the form
  const form = useForm<CandidateFormValues>({
    resolver: valibotResolver(CandidateFormSchema),
    defaultValues: contractDataToCandidateForm(candidateDetails),
    mode: "onBlur",
  });

  // Listen for confirmation
  useEffect(() => {
    if (isConfirmed) {
      onUpdateAction();
      onClose(); // Close the dialog after confirmation
    }
  }, [isConfirmed, onUpdateAction, onClose]);

  async function onSubmit(values: CandidateFormValues) {
    await updateCandidate(candidateFormToContractParams(values));
  }

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Update Candidate Information</DialogTitle>
          <DialogDescription>Make changes to your candidacy information below.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isProcessing} />
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
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} disabled={isProcessing} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormDatePickerControl
              control={form.control}
              name="dateOfBirth"
              label="Date of Birth"
              placeholder="Select your date of birth"
              disabled={isProcessing}
              required={true}
              isDateOfBirth={true}
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
                      disabled={isProcessing}
                      className="flex gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="0" id="update-male" />
                        <FormLabel htmlFor="update-male" className="cursor-pointer">
                          Male
                        </FormLabel>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="1" id="update-female" />
                        <FormLabel htmlFor="update-female" className="cursor-pointer">
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
                    <Textarea {...field} disabled={isProcessing} rows={2} />
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
                    <Textarea {...field} disabled={isProcessing} rows={3} />
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
                    <Textarea {...field} disabled={isProcessing} rows={4} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={onClose} disabled={isProcessing}>
                Cancel
              </Button>
              <Button type="submit" disabled={isProcessing}>
                {isProcessing && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
                {isPending ? "Submitting..." : isConfirming ? "Confirming..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

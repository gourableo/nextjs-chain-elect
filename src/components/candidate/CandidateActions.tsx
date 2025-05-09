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
import { useDeleteCandidate } from "@/hooks/useCandidateDatabase";
import { Loader2Icon, PencilIcon, Trash2Icon } from "lucide-react";
import { CandidateDetails } from "@/types";
import { CandidateUpdationForm } from "./CandidateUpdationForm";

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
  const handleSuccess = () => {
    onUpdateAction();
    onClose(); // Close the dialog after confirmation
  };

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Update Candidate Information</DialogTitle>
          <DialogDescription>Make changes to your candidacy information below.</DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <CandidateUpdationForm candidateDetails={candidateDetails} onSuccess={handleSuccess} />
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

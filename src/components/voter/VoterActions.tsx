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
import { useDeleteVoter } from "@/hooks/useVoterDatabase";
import { Loader2Icon, PencilIcon, Trash2Icon } from "lucide-react";
import { VoterDetails } from "@/types";
import { VoterUpdationForm } from "./VoterUpdationForm";

export function VoterActions({
  voterDetails,
  onUpdateAction,
}: {
  voterDetails: VoterDetails;
  onUpdateAction: () => void;
}) {
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);

  const {
    deleteVoter,
    isPending: isDeleting,
    isConfirming: isDeletionConfirming,
    isConfirmed: isDeletionConfirmed,
  } = useDeleteVoter();
  const isDeleteProcessing = isDeleting || isDeletionConfirming;

  // Listen for confirmation of deletion
  useEffect(() => {
    if (isDeletionConfirmed) {
      onUpdateAction(); // Just call the update function, don't refresh the router here
    }
  }, [isDeletionConfirmed, onUpdateAction]);

  const handleDelete = async () => {
    await deleteVoter();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Manage Your Voter Registration</CardTitle>
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
                    <Trash2Icon className="mr-2 h-4 w-4" /> Cancel Registration
                  </>
                )}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action will cancel your voter registration. You will need to register again
                  if you want to vote in the future.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>No, keep my registration</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  className="bg-destructive text-destructive-foreground"
                >
                  Yes, cancel registration
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>

      {showUpdateDialog && (
        <UpdateVoterDialog
          voterDetails={voterDetails}
          onClose={() => setShowUpdateDialog(false)}
          onUpdateAction={onUpdateAction}
        />
      )}
    </div>
  );
}

function UpdateVoterDialog({
  voterDetails,
  onClose,
  onUpdateAction,
}: {
  voterDetails: VoterDetails;
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
          <DialogTitle>Update Voter Information</DialogTitle>
          <DialogDescription>Make changes to your voter information below.</DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <VoterUpdationForm voterDetails={voterDetails} onSuccess={handleSuccess} />
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

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
import { Label } from "@/components/ui/label";
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
import { Gender, VoterDetails, useDeleteVoter, useUpdateVoter } from "@/hooks/useVoterDatabase";
import { Loader2Icon, PencilIcon, Trash2Icon } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function VoterActions({
  voterDetails,
  onUpdateAction,
}: {
  voterDetails: VoterDetails;
  onUpdateAction: () => void;
}) {
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const router = useRouter();

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
      onUpdateAction();
      router.refresh();
    }
  }, [isDeletionConfirmed, onUpdateAction, router]);

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
  const [name, setName] = useState(voterDetails.name);
  const [age, setAge] = useState(voterDetails.age.toString());
  const [gender, setGender] = useState<Gender>(voterDetails.gender);
  const [address, setAddress] = useState(voterDetails.presentAddress);

  const { updateVoter, isPending, isConfirming, isConfirmed } = useUpdateVoter();
  const isProcessing = isPending || isConfirming;

  // Listen for confirmation
  useEffect(() => {
    if (isConfirmed) {
      onUpdateAction();
      onClose(); // Close the dialog after confirmation
    }
  }, [isConfirmed, onUpdateAction, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !age || !address.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    await updateVoter({
      name: name.trim(),
      age: parseInt(age),
      gender,
      presentAddress: address.trim(),
    });
  };

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Update Voter Information</DialogTitle>
            <DialogDescription>Make changes to your voter information below.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="update-name">Full Name</Label>
              <Input
                id="update-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isProcessing}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="update-age">Age</Label>
              <Input
                id="update-age"
                type="number"
                min="18"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                disabled={isProcessing}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Gender</Label>
              <RadioGroup
                value={gender.toString()}
                onValueChange={(value) => setGender(parseInt(value) as Gender)}
                disabled={isProcessing}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="0" id="update-male" />
                  <Label htmlFor="update-male">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1" id="update-female" />
                  <Label htmlFor="update-female">Female</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="update-address">Present Address</Label>
              <Textarea
                id="update-address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                disabled={isProcessing}
                required
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={isProcessing}>
              Cancel
            </Button>
            <Button type="submit" disabled={isProcessing}>
              {isProcessing && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
              {isPending ? "Submitting..." : isConfirming ? "Confirming..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

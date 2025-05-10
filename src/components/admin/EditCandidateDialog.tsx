"use client";

import { useAdminUpdateCandidate } from "@/hooks/useCandidateDatabase";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { CandidateFormSchema } from "@/lib/schemas/candidate-form";

export function EditCandidateDialog({
  candidate,
}: {
  candidate: { address: string; name?: string; qualifications?: string };
}) {
  const { adminUpdateCandidate, isPending } = useAdminUpdateCandidate();
  const { register, handleSubmit, reset } = useForm({
    resolver: valibotResolver(CandidateFormSchema),
    defaultValues: {
      name: candidate.name || "",
      qualifications: candidate.qualifications || "",
    },
  });

  const onSubmit = async (data: { name: string; qualifications: string }) => {
    await adminUpdateCandidate(candidate.address, {
      name: data.name,
      qualifications: data.qualifications,
    });
    reset(data); // Reset the form with updated values
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <PencilIcon className="mr-2 h-4 w-4" />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Candidate</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <Input {...register("name")} />
          </div>
          <div>
            <label className="block text-sm font-medium">Qualifications</label>
            <Input {...register("qualifications")} />
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isPending}>
              {isPending ? <Loader2Icon className="mr-2 h-4 w-4 animate-spin" /> : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
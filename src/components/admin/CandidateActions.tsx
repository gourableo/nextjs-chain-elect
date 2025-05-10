"use client";

import { useAdminRemoveCandidate } from "@/hooks/useCandidateDatabase";
import { Button } from "@/components/ui/button";
import { Loader2Icon, PencilIcon, Trash2Icon } from "lucide-react";
import { EditCandidateDialog } from "./EditCandidateDialog";

export function CandidateActions({
  candidate,
}: {
  candidate: { address: string; name?: string; qualifications?: string };
}) {
  const { adminRemoveCandidate, isPending } = useAdminRemoveCandidate();

  const handleRemove = async () => {
    await adminRemoveCandidate(candidate.address as `0x${string}`);
  };

  return (
    <div className="flex space-x-2">
      <EditCandidateDialog candidate={candidate} />
      <Button variant="destructive" onClick={handleRemove} disabled={isPending}>
        {isPending ? (
          <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Trash2Icon className="mr-2 h-4 w-4" />
        )}
        Delete
      </Button>
    </div>
  );
}
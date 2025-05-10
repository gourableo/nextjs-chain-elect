"use client";

import { useAdminGetAllVoters, useAdminRemoveVoter } from "@/hooks/useVoterDatabase";
import { Button } from "@/components/ui/button";
import { Loader2Icon, Trash2Icon } from "lucide-react";

export function VoterManagement() {
  const { voters, isLoading, isError, refetch } = useAdminGetAllVoters();
  const { adminRemoveVoter, isPending } = useAdminRemoveVoter();

  const handleRemoveVoter = async (voterAddress: string) => {
    await adminRemoveVoter(voterAddress);
    refetch(); // Refresh the voter list after removal
  };

  if (isLoading) return <p>Loading voters...</p>;
  if (isError) return <p>Failed to load voters. Please try again later.</p>;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Voter Management</h2>
      <ul className="space-y-2">
        {voters?.map((voter) => (
          <li key={voter} className="flex items-center justify-between p-4 border rounded">
            <span>{voter}</span>
            <Button
              variant="destructive"
              onClick={() => handleRemoveVoter(voter)}
              disabled={isPending}
            >
              {isPending ? (
                <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Trash2Icon className="mr-2 h-4 w-4" />
              )}
              Remove
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
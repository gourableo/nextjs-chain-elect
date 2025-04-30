"use client";

import { CandidateDetails } from "@/types";

export function CandidateInformation({
  candidateDetails,
}: {
  candidateDetails: CandidateDetails;
}) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Your Candidate Information</h2>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <p className="text-sm font-medium text-muted-foreground">Name</p>
          <p className="text-base">{candidateDetails.name}</p>
        </div>

        <div>
          <p className="text-sm font-medium text-muted-foreground">Age</p>
          <p className="text-base">{candidateDetails.age.toString()}</p>
        </div>

        <div>
          <p className="text-sm font-medium text-muted-foreground">Email</p>
          <p className="text-base">{candidateDetails.email}</p>
        </div>

        <div>
          <p className="text-sm font-medium text-muted-foreground">Vote Count</p>
          <p className="text-base">{candidateDetails.voteCount.toString()}</p>
        </div>

        <div className="md:col-span-2">
          <p className="text-sm font-medium text-muted-foreground">Qualifications</p>
          <p className="text-base">{candidateDetails.qualifications}</p>
        </div>

        <div className="md:col-span-2">
          <p className="text-sm font-medium text-muted-foreground">Manifesto</p>
          <p className="text-base whitespace-pre-line">{candidateDetails.manifesto}</p>
        </div>
      </div>
    </div>
  );
}

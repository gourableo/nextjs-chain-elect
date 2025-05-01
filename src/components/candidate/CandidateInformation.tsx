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
          <p className="text-sm font-medium text-muted-foreground">Email</p>
          <p className="text-base">{candidateDetails.email}</p>
        </div>

        <div>
          <p className="text-sm font-medium text-muted-foreground">Age</p>
          <p className="text-base">{candidateDetails.age.toString()}</p>
        </div>

        <div>
          <p className="text-sm font-medium text-muted-foreground">Gender</p>
          <p className="text-base">{candidateDetails.gender === 0 ? "Male" : "Female"}</p>
        </div>

        <div className="md:col-span-2">
          <p className="text-sm font-medium text-muted-foreground">Present Address</p>
          <p className="text-base">{candidateDetails.presentAddress}</p>
        </div>

        <div className="md:col-span-2">
          <p className="text-sm font-medium text-muted-foreground">Qualifications</p>
          <p className="text-base whitespace-pre-wrap">{candidateDetails.qualifications}</p>
        </div>

        <div className="md:col-span-2">
          <p className="text-sm font-medium text-muted-foreground">Manifesto</p>
          <p className="text-base whitespace-pre-wrap">{candidateDetails.manifesto}</p>
        </div>

        <div>
          <p className="text-sm font-medium text-muted-foreground">Registration Date</p>
          <p className="text-base">
            {new Date(Number(candidateDetails.registrationTimestamp) * 1000).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}

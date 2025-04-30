"use client";

import { VoterDetails } from "@/types";

export function VoterInformation({ voterDetails }: { voterDetails: VoterDetails }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Your Voter Information</h2>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <p className="text-sm font-medium text-muted-foreground">Name</p>
          <p className="text-base">{voterDetails.name}</p>
        </div>

        <div>
          <p className="text-sm font-medium text-muted-foreground">Age</p>
          <p className="text-base">{voterDetails.age.toString()}</p>
        </div>

        <div>
          <p className="text-sm font-medium text-muted-foreground">Gender</p>
          <p className="text-base">{voterDetails.gender === 0 ? "Male" : "Female"}</p>
        </div>

        <div>
          <p className="text-sm font-medium text-muted-foreground">Voting Status</p>
          <p className="text-base">{voterDetails.hasVoted ? "Already voted" : "Not voted yet"}</p>
        </div>

        <div className="md:col-span-2">
          <p className="text-sm font-medium text-muted-foreground">Present Address</p>
          <p className="text-base">{voterDetails.presentAddress}</p>
        </div>
      </div>
    </div>
  );
}

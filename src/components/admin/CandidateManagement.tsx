"use client";

import { CandidateTable } from "./CandidateTable";

export function CandidateManagement() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Candidate Management</h2>
      <p className="text-sm text-muted-foreground">
        Manage all registered candidates. You can view, edit, or delete candidate details.
      </p>
      <CandidateTable />
    </div>
  );
}
"use client";

import { useGetAllCandidates, useGetCandidateDetails } from "@/hooks/useCandidateDatabase";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CandidateActions } from "./CandidateActions";

export function CandidateTable() {
  const { candidates, isLoading, isError } = useGetAllCandidates();

  if (isLoading) return <p>Loading candidates...</p>;
  if (isError) return <p>Failed to load candidates. Please try again later.</p>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Address</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Party</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {candidates?.map((candidateAddress) => {
          const { candidateDetails } = useGetCandidateDetails(candidateAddress);

          return (
            <TableRow key={candidateAddress}>
              <TableCell>{candidateAddress}</TableCell>
              <TableCell>{candidateDetails?.name || "Loading..."}</TableCell>
              <TableCell>{candidateDetails?.qualifications || "Loading..."}</TableCell>
              <TableCell>
                <CandidateActions candidate={{ address: candidateAddress, ...candidateDetails }} />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
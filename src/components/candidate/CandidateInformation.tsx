"use client";

import { CandidateDetails } from "@/types";
import { calculateAge, epochToDateString } from "@/lib/utils/date-conversions";

interface CandidateInformationProps {
  candidateDetails: CandidateDetails;
  view?: "full" | "basic-profile" | "manifesto" | "all";
}

export function CandidateInformation({
  candidateDetails,
  view = "all",
}: CandidateInformationProps) {
  const showProfile = view === "full" || view === "basic-profile" || view === "all";
  const showManifesto = view === "manifesto" || view === "all";
  const showFullProfile = view === "full" || view === "all";

  return (
    <div className="space-y-6">
      {showProfile && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Your Candidate Profile</h2>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Name</p>
              <p className="text-base">{candidateDetails.name}</p>
            </div>

            <div>
              <p className="text-sm font-medium text-muted-foreground">Email</p>
              <p className="text-base">{candidateDetails.email}</p>
            </div>

            {showFullProfile && (
              <>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Date of Birth</p>
                  <p className="text-base">
                    {epochToDateString(candidateDetails.dateOfBirthEpoch)}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-muted-foreground">Age</p>
                  <p className="text-base">
                    {calculateAge(candidateDetails.dateOfBirthEpoch)} years
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-muted-foreground">Gender</p>
                  <p className="text-base">{candidateDetails.gender === 0 ? "Male" : "Female"}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-muted-foreground">Registration Date</p>
                  <p className="text-base">
                    {new Date(
                      Number(candidateDetails.timeWhenRegisteredEpoch) * 1000,
                    ).toLocaleString()}
                  </p>
                </div>

                <div className="md:col-span-2">
                  <p className="text-sm font-medium text-muted-foreground">Present Address</p>
                  <p className="text-base">{candidateDetails.presentAddress}</p>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {showManifesto && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Candidate Information</h2>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-2">Qualifications</h3>
              <p className="text-base whitespace-pre-wrap">{candidateDetails.qualifications}</p>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Manifesto</h3>
              <p className="text-base whitespace-pre-wrap">{candidateDetails.manifesto}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Keep exports for backward compatibility
export function CandidateManifesto({ candidateDetails }: { candidateDetails: CandidateDetails }) {
  return <CandidateInformation candidateDetails={candidateDetails} view="manifesto" />;
}

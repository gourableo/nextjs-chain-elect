import { CandidateDetails } from "@/types";

interface CandidateManifestoTabProps {
  candidateDetails: CandidateDetails;
}

export function CandidateManifestoTab({ candidateDetails }: CandidateManifestoTabProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Election Manifesto</h2>

      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Your Vision and Promises</h3>
          <div className="bg-muted p-4 rounded-md">
            <p className="whitespace-pre-wrap">{candidateDetails.manifesto}</p>
          </div>
        </div>
      </div>

      <div className="space-y-4 mt-8">
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Qualifications & Experience</h3>
          <div className="bg-muted p-4 rounded-md">
            <p className="whitespace-pre-wrap">{candidateDetails.qualifications}</p>
          </div>
        </div>
      </div>

      <div className="bg-primary/5 border border-primary/20 p-4 rounded-md mt-8">
        <h3 className="text-sm font-medium mb-2">Note</h3>
        <p className="text-sm text-muted-foreground">
          Your manifesto is publicly visible to all voters. Keep it clear, honest, and focused on
          how you plan to make a difference. You can update this information at any time from the
          Settings tab.
        </p>
      </div>
    </div>
  );
}
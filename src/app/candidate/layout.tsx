import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Candidate Portal | Chain-Elect",
  description:
    "Register as a candidate or manage your candidate information for blockchain-based elections",
};

export default function CandidatePageLayout({ children }: { children: React.ReactNode }) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}

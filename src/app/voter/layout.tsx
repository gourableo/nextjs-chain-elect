import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Voter Portal | Chain-Elect",
  description:
    "Register as a voter or manage your voter information for blockchain-based elections",
};

export default function VoterPageLayout({ children }: { children: React.ReactNode }) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}

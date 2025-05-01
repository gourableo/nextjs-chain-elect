import Link from "next/link";
import { VoteIcon } from "lucide-react";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <VoteIcon className="text-primary" />
      <span className="text-xl font-bold">ChainElect</span>
    </Link>
  );
}

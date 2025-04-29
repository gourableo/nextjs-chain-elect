import { Loader2Icon } from "lucide-react";

export function LoadingSpinner({ message }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Loader2Icon className="h-8 w-8 animate-spin text-primary" />
      {message && <p className="mt-4 text-sm text-muted-foreground">{message}</p>}
    </div>
  );
}

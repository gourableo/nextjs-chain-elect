import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpenCheckIcon, GlobeLockIcon, ShieldIcon } from "lucide-react";

export default function WhyUs() {
  return (
    <section className="py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Why Choose ChainElect?
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our platform combines the power of blockchain with an intuitive interface for secure
              and transparent voting.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
          <Card>
            <CardHeader className="flex flex-col items-center justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                <GlobeLockIcon size={40} />
              </div>
              <CardTitle className="mt-4">Secure Voting</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription>
                Every vote is cryptographically secured on the blockchain, ensuring tamper-proof
                elections.
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-col items-center justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                <BookOpenCheckIcon size={40} />
              </div>
              <CardTitle className="mt-4">Transparent</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription>
                All election data is publicly verifiable while maintaining voter privacy.
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-col items-center justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                <ShieldIcon size={40} />
              </div>
              <CardTitle className="mt-4">Decentralized</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription>
                No central authority controls the voting process, ensuring true democratic
                principles.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

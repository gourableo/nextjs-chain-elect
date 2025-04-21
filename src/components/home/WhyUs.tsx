import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

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
          <Card className="flex flex-col items-center justify-center space-y-2 text-center">
            <CardHeader>
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-10 w-10"
                >
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <line x1="2" x2="22" y1="10" y2="10" />
                </svg>
              </div>
              <CardTitle>Secure Voting</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Every vote is cryptographically secured on the blockchain, ensuring tamper-proof
                elections.
              </CardDescription>
            </CardContent>
          </Card>
          <Card className="flex flex-col items-center justify-center space-y-2 text-center">
            <CardHeader>
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-10 w-10"
                >
                  <polyline points="17 1 21 5 17 9" />
                  <path d="M3 11V9a4 4 0 0 1 4-4h14" />
                  <polyline points="7 23 3 19 7 15" />
                  <path d="M21 13v2a4 4 0 0 1-4 4H3" />
                </svg>
              </div>
              <CardTitle>Transparent</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                All election data is publicly verifiable while maintaining voter privacy.
              </CardDescription>
            </CardContent>
          </Card>
          <Card className="flex flex-col items-center justify-center space-y-2 text-center">
            <CardHeader>
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-10 w-10"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                </svg>
              </div>
              <CardTitle>Decentralized</CardTitle>
            </CardHeader>
            <CardContent>
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

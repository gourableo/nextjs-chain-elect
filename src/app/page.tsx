import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Secure, Transparent, Decentralized Voting
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  ChainElect leverages blockchain technology to provide tamper-proof electronic
                  voting for modern elections. Your voice, secured by cryptography.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/voter/register">
                  <Button size="lg" className="w-full">
                    Register as Voter
                  </Button>
                </Link>
                <Link href="/candidate/register">
                  <Button size="lg" variant="outline" className="w-full">
                    Register as Candidate
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="grid grid-cols-2 gap-4 md:gap-8">
                <Card>
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg">Voter</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-muted-foreground">
                      Register and cast your votes securely.
                    </p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Link href="/voter/login" className="w-full">
                      <Button variant="secondary" className="w-full">
                        Voter Login
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg">Candidate</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-muted-foreground">
                      Enter elections and track results.
                    </p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Link href="/candidate/login" className="w-full">
                      <Button variant="secondary" className="w-full">
                        Candidate Login
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
                <Card className="col-span-2">
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg">Admin</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-muted-foreground">
                      Manage elections, voters, and candidates.
                    </p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Link href="/admin/login" className="w-full">
                      <Button variant="secondary" className="w-full">
                        Admin Login
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Why Choose ChainElect?
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our platform combines the power of blockchain with an intuitive interface for
                secure and transparent voting.
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
    </>
  );
}

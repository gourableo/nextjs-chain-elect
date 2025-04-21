import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function Dashboard() {
  return (
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
              <Card className="text-center">
                <CardHeader className="p-4">
                  <CardTitle className="text-lg flex justify-center">Voter</CardTitle>
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
              <Card className="text-center">
                <CardHeader className="p-4">
                  <CardTitle className="text-lg flex justify-center">Candidate</CardTitle>
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
              <Card className="col-span-2 text-center">
                <CardHeader className="p-4">
                  <CardTitle className="text-lg flex justify-center">Admin</CardTitle>
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
  );
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpenCheckIcon, GlobeLockIcon, ShieldIcon, BarChart4Icon } from "lucide-react";

const features = [
  {
    icon: <GlobeLockIcon size={40} />,
    title: "Secure Voting",
    description:
      "Every vote is cryptographically secured on the blockchain, ensuring tamper-proof elections.",
    color: "bg-blue-100 dark:bg-blue-900/20",
    textColor: "text-blue-600 dark:text-blue-400",
  },
  {
    icon: <BookOpenCheckIcon size={40} />,
    title: "Transparent",
    description: "All election data is publicly verifiable while maintaining voter privacy.",
    color: "bg-emerald-100 dark:bg-emerald-900/20",
    textColor: "text-emerald-600 dark:text-emerald-400",
  },
  {
    icon: <ShieldIcon size={40} />,
    title: "Decentralized",
    description:
      "No central authority controls the voting process, ensuring true democratic principles.",
    color: "bg-violet-100 dark:bg-violet-900/20",
    textColor: "text-violet-600 dark:text-violet-400",
  },
  {
    icon: <BarChart4Icon size={40} />,
    title: "Easy to Use",
    description:
      "Simple interfaces for voters, candidates, and administrators without sacrificing security.",
    color: "bg-amber-100 dark:bg-amber-900/20",
    textColor: "text-amber-600 dark:text-amber-400",
  },
];

export default function WhyUs() {
  return (
    <section className="py-16 md:py-24 lg:py-32 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
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

        <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div key={index}>
              <Card className="h-full overflow-hidden transition-all hover:shadow-lg">
                <CardHeader className="flex flex-col items-center justify-center pb-2">
                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-full ${feature.color} ${feature.textColor}`}
                  >
                    {feature.icon}
                  </div>
                  <CardTitle className="mt-4 text-center">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

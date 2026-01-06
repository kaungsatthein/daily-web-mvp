import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles, Zap } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-linear-to-br from-background via-background to-accent/10">
      <div className="w-full max-w-4xl space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-balance">
            Daily Photo Maker
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Create stunning photos every day with our powerful editor.
          </p>
        </div>

        <Card className="p-10 bg-card/50 backdrop-blur-sm border-primary/20 shadow-xl">
          <div className="space-y-6. flex flex-row justify-between">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="space-y-1">
                <h2 className="text-2xl font-semibold text-foreground">
                  Create your today photo
                </h2>
                <p className="text-muted-foreground">
                  Create your daily photo before time runs out
                </p>
              </div>
            </div>

            <Link href="/editor" className="block">
              <Button size="lg" className="w-full text-lg h-14 group">
                <Sparkles className="size-5 mr-2" />
                Start Today&apos;s Photo
              </Button>
            </Link>
          </div>
        </Card>

        <div className="grid md:grid-cols-2 gap-4 mt-12">
          <Card className="p-6 bg-card/30 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-colors">
            <div className="space-y-3">
              <div className="size-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <Sparkles className="size-6 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground">AI Generate</h3>
              <p className="text-sm text-muted-foreground">
                Generate images with powerful AI assistance
              </p>
            </div>
          </Card>

          <Card className="p-6 bg-card/30 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-colors">
            <div className="space-y-3">
              <div className="size-12 rounded-xl bg-chart-5/10 flex items-center justify-center">
                <Zap className="size-6 text-chart-5" />
              </div>
              <h3 className="font-semibold text-foreground">Fast & Easy</h3>
              <p className="text-sm text-muted-foreground">
                Powerful tools that are simple to use
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

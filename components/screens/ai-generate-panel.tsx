import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

const styles = ["Photo", "Illustration", "Anime", "3D", "Painting", "Sketch"];
const aspectRatios = ["1:1", "4:5", "16:9", "9:16"];

export function AIGeneratePanel() {
  return (
    <div className="p-4 space-y-6">
      <div className="space-y-2">
        <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <Sparkles className="size-4 text-primary" />
          AI Generate
        </h2>
        <p className="text-xs text-muted-foreground">
          Describe what you want to create
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-xs font-medium text-foreground">Prompt</label>
          <Textarea
            placeholder="A serene landscape with mountains at sunset..."
            className="min-h-24 resize-none"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium text-foreground">Style</label>
          <div className="flex flex-wrap gap-2">
            {styles.map((style) => (
              <Badge
                key={style}
                variant="outline"
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {style}
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium text-foreground">
            Aspect Ratio
          </label>
          <div className="flex flex-wrap gap-2">
            {aspectRatios.map((ratio) => (
              <Badge
                key={ratio}
                variant="outline"
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {ratio}
              </Badge>
            ))}
          </div>
        </div>

        <Button className="w-full gap-2">
          <Sparkles className="size-4" />
          Generate
        </Button>
      </div>

      <div className="space-y-3">
        <label className="text-xs font-medium text-foreground">
          Generated Images
        </label>
        <div className="grid grid-cols-2 gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card
              key={i}
              className="aspect-square bg-muted/50 rounded-lg overflow-hidden group cursor-pointer hover:ring-2 hover:ring-primary transition-all relative"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="size-12 rounded-full bg-muted animate-pulse" />
              </div>
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button size="sm" variant="secondary">
                  Add
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

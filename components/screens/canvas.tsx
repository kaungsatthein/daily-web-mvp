import { Card } from "@/components/ui/card";

export function Canvas() {
  return (
    <div className="flex-1 p-6 overflow-auto checkerboard">
      <div className="min-h-full flex items-center justify-center">
        <Card className="w-[600px] h-[600px] bg-background shadow-2xl relative border-2 border-border">
          {/* Mock layers - these are static placeholders */}
          <div className="absolute inset-0 flex items-center justify-center p-8">
            {/* Mock image layer */}
            <div className="absolute top-12 left-12 w-64 h-48 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 border-2 border-primary/30 flex items-center justify-center shadow-lg">
              <span className="text-sm font-medium text-muted-foreground">
                Image Layer
              </span>
            </div>

            {/* Mock text layer */}
            <div className="absolute bottom-24 right-16 p-6 rounded-lg border-2 border-dashed border-accent/50 bg-accent/5">
              <p className="text-3xl font-bold text-foreground">
                Your Text Here
              </p>
            </div>
          </div>

          {/* Center helper text */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center space-y-2 opacity-50">
              <p className="text-sm text-muted-foreground">
                Canvas: 600 × 600px
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

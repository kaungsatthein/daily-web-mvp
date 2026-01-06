import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Undo, Redo, Download, Save, Clock, Sparkles } from "lucide-react";

export function EditorHeader() {
  return (
    <header className="h-16 border-b border-border bg-card px-4 flex items-center justify-between gap-4 sticky top-0 z-50">
      <h1 className="text-lg font-semibold text-foreground">
        Daily Photo Maker
      </h1>

      <div className="flex items-center gap-2">
        <Button size="sm" className="gap-2">
          <Download className="size-4" />
          <span className="hidden sm:inline">Export</span>
        </Button>
      </div>
    </header>
  );
}

import { Button } from "@/components/ui/button";
import { Download, Redo, Undo } from "lucide-react";

interface EditorHeaderProps {
  onExport: () => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

export function EditorHeader({
  onExport,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
}: EditorHeaderProps) {
  return (
    <header className="h-16 border-b border-border bg-card px-4 flex items-center justify-between gap-4 sticky top-0 z-50">
      <h1 className="text-lg font-semibold text-foreground">
        Daily Photo Maker
      </h1>

      <div className="flex items-center gap-2">
        <Button
          size="icon"
          variant="outline"
          onClick={onUndo}
          disabled={!canUndo}
          aria-label="Undo"
        >
          <Undo className="size-4" />
        </Button>
        <Button
          size="icon"
          variant="outline"
          onClick={onRedo}
          disabled={!canRedo}
          aria-label="Redo"
        >
          <Redo className="size-4" />
        </Button>
        <Button size="sm" className="gap-2" onClick={onExport}>
          <Download className="size-4" />
          <span className="hidden sm:inline">Export JPG</span>
        </Button>
      </div>
    </header>
  );
}

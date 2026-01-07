"use client";
import { useEffect, useRef, useState } from "react";
import type { Canvas as FabricCanvas, CanvasEvents } from "fabric";
import { EditorHeader } from "./editor-header";
import { ToolSidebar } from "./tool-sidebar";
import { PropertiesPanel } from "./properties-panel";
import { Canvas } from "./canvas";
import { AIGeneratePanel } from "./ai-generate-panel";

export type ToolType = "canvas" | "ai-generate";

const EditorScreen = () => {
  const [selectedTool, setSelectedTool] = useState<ToolType | "canvas">(
    "canvas"
  );
  const [canvasInstance, setCanvasInstance] = useState<FabricCanvas | null>(
    null
  );
  const [canvasSize, setCanvasSize] = useState({ width: 4000, height: 2000 });
  const historyRef = useRef<{ past: string[]; future: string[] }>({
    past: [],
    future: [],
  });
  const isRestoringRef = useRef(false);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  useEffect(() => {
    if (!canvasInstance) return;

    const snapshot = () => JSON.stringify(canvasInstance.toJSON());
    historyRef.current = { past: [snapshot()], future: [] };

    const recordHistory = () => {
      if (isRestoringRef.current) return;
      const state = snapshot();
      const past = historyRef.current.past;
      if (past[past.length - 1] === state) return;
      past.push(state);
      historyRef.current.future = [];
      setCanUndo(past.length > 1);
      setCanRedo(false);
    };

    const events: (keyof CanvasEvents)[] = [
      "object:added",
      "object:modified",
      "object:removed",
    ];
    events.forEach((eventName) => canvasInstance.on(eventName, recordHistory));

    return () => {
      events.forEach((eventName) =>
        canvasInstance.off(eventName, recordHistory)
      );
    };
  }, [canvasInstance]);

  const handleExport = () => {
    if (!canvasInstance) return;
    const dataUrl = canvasInstance.toDataURL({
      format: "jpeg",
      quality: 1,
      multiplier: 1,
    });

    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "canvas-export.jpg";
    link.click();
  };

  const handleUndo = () => {
    if (!canvasInstance) return;
    const { past, future } = historyRef.current;
    if (past.length < 2) return;
    const current = past.pop();
    if (current) {
      future.unshift(current);
    }
    const previous = past[past.length - 1];
    if (!previous) return;
    isRestoringRef.current = true;
    void canvasInstance.loadFromJSON(previous).then(() => {
      canvasInstance.requestRenderAll();
      isRestoringRef.current = false;
      setCanUndo(past.length > 1);
      setCanRedo(future.length > 0);
    });
  };

  const handleRedo = () => {
    if (!canvasInstance) return;
    const { past, future } = historyRef.current;
    const next = future.shift();
    if (!next) return;
    past.push(next);
    isRestoringRef.current = true;
    void canvasInstance.loadFromJSON(next).then(() => {
      canvasInstance.requestRenderAll();
      isRestoringRef.current = false;
      setCanUndo(past.length > 1);
      setCanRedo(future.length > 0);
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <EditorHeader
        onExport={handleExport}
        onUndo={handleUndo}
        onRedo={handleRedo}
        canUndo={canUndo}
        canRedo={canRedo}
      />
      <div className="flex-1 flex overflow-hidden">
        <ToolSidebar
          selectedTool={selectedTool}
          onSelectTool={setSelectedTool}
        />

        <div className="flex-1 flex flex-col overflow-hidden ">
          <Canvas
            width={canvasSize.width}
            height={canvasSize.height}
            onCanvasReady={setCanvasInstance}
          />
        </div>

        <div className="w-80 border-l border-border bg-card overflow-y-auto hidden lg:block">
          {selectedTool === "ai-generate" ? (
            <AIGeneratePanel />
          ) : (
            <PropertiesPanel
              canvas={canvasInstance}
              canvasSize={canvasSize}
              onCanvasSizeChange={setCanvasSize}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default EditorScreen;

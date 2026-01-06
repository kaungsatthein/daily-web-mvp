"use client";
import { useState } from "react";
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
  return (
    <div className="min-h-screen flex flex-col">
      <EditorHeader />
      <div className="flex-1 flex overflow-hidden">
        <ToolSidebar
          selectedTool={selectedTool}
          onSelectTool={setSelectedTool}
        />

        <div className="flex-1 flex flex-col overflow-hidden ">
          <Canvas />
        </div>

        <div className="w-80 border-l border-border bg-card overflow-y-auto hidden lg:block">
          {selectedTool === "ai-generate" ? (
            <AIGeneratePanel />
          ) : (
            <PropertiesPanel />
          )}
        </div>
      </div>
    </div>
  );
};

export default EditorScreen;

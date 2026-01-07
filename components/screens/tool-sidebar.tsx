"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Layout, Type } from "lucide-react";
import { cn } from "@/lib/utils";
import { ToolType } from "./editor-screen";

interface ToolSidebarProps {
  selectedTool: ToolType | null;
  onSelectTool: (tool: ToolType) => void;
}

const tools: { id: ToolType; icon: React.ElementType; label: string }[] = [
  { id: "canvas", icon: Layout, label: "Canvas" },
  { id: "ai-generate", icon: Type, label: "Ai" },
];

export function ToolSidebar({ selectedTool, onSelectTool }: ToolSidebarProps) {
  return (
    <aside className="w-20 border-r border-border bg-card flex flex-col items-center py-4 gap-2">
      {tools.map((tool) => {
        const Icon = tool.icon;
        const isSelected = selectedTool === tool.id;

        return (
          <Button
            key={tool.id}
            variant="ghost"
            size="icon"
            className={cn(
              "size-14 flex-col gap-2 h-auto py-2 hover:bg-primary",
              isSelected && "bg-primary text-primary-foreground"
            )}
            onClick={() => onSelectTool(tool.id)}
          >
            <Icon className="size-5" />
            <span className="text-[10px] font-medium leading-none">
              {tool.label}
            </span>
          </Button>
        );
      })}
    </aside>
  );
}

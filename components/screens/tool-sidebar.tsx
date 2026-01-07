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
    <aside className="w-full lg:w-20 border-b lg:border-b-0 lg:border-r border-border bg-card flex flex-row lg:flex-col items-center justify-around lg:justify-start py-2 lg:py-4 gap-2 shrink-0">
      {tools.map((tool) => {
        const Icon = tool.icon;
        const isSelected = selectedTool === tool.id;

        return (
          <Button
            key={tool.id}
            variant="ghost"
            size="icon"
            className={cn(
              "flex-1 lg:flex-none w-full lg:w-auto h-12 lg:h-auto lg:size-14 flex-col gap-2 py-2 hover:bg-primary",
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

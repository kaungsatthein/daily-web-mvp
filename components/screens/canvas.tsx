"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas as FabricCanvas } from "fabric";
import { Card } from "@/components/ui/card";

interface CanvasProps {
  width: number;
  height: number;
  onCanvasReady: (canvas: FabricCanvas) => void;
}

export function Canvas({ width, height, onCanvasReady }: CanvasProps) {
  const canvasElementRef = useRef<HTMLCanvasElement | null>(null);
  const fabricCanvasRef = useRef<FabricCanvas | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (!canvasElementRef.current || fabricCanvasRef.current) return;

    const canvas = new FabricCanvas(canvasElementRef.current, {
      backgroundColor: "#ffffff",
      selection: true,
      preserveObjectStacking: true,
    });

    canvas.setDimensions({ width, height }, { backstoreOnly: true });

    fabricCanvasRef.current = canvas;
    onCanvasReady(canvas);

    return () => {
      canvas.dispose();
      fabricCanvasRef.current = null;
    };
  }, [height, onCanvasReady, width]);

  useEffect(() => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    canvas.setDimensions({ width, height }, { backstoreOnly: true });
    canvas.requestRenderAll();
  }, [height, width]);

  useEffect(() => {
    if (!stageRef.current) return;

    const updateScale = () => {
      if (!stageRef.current) return;
      const rect = stageRef.current.getBoundingClientRect();
      if (!rect.width || !rect.height || !width || !height) return;
      const nextScale = Math.min(rect.width / width, rect.height / height, 1);
      setScale(Number.isFinite(nextScale) ? nextScale : 1);
    };

    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(stageRef.current);

    return () => {
      observer.disconnect();
    };
  }, [height, width]);

  useEffect(() => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;
    const cssWidth = Math.max(Math.round(width * scale), 1);
    const cssHeight = Math.max(Math.round(height * scale), 1);
    canvas.setDimensions(
      { width: `${cssWidth}px`, height: `${cssHeight}px` },
      { cssOnly: true }
    );
  }, [height, scale, width]);

  return (
    <div className="flex-1 p-3 sm:p-6 overflow-auto checkerboard">
      <div
        ref={stageRef}
        className="min-h-full flex items-center justify-center"
      >
        <Card
          className="bg-background shadow-2xl relative border-0"
          style={{ width: width * scale, height: height * scale }}
        >
          <canvas ref={canvasElementRef} className="block" />
        </Card>
      </div>
    </div>
  );
}

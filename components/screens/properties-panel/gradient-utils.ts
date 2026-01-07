import type { TPointerEvent } from "fabric";
import { Canvas as FabricCanvas, Gradient, Line, util } from "fabric";

export type GradientConfig = {
  angle: number;
  startColor: string;
  endColor: string;
  startOpacity: number;
  endOpacity: number;
};

const toRgba = (hex: string, opacity: number) => {
  const normalized = hex.replace("#", "");
  const isShort = normalized.length === 3;
  const r = parseInt(
    isShort ? normalized[0] + normalized[0] : normalized.slice(0, 2),
    16
  );
  const g = parseInt(
    isShort ? normalized[1] + normalized[1] : normalized.slice(2, 4),
    16
  );
  const b = parseInt(
    isShort ? normalized[2] + normalized[2] : normalized.slice(4, 6),
    16
  );
  const alpha = Math.min(Math.max(opacity, 0), 100) / 100;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const buildLinearGradient = (
  width: number,
  height: number,
  config: GradientConfig
) => {
  const angleRadians = (config.angle * Math.PI) / 180;
  const centerX = width / 2;
  const centerY = height / 2;
  const halfDiagonal = Math.sqrt(width * width + height * height) / 2;
  const dx = Math.cos(angleRadians) * halfDiagonal;
  const dy = Math.sin(angleRadians) * halfDiagonal;

  return new Gradient({
    type: "linear",
    coords: {
      x1: centerX - dx,
      y1: centerY - dy,
      x2: centerX + dx,
      y2: centerY + dy,
    },
    colorStops: [
      {
        offset: 0,
        color: toRgba(config.startColor, config.startOpacity),
      },
      {
        offset: 1,
        color: toRgba(config.endColor, config.endOpacity),
      },
    ],
  });
};

export const applyGradientToLine = (line: Line, config: GradientConfig) => {
  const x1 = line.x1 ?? 0;
  const y1 = line.y1 ?? 0;
  const x2 = line.x2 ?? 0;
  const y2 = line.y2 ?? 0;
  const width = Math.max(Math.abs(x2 - x1), 1);
  const height = Math.max(Math.abs(y2 - y1), 1);
  const startX = x1 <= x2 ? 0 : width;
  const startY = y1 <= y2 ? 0 : height;
  const endX = x1 <= x2 ? width : 0;
  const endY = y1 <= y2 ? height : 0;

  line.set({
    stroke: new Gradient({
      type: "linear",
      gradientUnits: "pixels",
      coords: {
        x1: startX,
        y1: startY,
        x2: endX,
        y2: endY,
      },
      colorStops: [
        {
          offset: 0,
          color: toRgba(config.startColor, config.startOpacity),
        },
        {
          offset: 1,
          color: toRgba(config.endColor, config.endOpacity),
        },
      ],
    }),
  });
};

export const getCanvasPoint = (
  canvas: FabricCanvas,
  event: TPointerEvent
): { x: number; y: number } => {
  const canvasWithPoints = canvas as FabricCanvas & {
    getScenePoint?: (event: MouseEvent | PointerEvent | TouchEvent) => {
      x: number;
      y: number;
    };
    getViewportPoint?: (event: MouseEvent | PointerEvent | TouchEvent) => {
      x: number;
      y: number;
    };
  };
  if (typeof canvasWithPoints.getScenePoint === "function") {
    return canvasWithPoints.getScenePoint(event);
  }
  if (typeof canvasWithPoints.getViewportPoint === "function") {
    return canvasWithPoints.getViewportPoint(event);
  }
  const pointer = util.getPointer(event);
  return canvas.viewportTransform
    ? util.sendPointToPlane(pointer, undefined, canvas.viewportTransform)
    : pointer;
};

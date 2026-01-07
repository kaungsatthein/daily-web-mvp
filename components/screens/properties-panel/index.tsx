"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { ChangeEvent } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { TPointerEventInfo } from "fabric";
import {
  Canvas as FabricCanvas,
  FabricImage,
  FabricText,
  Line,
  Rect,
  Textbox,
} from "fabric";
import { DesignTab } from "./design-tab";
import { ImageTab } from "./image-tab";
import { TextTab } from "./text-tab";
import { presetSizes } from "./presets";
import {
  applyGradientToLine,
  buildLinearGradient,
  getCanvasPoint,
  type GradientConfig,
} from "./gradient-utils";

interface PropertiesPanelProps {
  canvas: FabricCanvas | null;
  canvasSize: { width: number; height: number };
  onCanvasSizeChange: (size: { width: number; height: number }) => void;
}

type CanvasActiveObject = Exclude<
  ReturnType<FabricCanvas["getActiveObject"]>,
  null | undefined
>;

export function PropertiesPanel({
  canvas,
  canvasSize,
  onCanvasSizeChange,
}: PropertiesPanelProps) {
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [textColor, setTextColor] = useState("#000000");
  const [fontFamily, setFontFamily] = useState("inter");
  const [fontSize, setFontSize] = useState(48);
  const [textAlign, setTextAlign] = useState<"left" | "center" | "right">(
    "left"
  );
  const [backgroundMode, setBackgroundMode] = useState<"solid" | "gradient">(
    "solid"
  );
  const [gradientStartColor, setGradientStartColor] = useState("#4f46e5");
  const [gradientEndColor, setGradientEndColor] = useState("#22d3ee");
  const [gradientAngle, setGradientAngle] = useState(135);
  const [gradientStartOpacity, setGradientStartOpacity] = useState(100);
  const [gradientEndOpacity, setGradientEndOpacity] = useState(100);
  const [gradientLineMode, setGradientLineMode] = useState(false);
  const [gradientLineWidth, setGradientLineWidth] = useState(12);
  const [hasSelection, setHasSelection] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const canvasRef = useRef<FabricCanvas | null>(null);
  const activeLineRef = useRef<Line | null>(null);
  const isDrawingLineRef = useRef(false);

  const gradientConfig = useMemo<GradientConfig>(
    () => ({
      angle: gradientAngle,
      startColor: gradientStartColor,
      endColor: gradientEndColor,
      startOpacity: gradientStartOpacity,
      endOpacity: gradientEndOpacity,
    }),
    [
      gradientAngle,
      gradientEndColor,
      gradientEndOpacity,
      gradientStartColor,
      gradientStartOpacity,
    ]
  );

  useEffect(() => {
    if (!canvas) {
      return;
    }

    const updateSelection = () => {
      setHasSelection(Boolean(canvas.getActiveObject()));
    };

    updateSelection();
    canvas.on("selection:created", updateSelection);
    canvas.on("selection:updated", updateSelection);
    canvas.on("selection:cleared", updateSelection);

    return () => {
      canvas.off("selection:created", updateSelection);
      canvas.off("selection:updated", updateSelection);
      canvas.off("selection:cleared", updateSelection);
    };
  }, [canvas]);

  useEffect(() => {
    canvasRef.current = canvas;
  }, [canvas]);

  const selectedPreset = useMemo(() => {
    return (
      presetSizes.find(
        (preset) =>
          preset.width === canvasSize.width &&
          preset.height === canvasSize.height
      )?.value ?? "custom"
    );
  }, [canvasSize.height, canvasSize.width]);

  const ensureActiveText = () => {
    if (!canvas) return null;
    const active = canvas.getActiveObject();
    if (active instanceof Textbox || active instanceof FabricText) {
      return active;
    }

    const textbox = new Textbox("Your Text Here", {
      left: canvas.getWidth() / 2,
      top: canvas.getHeight() / 2,
      originX: "center",
      originY: "center",
      fill: textColor,
      fontFamily,
      fontSize,
      textAlign,
    });

    canvas.add(textbox);
    canvas.setActiveObject(textbox);
    canvas.requestRenderAll();
    return textbox;
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      setImagePreviewUrl(null);
      return;
    }

    const nextUrl = URL.createObjectURL(file);
    setImagePreviewUrl((currentUrl) => {
      if (currentUrl) {
        URL.revokeObjectURL(currentUrl);
      }
      return nextUrl;
    });

    if (!canvas) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result !== "string") return;

      void FabricImage.fromURL(result).then((image) => {
        const canvasWidth = canvas.getWidth();
        const canvasHeight = canvas.getHeight();
        const scale = Math.min(
          (canvasWidth * 0.7) / (image.width || 1),
          (canvasHeight * 0.7) / (image.height || 1)
        );
        image.set({
          left: canvasWidth / 2,
          top: canvasHeight / 2,
          originX: "center",
          originY: "center",
          scaleX: scale,
          scaleY: scale,
        });
        canvas.add(image);
        canvas.setActiveObject(image);
        canvas.requestRenderAll();
      });
    };
    reader.readAsDataURL(file);
  };

  const applySolidBackground = (color: string) => {
    if (!canvas) return;
    canvas.set({ backgroundColor: color });
    canvas.requestRenderAll();
  };

  const applyGradientBackground = () => {
    if (!canvas) return;
    const width = canvas.getWidth();
    const height = canvas.getHeight();
    canvas.set({
      backgroundColor: buildLinearGradient(width, height, gradientConfig),
    });
    canvas.requestRenderAll();
  };

  const handleAddGradientLayer = () => {
    if (!canvas) return;
    const width = canvas.getWidth();
    const height = canvas.getHeight();
    const rect = new Rect({
      left: width / 2,
      top: height / 2,
      originX: "center",
      originY: "center",
      width,
      height,
      fill: buildLinearGradient(width, height, gradientConfig),
    });
    canvas.add(rect);
    canvas.setActiveObject(rect);
    canvas.bringObjectToFront(rect);
    canvas.requestRenderAll();
  };

  const handleAddText = () => {
    if (!canvas) return;
    const textbox = new Textbox("Your Text Here", {
      left: canvas.getWidth() / 2,
      top: canvas.getHeight() / 2,
      originX: "center",
      originY: "center",
      fill: textColor,
      fontFamily,
      fontSize,
      textAlign,
    });
    canvas.add(textbox);
    canvas.setActiveObject(textbox);
    canvas.requestRenderAll();
  };

  const handleLayerAction = (action: (active: CanvasActiveObject) => void) => {
    if (!canvas) return;
    const active = canvas.getActiveObject();
    if (!active) return;
    action(active);
    canvas.requestRenderAll();
  };

  useEffect(() => {
    if (!canvas) return;
    if (backgroundMode === "gradient") {
      applyGradientBackground();
    } else {
      applySolidBackground(backgroundColor);
    }
  }, [
    applyGradientBackground,
    applySolidBackground,
    backgroundColor,
    backgroundMode,
    canvas,
    canvasSize.height,
    canvasSize.width,
    gradientConfig,
  ]);

  useEffect(() => {
    const canvasInstance = canvasRef.current;
    if (!canvasInstance || !gradientLineMode) return;
    const previousSelection = canvasInstance.selection;
    const previousSkipTargetFind = canvasInstance.skipTargetFind;
    const previousCursor = canvasInstance.defaultCursor;

    canvasInstance.selection = false;
    canvasInstance.skipTargetFind = true;
    canvasInstance.defaultCursor = "crosshair";

    const handleMouseDown = (event: TPointerEventInfo) => {
      const pointer = getCanvasPoint(canvasInstance, event.e);
      const line = new Line([pointer.x, pointer.y, pointer.x, pointer.y], {
        strokeWidth: gradientLineWidth,
        strokeLineCap: "round",
        strokeLineJoin: "round",
        selectable: true,
        evented: true,
      });
      applyGradientToLine(line, gradientConfig);
      canvasInstance.add(line);
      canvasInstance.setActiveObject(line);
      activeLineRef.current = line;
      isDrawingLineRef.current = true;
      canvasInstance.requestRenderAll();
    };

    const handleMouseMove = (event: TPointerEventInfo) => {
      if (!isDrawingLineRef.current || !activeLineRef.current) {
        return;
      }
      const pointer = getCanvasPoint(canvasInstance, event.e);
      activeLineRef.current.set({ x2: pointer.x, y2: pointer.y });
      applyGradientToLine(activeLineRef.current, gradientConfig);
      activeLineRef.current.setCoords();
      canvasInstance.requestRenderAll();
    };

    const handleMouseUp = () => {
      isDrawingLineRef.current = false;
      activeLineRef.current?.setCoords();
      activeLineRef.current = null;
    };

    canvasInstance.on("mouse:down", handleMouseDown);
    canvasInstance.on("mouse:move", handleMouseMove);
    canvasInstance.on("mouse:up", handleMouseUp);

    return () => {
      canvasInstance.off("mouse:down", handleMouseDown);
      canvasInstance.off("mouse:move", handleMouseMove);
      canvasInstance.off("mouse:up", handleMouseUp);
      canvasInstance.selection = previousSelection;
      canvasInstance.skipTargetFind = previousSkipTargetFind;
      canvasInstance.defaultCursor = previousCursor;
      isDrawingLineRef.current = false;
      activeLineRef.current = null;
    };
  }, [canvas, gradientConfig, gradientLineMode, gradientLineWidth]);

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-sm font-semibold text-foreground">Properties</h2>

      <Tabs defaultValue="design" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="design">Design</TabsTrigger>
          <TabsTrigger value="text">Text</TabsTrigger>
          <TabsTrigger value="image">Image</TabsTrigger>
        </TabsList>

        <TabsContent value="design">
          <DesignTab
            canvasSize={canvasSize}
            selectedPreset={selectedPreset}
            onPresetChange={(value) => {
              if (value === "custom") return;
              const preset = presetSizes.find((item) => item.value === value);
              if (!preset) return;
              onCanvasSizeChange({
                width: preset.width,
                height: preset.height,
              });
            }}
            onCanvasWidthChange={(width) => {
              onCanvasSizeChange({ width, height: canvasSize.height });
            }}
            onCanvasHeightChange={(height) => {
              onCanvasSizeChange({ width: canvasSize.width, height });
            }}
            backgroundMode={backgroundMode}
            onBackgroundModeChange={setBackgroundMode}
            backgroundColor={backgroundColor}
            onBackgroundColorChange={setBackgroundColor}
            gradientStartColor={gradientStartColor}
            gradientEndColor={gradientEndColor}
            gradientStartOpacity={gradientStartOpacity}
            gradientEndOpacity={gradientEndOpacity}
            gradientAngle={gradientAngle}
            onGradientStartColorChange={setGradientStartColor}
            onGradientEndColorChange={setGradientEndColor}
            onGradientStartOpacityChange={setGradientStartOpacity}
            onGradientEndOpacityChange={setGradientEndOpacity}
            onGradientAngleChange={setGradientAngle}
            gradientLineMode={gradientLineMode}
            onToggleGradientLineMode={() => {
              setGradientLineMode((current) => !current);
            }}
            gradientLineWidth={gradientLineWidth}
            onGradientLineWidthChange={setGradientLineWidth}
            hasSelection={hasSelection}
            onBringForward={() => {
              handleLayerAction((active) => {
                canvas?.bringObjectForward(active);
              });
            }}
            onSendBackward={() => {
              handleLayerAction((active) => {
                canvas?.sendObjectBackwards(active);
              });
            }}
            onBringToFront={() => {
              handleLayerAction((active) => {
                canvas?.bringObjectToFront(active);
              });
            }}
            onSendToBack={() => {
              handleLayerAction((active) => {
                canvas?.sendObjectToBack(active);
              });
            }}
            onDeleteSelected={() => {
              handleLayerAction((active) => {
                canvas?.remove(active);
                canvas?.discardActiveObject();
              });
            }}
          />
        </TabsContent>

        <TabsContent value="text">
          <TextTab
            onAddText={handleAddText}
            fontFamily={fontFamily}
            onFontFamilyChange={(value) => {
              setFontFamily(value);
              const activeText = ensureActiveText();
              if (!activeText) return;
              activeText.set({ fontFamily: value });
              canvas?.requestRenderAll();
            }}
            fontSize={fontSize}
            onFontSizeChange={(value) => {
              setFontSize(value);
              const activeText = ensureActiveText();
              if (!activeText) return;
              activeText.set({ fontSize: value });
              canvas?.requestRenderAll();
            }}
            textColor={textColor}
            onTextColorChange={(value) => {
              setTextColor(value);
              const activeText = ensureActiveText();
              if (!activeText) return;
              activeText.set({ fill: value });
              canvas?.requestRenderAll();
            }}
            textAlign={textAlign}
            onTextAlignChange={(value) => {
              setTextAlign(value);
              const activeText = ensureActiveText();
              if (!activeText) return;
              activeText.set({ textAlign: value });
              canvas?.requestRenderAll();
            }}
          />
        </TabsContent>

        <TabsContent value="image">
          <ImageTab
            fileInputRef={fileInputRef}
            imagePreviewUrl={imagePreviewUrl}
            onImageChange={handleImageChange}
            onAddGradientLayer={handleAddGradientLayer}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

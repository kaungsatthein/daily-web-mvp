import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { presetSizes } from "./presets";

interface DesignTabProps {
  canvasSize: { width: number; height: number };
  selectedPreset: string;
  onPresetChange: (value: string) => void;
  onCanvasWidthChange: (width: number) => void;
  onCanvasHeightChange: (height: number) => void;
  backgroundMode: "solid" | "gradient";
  onBackgroundModeChange: (mode: "solid" | "gradient") => void;
  backgroundColor: string;
  onBackgroundColorChange: (color: string) => void;
  gradientStartColor: string;
  gradientEndColor: string;
  gradientStartOpacity: number;
  gradientEndOpacity: number;
  gradientAngle: number;
  onGradientStartColorChange: (color: string) => void;
  onGradientEndColorChange: (color: string) => void;
  onGradientStartOpacityChange: (opacity: number) => void;
  onGradientEndOpacityChange: (opacity: number) => void;
  onGradientAngleChange: (angle: number) => void;
  gradientLineMode: boolean;
  onToggleGradientLineMode: () => void;
  gradientLineWidth: number;
  onGradientLineWidthChange: (width: number) => void;
  hasSelection: boolean;
  onBringForward: () => void;
  onSendBackward: () => void;
  onBringToFront: () => void;
  onSendToBack: () => void;
  onDeleteSelected: () => void;
}

export const DesignTab = ({
  canvasSize,
  selectedPreset,
  onPresetChange,
  onCanvasWidthChange,
  onCanvasHeightChange,
  backgroundMode,
  onBackgroundModeChange,
  backgroundColor,
  onBackgroundColorChange,
  gradientStartColor,
  gradientEndColor,
  gradientStartOpacity,
  gradientEndOpacity,
  gradientAngle,
  onGradientStartColorChange,
  onGradientEndColorChange,
  onGradientStartOpacityChange,
  onGradientEndOpacityChange,
  onGradientAngleChange,
  gradientLineMode,
  onToggleGradientLineMode,
  gradientLineWidth,
  onGradientLineWidthChange,
  hasSelection,
  onBringForward,
  onSendBackward,
  onBringToFront,
  onSendToBack,
  onDeleteSelected,
}: DesignTabProps) => {
  return (
    <div className="space-y-4 pt-4">
      <div className="space-y-2">
        <Label className="text-xs">Canvas Size</Label>
        <Select value={selectedPreset} onValueChange={onPresetChange}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {presetSizes.map((preset) => (
              <SelectItem key={preset.value} value={preset.value}>
                {preset.label}
              </SelectItem>
            ))}
            <SelectItem value="custom">Custom</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-2">
          <Label className="text-xs">Width</Label>
          <Input
            type="number"
            value={canvasSize.width}
            onChange={(event) => {
              const nextWidth = Number(event.target.value) || 0;
              onCanvasWidthChange(nextWidth);
            }}
            className="h-9"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-xs">Height</Label>
          <Input
            type="number"
            value={canvasSize.height}
            onChange={(event) => {
              const nextHeight = Number(event.target.value) || 0;
              onCanvasHeightChange(nextHeight);
            }}
            className="h-9"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-xs">Background</Label>
        <div className="space-y-2">
          <Select
            value={backgroundMode}
            onValueChange={(value) => {
              const mode = value === "gradient" ? "gradient" : "solid";
              onBackgroundModeChange(mode);
            }}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="solid">Solid</SelectItem>
              <SelectItem value="gradient">Gradient</SelectItem>
            </SelectContent>
          </Select>

          {backgroundMode === "solid" ? (
            <div className="flex gap-2">
              <Input
                type="color"
                value={backgroundColor}
                onChange={(event) => {
                  onBackgroundColorChange(event.target.value);
                }}
                className="h-12 w-30"
              />
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-2">
                <Label className="text-xs">Start</Label>
                <Input
                  type="color"
                  value={gradientStartColor}
                  onChange={(event) => {
                    onGradientStartColorChange(event.target.value);
                  }}
                  className="h-12 w-30"
                />
                <Input
                  type="number"
                  min={0}
                  max={100}
                  value={gradientStartOpacity}
                  onChange={(event) => {
                    const nextOpacity = Number(event.target.value) || 0;
                    onGradientStartOpacityChange(nextOpacity);
                  }}
                  className="h-9"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs">End</Label>
                <Input
                  type="color"
                  value={gradientEndColor}
                  onChange={(event) => {
                    onGradientEndColorChange(event.target.value);
                  }}
                  className="h-12 w-30"
                />
                <Input
                  type="number"
                  min={0}
                  max={100}
                  value={gradientEndOpacity}
                  onChange={(event) => {
                    const nextOpacity = Number(event.target.value) || 0;
                    onGradientEndOpacityChange(nextOpacity);
                  }}
                  className="h-9"
                />
              </div>
              <div className="space-y-2 col-span-2">
                <Label className="text-xs">Angle</Label>
                <Input
                  type="number"
                  min={0}
                  max={360}
                  value={gradientAngle}
                  onChange={(event) => {
                    const nextAngle = Number(event.target.value) || 0;
                    onGradientAngleChange(nextAngle);
                  }}
                  className="h-9"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-xs">Gradient Line</Label>
        <div className="space-y-2">
          <Button
            type="button"
            variant={gradientLineMode ? "default" : "outline"}
            className="w-full"
            onClick={onToggleGradientLineMode}
          >
            {gradientLineMode ? "Stop Drawing" : "Draw Gradient Line"}
          </Button>
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-2">
              <Label className="text-xs">Start</Label>
              <Input
                type="color"
                value={gradientStartColor}
                onChange={(event) => {
                  onGradientStartColorChange(event.target.value);
                }}
                className="h-12 w-30"
              />
              <Input
                type="number"
                min={0}
                max={100}
                value={gradientStartOpacity}
                onChange={(event) => {
                  const nextOpacity = Number(event.target.value) || 0;
                  onGradientStartOpacityChange(nextOpacity);
                }}
                className="h-9"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">End</Label>
              <Input
                type="color"
                value={gradientEndColor}
                onChange={(event) => {
                  onGradientEndColorChange(event.target.value);
                }}
                className="h-12 w-30"
              />
              <Input
                type="number"
                min={0}
                max={100}
                value={gradientEndOpacity}
                onChange={(event) => {
                  const nextOpacity = Number(event.target.value) || 0;
                  onGradientEndOpacityChange(nextOpacity);
                }}
                className="h-9"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-xs">Line Width</Label>
            <Input
              type="number"
              min={1}
              value={gradientLineWidth}
              onChange={(event) => {
                const nextWidth = Number(event.target.value) || 1;
                onGradientLineWidthChange(nextWidth);
              }}
              className="h-9"
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-xs">Layers</Label>
        <div className="grid grid-cols-2 gap-2">
          <Button
            type="button"
            variant="outline"
            className="h-9"
            disabled={!hasSelection}
            onClick={onBringForward}
          >
            Bring Forward
          </Button>
          <Button
            type="button"
            variant="outline"
            className="h-9"
            disabled={!hasSelection}
            onClick={onSendBackward}
          >
            Send Backward
          </Button>
          <Button
            type="button"
            variant="outline"
            className="h-9"
            disabled={!hasSelection}
            onClick={onBringToFront}
          >
            Bring To Front
          </Button>
          <Button
            type="button"
            variant="outline"
            className="h-9"
            disabled={!hasSelection}
            onClick={onSendToBack}
          >
            Send To Back
          </Button>
        </div>
        <Button
          type="button"
          variant="destructive"
          className="h-9 w-full"
          disabled={!hasSelection}
          onClick={onDeleteSelected}
        >
          Delete Selected
        </Button>
      </div>

    </div>
  );
};

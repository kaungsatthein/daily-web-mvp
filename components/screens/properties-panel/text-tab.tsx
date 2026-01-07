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
import { AlignCenter, AlignLeft, AlignRight } from "lucide-react";

interface TextTabProps {
  onAddText: () => void;
  fontFamily: string;
  onFontFamilyChange: (value: string) => void;
  fontSize: number;
  onFontSizeChange: (value: number) => void;
  textColor: string;
  onTextColorChange: (value: string) => void;
  textAlign: "left" | "center" | "right";
  onTextAlignChange: (value: "left" | "center" | "right") => void;
}

export const TextTab = ({
  onAddText,
  fontFamily,
  onFontFamilyChange,
  fontSize,
  onFontSizeChange,
  textColor,
  onTextColorChange,
  textAlign,
  onTextAlignChange,
}: TextTabProps) => {
  return (
    <div className="space-y-4 pt-4">
      <div className="space-y-2">
        <Button type="button" className="w-full" onClick={onAddText}>
          Add Text
        </Button>
      </div>

      <div className="space-y-2">
        <Label className="text-xs">Font Family</Label>
        <Select value={fontFamily} onValueChange={onFontFamilyChange}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="inter">Inter</SelectItem>
            <SelectItem value="poppins">Poppins</SelectItem>
            <SelectItem value="playfair">Playfair Display</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label className="text-xs">Font Size</Label>
        <Input
          type="number"
          min={1}
          value={fontSize}
          onChange={(event) => {
            const nextSize = Number(event.target.value) || 1;
            onFontSizeChange(nextSize);
          }}
          className="h-9"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-xs">Text Color</Label>
        <Input
          type="color"
          value={textColor}
          onChange={(event) => {
            onTextColorChange(event.target.value);
          }}
          className="h-12 w-30"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-xs">Alignment</Label>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-9 bg-transparent"
            onClick={() => onTextAlignChange("left")}
          >
            <AlignLeft className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-9 bg-transparent"
            onClick={() => onTextAlignChange("center")}
          >
            <AlignCenter className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-9 bg-transparent"
            onClick={() => onTextAlignChange("right")}
          >
            <AlignRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

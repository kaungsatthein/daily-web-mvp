import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { AlignLeft, AlignCenter, AlignRight } from "lucide-react";
import { useRef, useState } from "react";
import Image from "next/image";

export function PropertiesPanel() {
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-sm font-semibold text-foreground">Properties</h2>

      <Tabs defaultValue="design" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="design">Design</TabsTrigger>
          <TabsTrigger value="text">Text</TabsTrigger>
          <TabsTrigger value="image">Image</TabsTrigger>
        </TabsList>

        <TabsContent value="design" className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label className="text-xs">Canvas Size</Label>
            <Select defaultValue="1080x1080">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1080x1080">1080 × 1080 (Square)</SelectItem>
                <SelectItem value="1080x1350">
                  1080 × 1350 (Portrait)
                </SelectItem>
                <SelectItem value="1920x1080">
                  1920 × 1080 (Landscape)
                </SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-2">
              <Label className="text-xs">Width</Label>
              <Input type="number" defaultValue="1080" className="h-9" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Height</Label>
              <Input type="number" defaultValue="1080" className="h-9" />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-xs">Background Color</Label>
            <div className="flex gap-2">
              <Input
                type="color"
                defaultValue="#ffffff"
                className="h-12 w-30"
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="text" className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label className="text-xs">Font Family</Label>
            <Select defaultValue="inter">
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
            <Label className="text-xs">Text Color</Label>
            <Input type="color" defaultValue="#000000" className="h-12 w-30" />
          </div>

          <div className="space-y-2">
            <Label className="text-xs">Alignment</Label>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-9  bg-transparent"
              >
                <AlignLeft className="size-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-9  bg-transparent"
              >
                <AlignCenter className="size-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-9  bg-transparent"
              >
                <AlignRight className="size-4" />
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="image" className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label className="text-xs">Upload Image</Label>
            <Input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => fileInputRef.current?.click()}
            >
              Upload Image
            </Button>
          </div>

          {imagePreviewUrl ? (
            <div className="space-y-2">
              <Label className="text-xs">Preview</Label>
              <div className="overflow-hidden rounded-md border border-border bg-muted">
                <div className="relative w-full">
                  <Image
                    src={imagePreviewUrl}
                    alt="Uploaded preview"
                    width={640}
                    height={360}
                    className="h-auto w-full"
                  />
                </div>
              </div>
            </div>
          ) : null}
        </TabsContent>
      </Tabs>
    </div>
  );
}

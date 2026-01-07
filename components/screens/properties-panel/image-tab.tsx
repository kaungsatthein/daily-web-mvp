import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import type { ChangeEvent, RefObject } from "react";

interface ImageTabProps {
  fileInputRef: RefObject<HTMLInputElement | null>;
  imagePreviewUrl: string | null;
  onImageChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onAddGradientLayer: () => void;
}

export const ImageTab = ({
  fileInputRef,
  imagePreviewUrl,
  onImageChange,
  onAddGradientLayer,
}: ImageTabProps) => {
  return (
    <div className="space-y-4 pt-4">
      <div className="space-y-2">
        <Label className="text-xs">Upload Image</Label>
        <Input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={onImageChange}
          className="hidden"
        />
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={() => fileInputRef?.current?.click()}
        >
          Upload Image
        </Button>
      </div>

      <div className="space-y-2">
        <Label className="text-xs">Overlays</Label>
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={onAddGradientLayer}
        >
          Add Gradient Layer
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
    </div>
  );
};

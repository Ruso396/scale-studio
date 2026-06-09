"use client";

import { useEffect, useRef, useState } from "react";
import { ImagePlus, Upload, X, RefreshCw } from "lucide-react";
import Button from "@/components/ui/Button";
import {
  LEAD_IMAGE_MAX_BYTES,
  LEAD_IMAGE_ACCEPTED_TYPES,
  LEAD_IMAGE_ACCEPTED_EXTENSIONS,
} from "@/constants/lead-image";
import { cn } from "@/utils/cn";

const ACCEPTED_TYPES: string[] = [...LEAD_IMAGE_ACCEPTED_TYPES];
const ACCEPTED_EXTENSIONS = LEAD_IMAGE_ACCEPTED_EXTENSIONS;

interface LeadImageUploadProps {
  existingImage?: string | null;
  onFileChange: (file: File | null) => void;
  onRemove: () => void;
  disabled?: boolean;
  compact?: boolean;
}

function validateFile(file: File): string | null {
  if (!ACCEPTED_TYPES.includes(file.type)) {
    return "Only JPG, JPEG, PNG and WEBP images are allowed";
  }

  if (file.size > LEAD_IMAGE_MAX_BYTES) {
    return "Image must be 5MB or smaller";
  }

  return null;
}

export default function LeadImageUpload({
  existingImage,
  onFileChange,
  onRemove,
  disabled = false,
  compact = false,
}: LeadImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [removed, setRemoved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const displayUrl = removed
    ? previewUrl
    : previewUrl ?? existingImage ?? null;

  useEffect(() => {
    return () => {
      if (previewUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const applyFile = (file: File) => {
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    setRemoved(false);
    setSelectedFile(file);
    onFileChange(file);

    if (previewUrl?.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }

    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      applyFile(file);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragActive(false);

    if (disabled) return;

    const file = event.dataTransfer.files?.[0];
    if (file) {
      applyFile(file);
    }
  };

  const handleRemove = () => {
    if (previewUrl?.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }

    setPreviewUrl(null);
    setSelectedFile(null);
    setRemoved(true);
    setError(null);
    onFileChange(null);
    onRemove();

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className={cn("space-y-1.5", compact && "space-y-1")}>
      <label className="text-xs font-medium text-muted sm:text-sm">
        Lead Image
      </label>

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_EXTENSIONS}
        className="hidden"
        disabled={disabled}
        onChange={handleInputChange}
      />

      {displayUrl ? (
        <div className="overflow-hidden rounded-xl border border-border bg-secondary/30">
          <div
            className={cn(
              "relative w-full overflow-hidden bg-background/40",
              compact ? "h-28 sm:h-32" : "aspect-[16/10]"
            )}
          >
            <img
              src={displayUrl}
              alt="Lead preview"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d1b2a]/80 via-transparent to-transparent" />
          </div>

          <div
            className={cn(
              "flex flex-wrap items-center justify-between gap-2 border-t border-border/60",
              compact ? "p-2.5" : "gap-3 p-4"
            )}
          >
            <div className="min-w-0">
              <p className="truncate text-xs font-medium sm:text-sm">
                {selectedFile ? selectedFile.name : "Current lead image"}
              </p>
              <p className="text-[11px] text-muted sm:text-xs">
                {selectedFile
                  ? `${(selectedFile.size / 1024 / 1024).toFixed(2)} MB`
                  : "JPG, PNG or WEBP · Max 5MB"}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={disabled}
                onClick={() => inputRef.current?.click()}
              >
                <RefreshCw className="h-3.5 w-3.5" />
                Replace
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                disabled={disabled}
                onClick={handleRemove}
              >
                <X className="h-3.5 w-3.5" />
                Remove
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div
          onDragEnter={(event) => {
            event.preventDefault();
            if (!disabled) setDragActive(true);
          }}
          onDragLeave={(event) => {
            event.preventDefault();
            setDragActive(false);
          }}
          onDragOver={(event) => event.preventDefault()}
          onDrop={handleDrop}
          className={cn(
            "flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed text-center transition-all",
            compact ? "px-4 py-5" : "rounded-2xl px-6 py-10",
            dragActive
              ? "border-accent bg-accent/10 shadow-[0_0_32px_rgba(201,168,76,0.12)]"
              : "border-border/70 bg-secondary/20 hover:border-accent/40 hover:bg-secondary/30",
            disabled && "cursor-not-allowed opacity-60"
          )}
          onClick={() => !disabled && inputRef.current?.click()}
          role="button"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              if (!disabled) inputRef.current?.click();
            }
          }}
        >
          <div
            className={cn(
              "mb-2 flex items-center justify-center rounded-xl bg-accent/10 ring-1 ring-accent/20",
              compact ? "h-9 w-9" : "mb-4 h-14 w-14 rounded-2xl"
            )}
          >
            {dragActive ? (
              <Upload className={cn("text-accent", compact ? "h-4 w-4" : "h-6 w-6")} />
            ) : (
              <ImagePlus className={cn("text-accent", compact ? "h-4 w-4" : "h-6 w-6")} />
            )}
          </div>
          <p className={cn("font-semibold", compact ? "text-xs" : "text-sm")}>
            {compact ? "Drop image or click to upload" : "Drag & drop lead image here"}
          </p>
          <p className="mt-0.5 text-[11px] text-muted sm:text-xs">
            JPG, PNG, WEBP · Max 5MB
          </p>
        </div>
      )}

      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}

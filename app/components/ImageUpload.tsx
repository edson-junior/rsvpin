'use client';

import { useState, useRef } from 'react';
import { LuUpload, LuX } from 'react-icons/lu';
import Image from 'next/image';

type Props = {
  name: string;
  defaultValue?: string | null;
};

export function ImageUpload({ name, defaultValue }: Props) {
  const [preview, setPreview] = useState<string | null>(defaultValue ?? null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Upload selected file to /api/upload and store the returned URL
  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setUploading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data: { url?: string; error?: string } = await response.json();

      if (!response.ok) {
        setError(data.error ?? 'Upload failed');
        return;
      }

      if (data.url) {
        setPreview(data.url);
      }
    } catch {
      setError('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  }

  // Clear preview and reset file input
  function handleRemove() {
    setPreview(null);
    setError(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }

  return (
    <div>
      {/* Hidden input carries the Cloudinary URL into the form submission */}
      <input type="hidden" name={name} value={preview ?? ''} />

      {/* Show image preview with remove button, or dropzone prompt */}
      {preview ? (
        <div className="relative aspect-2/1 rounded-xl overflow-hidden bg-secondary">
          <Image
            src={preview}
            alt="Event image preview"
            fill
            className="object-cover"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
          >
            <LuX className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <label
          htmlFor="image-upload"
          className="flex flex-col items-center justify-center aspect-2/1 rounded-xl border-2 border-dashed border-border bg-secondary/50 cursor-pointer hover:bg-secondary/80 transition-colors"
        >
          {uploading ? (
            <p className="text-sm text-muted-foreground">Uploading...</p>
          ) : (
            <>
              <LuUpload className="w-8 h-8 text-muted-foreground mb-2" />
              <p className="text-sm font-medium text-foreground">
                Upload event image
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                JPG, PNG or WebP, max 5MB
              </p>
            </>
          )}
        </label>
      )}

      {/* Visually hidden file input triggered by the dropzone label */}
      <input
        ref={inputRef}
        id="image-upload"
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={handleChange}
        disabled={uploading}
      />

      {error && <p className="text-xs text-destructive mt-1">{error}</p>}
    </div>
  );
}

import React, { useRef, useState } from 'react';
import { Upload, X } from 'lucide-react';

interface ImageUploadProps {
  onImagesSelected: (images: string[]) => void;
  maxImages?: number;
  existingImages?: string[];
  onRemoveImage?: (index: number) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onImagesSelected,
  maxImages = 5,
  existingImages = [],
  onRemoveImage
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previews, setPreviews] = useState<string[]>(existingImages);
  const [dragActive, setDragActive] = useState(false);

  const handleFiles = (files: FileList) => {
    const remainingSlots = maxImages - previews.length;
    const filesToProcess = Array.from(files).slice(0, remainingSlots);

    const fileReaders = filesToProcess.map(file => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result as string);
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(fileReaders).then(results => {
      const updatedPreviews = [...previews, ...results];
      setPreviews(updatedPreviews);
      onImagesSelected(updatedPreviews);
    });
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleRemove = (index: number) => {
    const newPreviews = previews.filter((_, i) => i !== index);
    setPreviews(newPreviews);
    onImagesSelected(newPreviews);
    if (onRemoveImage) {
      onRemoveImage(index);
    }
  };

  return (
    <div className="w-full">
      <div
        className={`relative p-4 border-2 border-dashed rounded-lg ${
          dragActive ? 'border-primary-500 bg-primary-50' : 'border-neutral-300'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleChange}
          className="hidden"
        />
        
        {previews.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
            {previews.map((preview, index) => (
              <div key={index} className="relative group">
                <img
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        ) : null}

        {previews.length < maxImages && (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full py-4 flex flex-col items-center justify-center text-neutral-600 hover:text-primary-600 transition-colors"
          >
            <Upload className="w-8 h-8 mb-2" />
            <p className="text-sm font-medium">
              Drop images here or click to upload
            </p>
            <p className="text-xs text-neutral-500 mt-1">
              {maxImages - previews.length} image{maxImages - previews.length !== 1 ? 's' : ''} remaining
            </p>
          </button>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;

import { useState } from "react";
import { Upload, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface FileUploadCardProps {
  title: string;
  description: string;
  acceptedFiles?: string;
  onFileUpload?: (file: File) => void;
  className?: string;
}

export function FileUploadCard({
  title,
  description,
  acceptedFiles = "application/pdf,image/jpeg,image/png",
  onFileUpload,
  className,
}: FileUploadCardProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (isUploading || isComplete) return;
    
    setIsUploading(true);
    setFileName(file.name);

    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setUploadProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        setIsUploading(false);
        setIsComplete(true);
        if (onFileUpload) onFileUpload(file);
      }
    }, 100);
  };

  const reset = () => {
    setIsUploading(false);
    setUploadProgress(0);
    setIsComplete(false);
    setFileName("");
  };

  return (
    <Card 
      className={cn(
        "border-dashed transition-all", 
        isDragging ? "border-tax-primary bg-tax-light/30" : "border-border", 
        className
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <CardContent className="p-6 flex flex-col items-center justify-center text-center min-h-[200px]">
        {!isUploading && !isComplete ? (
          <>
            <div className="w-12 h-12 rounded-full bg-tax-light flex items-center justify-center mb-4">
              <Upload className="h-6 w-6 text-tax-primary" />
            </div>
            <h3 className="text-lg font-medium mb-1">{title}</h3>
            <p className="text-sm text-muted-foreground mb-4">{description}</p>
            <label className="inline-block">
              <input
                type="file"
                className="hidden"
                accept={acceptedFiles}
                onChange={handleFileChange}
              />
              <span className="px-4 py-2 rounded-lg bg-tax-primary text-white text-sm font-medium cursor-pointer hover:bg-tax-primary/90 transition-colors inline-block">
                Browse Files
              </span>
            </label>
            <p className="text-xs text-muted-foreground mt-4">
              Drag and drop or click to browse
            </p>
          </>
        ) : (
          <div className="w-full">
            <div className="flex items-center mb-2">
              <div className="w-10 h-10 rounded-full bg-tax-light flex items-center justify-center mr-3">
                {isComplete ? (
                  <Check className="h-5 w-5 text-tax-primary" />
                ) : (
                  <Upload className="h-5 w-5 text-tax-primary" />
                )}
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-medium truncate max-w-[200px]">{fileName}</p>
                <p className="text-xs text-muted-foreground">
                  {isComplete ? "Upload complete" : "Uploading..."}
                </p>
              </div>
            </div>
            
            {isUploading && (
              <Progress value={uploadProgress} className="h-1 w-full mt-2" />
            )}
            
            {isComplete && (
              <button
                onClick={reset}
                className="text-sm text-tax-primary hover:underline mt-4"
              >
                Upload another file
              </button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

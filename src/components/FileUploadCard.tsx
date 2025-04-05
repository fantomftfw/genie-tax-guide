
import { useState } from "react";
import { Upload, Check, File, FileText } from "lucide-react";
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
    if (isUploading) return;
    
    setIsUploading(true);
    setFileName(file.name);
    setIsComplete(false);
    
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setUploadProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        
        // Simulate a small delay before marking as complete
        setTimeout(() => {
          setIsUploading(false);
          setIsComplete(true);
          if (onFileUpload) onFileUpload(file);
        }, 500);
      }
    }, 100);
  };

  const getFileIcon = () => {
    if (fileName.toLowerCase().endsWith('.pdf')) {
      return <FileText className="h-6 w-6 text-red-500" />;
    }
    if (fileName.toLowerCase().match(/\.(jpe?g|png|gif)$/)) {
      return <FileText className="h-6 w-6 text-blue-500" />;
    }
    return <File className="h-6 w-6 text-gray-500" />;
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
        "border-dashed transition-all h-full", 
        isDragging ? "border-accent bg-accent/5 shadow-md" : "border-border", 
        className
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
        {!isUploading && !isComplete ? (
          <>
            <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mb-4 animate-pulse-slow">
              <Upload className="h-8 w-8 text-accent" />
            </div>
            <h3 className="text-lg font-medium mb-1">{title}</h3>
            <p className="text-sm text-muted-foreground mb-6">{description}</p>
            <label className="inline-block">
              <input
                type="file"
                className="hidden"
                accept={acceptedFiles}
                onChange={handleFileChange}
              />
              <div className="px-4 py-2 rounded-lg bg-accent text-white text-sm font-medium cursor-pointer hover:bg-accent/90 shadow-sm hover:shadow transition-all inline-flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Browse Files
              </div>
            </label>
            <p className="text-xs text-muted-foreground mt-4">
              PDF, JPG, PNG up to 10MB
            </p>
          </>
        ) : (
          <div className="w-full">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mr-4">
                {isComplete ? (
                  <Check className="h-6 w-6 text-accent" />
                ) : (
                  getFileIcon()
                )}
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium truncate max-w-[200px]">{fileName}</p>
                <p className="text-sm text-muted-foreground">
                  {isComplete ? "Upload complete" : "Uploading..."}
                </p>
              </div>
            </div>
            
            {isUploading && (
              <>
                <Progress value={uploadProgress} className="h-1.5 mb-1" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{uploadProgress}%</span>
                  <span>{Math.round(uploadProgress * 1.8)} KB / {Math.round(100 * 1.8)} KB</span>
                </div>
              </>
            )}
            
            {isComplete && (
              <div className="mt-6 text-center">
                <p className="text-sm text-green-600 mb-4">File uploaded successfully!</p>
                <button
                  onClick={reset}
                  className="text-sm px-4 py-2 border border-border rounded-md hover:bg-muted transition-colors"
                >
                  Upload another file
                </button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, File, X } from 'lucide-react';
import Button from './Button';

interface FileUploadProps {
  onFilesAccepted: (files: any[]) => void;
  maxFiles?: number;
  maxSize?: number;
  acceptedFileTypes?: Record<string, string[]>;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFilesAccepted,
  maxFiles = 10,
  maxSize = 10485760, // 10MB
  acceptedFileTypes = {
    'application/pdf': ['.pdf'],
    'application/msword': ['.doc'],
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    'text/plain': ['.txt'],
    'text/html': ['.html', '.htm'],
    'image/png': ['.png'],
    'image/jpeg': ['.jpg', '.jpeg'],
  },
}) => {
  const onDrop = useCallback((acceptedFiles: any[]) => {
    onFilesAccepted(acceptedFiles);
  }, [onFilesAccepted]);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    maxFiles,
    maxSize,
    accept: acceptedFileTypes,
  });

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}
          ${isDragAccept ? 'border-green-500 bg-green-50' : ''}
          ${isDragReject ? 'border-red-500 bg-red-50' : ''}
        `}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center space-y-3">
          <Upload className={`w-12 h-12 ${isDragActive ? 'text-blue-500' : 'text-gray-400'}`} />
          <div className="text-sm">
            <p className="font-medium text-gray-700">
              {isDragActive
                ? "Drop your files here..."
                : "Drag & drop files here, or click to select"}
            </p>
            <p className="text-gray-500 mt-1">
              Supports PDF, DOCX, TXT, HTML, and images
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="mt-4"
          >
            Select Files
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
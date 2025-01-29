import React, { useState } from "react";
import { X, Upload } from "lucide-react";
import ToastNotification from "../shared/ToastNotification";

interface FileItem {
  name: string;
  size: number;
}

const CVUpload: React.FC = () => {
  const [files, setFiles] = useState<FileItem[]>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = event.target.files ? Array.from(event.target.files) : [];
    const validFiles = uploadedFiles.filter(
      (file) => file.type === "application/pdf" && file.size <= 1024 * 1024
    );

    if (files.length + validFiles.length > 5) {
        ToastNotification({
            title: "Maximum CVs Reached",
            description: "You can upload a maximum of 5 CVs at once.",
            type: "error",
          });
    
      return;
    }

    setFiles([...files, ...validFiles.map(file => ({ name: file.name, size: file.size }))]);
  };

  const handleRemove = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full">
      {/* <h2 className="text-xl font-semibold mb-2">Upload CV</h2>
      <p className="text-gray-500 mb-4">Please upload a maximum of 5 CVs at once</p> */}
      
      <label className="border border-dashed bg-main-100 border-main-500 p-4 flex flex-col items-center cursor-pointer rounded ">
        <Upload className="w-6 h-6 text-blue-500" />
        <span className="text-sm text-gray-600">Attach Document</span>
        <span className="text-xs text-gray-400">PDF - not more than 1MB</span>
        <input type="file" className="hidden" accept=".pdf" multiple onChange={handleFileUpload} />
      </label>
      
      {files.length > 0 && (
        <div className="mt-4">
          <h3 className="font-medium mb-2">Uploaded Files</h3>
          <ul className="space-y-2">
            {files.map((file, index) => (
              <li key={index} className="flex justify-between items-center bg-gray-100 p-3 rounded-md">
                <div className="flex items-center space-x-3">
                  <span className="text-red-500">PDF</span>
                  <span className="text-sm">{file.name}</span>
                </div>
                <button onClick={() => handleRemove(index)} className="text-gray-600 hover:text-red-600">
                  <X size={16} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CVUpload;

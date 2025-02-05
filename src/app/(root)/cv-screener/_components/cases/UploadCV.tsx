"use client";
import React from "react";
import { Upload, X } from "lucide-react";
import SubmitButton from "@/components/shared/SubmitButton";
import { UploadCVProps } from "@/types";
import Image from "next/image";
import Pdf from "@/public/svgs/cs-scoring/pdf-cv-screener.svg"


const UploadCV: React.FC<UploadCVProps> = ({ files, handleFileUpload, handleRemove, onSubmit, isLoadCVScreener }) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="flex flex-col gap-2 lg:w-1/2">
        <h2 className="text-lg font-bold">Upload CV</h2>
        <p className="text-gray-600">Attach the candidate's CV for screening.</p>

       
        <div className="w-full">
          <label className="border border-dashed bg-main-100 border-main-500 p-4 flex flex-col items-center cursor-pointer rounded">
            <Upload className="w-6 h-6 text-blue-500" />
            <span className="text-sm text-gray-600">Attach Document</span>
            <span className="text-xs text-gray-400">PDF - not more than 1MB</span>
            <input
              type="file"
              className="hidden"
              accept=".pdf"
              multiple
              onChange={handleFileUpload}
            />
          </label>

         
          {files.length > 0 && (
            <div className="mt-4">
              <h3 className="font-medium mb-2">Uploaded Files</h3>
              <ul className="space-y-2">
                {files.map((file, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center bg-gray-100 p-3 rounded-md"
                  >
                    <div className="flex items-center space-x-3">
                      <Image src={Pdf} alt="pdf image" width={50} height={50} />
                      <span className="text-sm">{file.name}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemove(index)}
                      className="text-gray-600 hover:text-red-600"
                    >
                      <X size={16} />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

     
        <div className="flex justify-end items-center">
          <SubmitButton isLoading={isLoadCVScreener} className="w-full sm:w-[120px] h-11 mt-2">Submit</SubmitButton>
        </div>
      </div>
    </form>
  );
};

export default UploadCV;

import { uploadOrderDocument } from "@/lib/upload-order-document";
import { useState } from "react";

export const UploadOrderDocument = ({ orderId }: { orderId: string }) => {
  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "uploading" | "done" | "error"
  >("idle");

  const handleFileUpload = async (file: File) => {
    try {
      setUploadStatus("uploading");

      await uploadOrderDocument(orderId, file);

      setUploadStatus("done");
    } catch (e) {
      console.error(e);
      setUploadStatus("error");
    }
  };

  if (uploadStatus === "uploading") {
    return (
      <button
        type="button"
        disabled
        className="inline-flex items-center gap-2 rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-500"
      >
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600" />
        Uploading...
      </button>
    );
  }

  if (uploadStatus === "done") {
    return (
      <div className="inline-flex items-center gap-2 rounded-md bg-green-50 px-4 py-2 text-sm font-medium text-green-700">
        <span>✓</span>
        Document uploaded
      </div>
    );
  }

  if (uploadStatus === "error") {
    return (
      <div className="flex items-center gap-3">
        <span className="text-sm text-red-600">Upload failed</span>

        <label className="cursor-pointer rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-700">
          Try again
          <input
            type="file"
            accept="image/*,application/pdf"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];

              if (file) {
                handleFileUpload(file);
              }
            }}
          />
        </label>
      </div>
    );
  }

  return (
    <label className="inline-flex cursor-pointer items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.98]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.8}
        stroke="currentColor"
        className="h-5 w-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 16V4m0 0L8 8m4-4 4 4M5 20h14"
        />
      </svg>
      Upload document
      <input
        type="file"
        accept="image/*,application/pdf"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];

          if (file) {
            handleFileUpload(file);
          }
        }}
      />
    </label>
  );
};

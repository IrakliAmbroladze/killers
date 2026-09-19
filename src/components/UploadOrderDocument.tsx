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
      if (e instanceof Error) {
        console.log(e.message);
      } else {
        console.log("Unknown error", e);
      }

      setUploadStatus("error");
    }
  };

  if (uploadStatus === "idle") {
    return (
      <div>
        upload doc
        <input
          type="file"
          accept="image/*,application/pdf"
          onChange={(e) => {
            const file = e.target.files?.[0];

            if (file) {
              handleFileUpload(file);
            }
          }}
        />
      </div>
    );
  }

  if (uploadStatus === "uploading") {
    return <div>uploading ...</div>;
  }

  if (uploadStatus === "error") {
    return <div>error ...</div>;
  }

  if (uploadStatus === "done") {
    return <div>done</div>;
  }
};

import { RefObject, useState } from "react";
import { useRouter } from "next/navigation";
import { uploadOrderDocument } from "@/lib/upload-order-document";
import { SignatureCanvasRef } from "@/components/Signature/SignatureCanvas";
import { AcceptanceFormData } from "@/types";

type Params = {
  orderId: string;
  formData: AcceptanceFormData;
  customerSigRef: RefObject<SignatureCanvasRef | null>;
  executorSigRef: RefObject<SignatureCanvasRef | null>;
  setError: (error: string | null) => void;
};

export type UploadStatus = "idle" | "uploading" | "done" | "error";

export const useBtnClicks = ({
  orderId,
  formData,
  customerSigRef,
  executorSigRef,
  setError,
}: Params) => {
  const router = useRouter();
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("idle");

  const validateForm = () => {
    if (!customerSigRef.current || !executorSigRef.current) {
      return "Signatures not ready";
    }
    if (customerSigRef.current.isEmpty()) {
      return "Customer signature is required";
    }
    if (executorSigRef.current.isEmpty()) {
      return "Executor signature is required";
    }
    return null;
  };

  const generatePdfBlob = async (): Promise<Blob | null> => {
    setError(null);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return null;
    }

    const customerPng = customerSigRef.current!.getDataURL();
    const executorPng = executorSigRef.current!.getDataURL();

    const acceptanceData: AcceptanceFormData = {
      ...formData,
      customer: {
        name: formData.customer.name,
        signature: customerPng,
        personalNumber: formData.customer.personalNumber,
        representative: {
          name: formData.customer.representative.name,
          id: formData.customer.representative.id,
        },
      },
      executor: { signature: executorPng },
    };

    const url = "/api/documents/acceptance";

    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(acceptanceData),
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      const err = await res.json().catch(() => null);
      setError(err?.error ?? "PDF generation failed.");
      return null;
    }

    return await res.blob();
  };

  const handleUpload = async () => {
    // Open the window immediately (inside the click) to avoid popup blockers
    const newWindow = window.open("", "_blank");

    try {
      setUploadStatus("uploading");

      const blob = await generatePdfBlob();
      // if (!blob) {
      //   newWindow?.close();
      //   setUploadStatus("error");
      //   return;
      // }
      //
      // const file = new File([blob], "acceptance_document.pdf", {
      //   type: "application/pdf",
      // });
      //
      // await uploadOrderDocument(orderId, file);
      //
      // // Show the PDF in the blank window
      // const url = URL.createObjectURL(blob);
      // if (newWindow) {
      //   newWindow.location.href = url;
      // }
      //
      // router.refresh();
      setUploadStatus("done");
    } catch (e) {
      console.error(e);
      newWindow?.close();
      setError("Upload failed. Please try again.");
      setUploadStatus("error");
    }
  };

  return { handleUpload, generatePdfBlob, uploadStatus };
};

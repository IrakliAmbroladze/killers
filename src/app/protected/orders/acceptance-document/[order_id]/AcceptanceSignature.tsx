"use client";
import { SignatureField } from "@/components";
import { useState, useRef } from "react";
import { SignatureCanvasRef } from "@/components/Signature/SignatureCanvas";
import { AcceptanceFormData } from "@/types";
import { useBtnClicks } from "./hooks/useBtnClicks";
import { useParams } from "next/navigation";

export default function AcceptanceSignature({
  formData,
}: {
  formData: AcceptanceFormData;
}) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const customerSigRef = useRef<SignatureCanvasRef | null>(null);
  const executorSigRef = useRef<SignatureCanvasRef | null>(null);

  const [error, setError] = useState<string | null>(null);
  const { order_id } = useParams<{ order_id: string }>();

  const { handleUpload, uploadStatus } = useBtnClicks({
    orderId: order_id,
    formData,
    customerSigRef,
    executorSigRef,
    setError,
  });

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

  const handleOk = async () => {
    setError(null);
    const error = validateForm();

    if (error) {
      setError(error);
      return;
    }
    if (!customerSigRef.current || !executorSigRef.current) return;
    const customerPng = customerSigRef.current.getDataURL();
    const executorPng = executorSigRef.current.getDataURL();

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

    const res = await fetch("/api/documents/acceptance", {
      method: "POST",
      body: JSON.stringify(acceptanceData),
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      const error = await res.json();
      setError(error.error ?? "PDF generation failed.");
      return;
    }

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);

    // Trigger download
    /*   const a = document.createElement("a");
    a.href = url;
    a.download = "acceptance_document.pdf";
    a.click();*/
    if (iframeRef.current) {
      iframeRef.current.src = url;
    }
  };

  const handleDownload = async () => {
    setError(null);

    const error = validateForm();
    if (error) {
      setError(error);
      return;
    }
    if (!customerSigRef.current || !executorSigRef.current) return;

    const customerPng = customerSigRef.current.getDataURL();
    const executorPng = executorSigRef.current.getDataURL();

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

    const res = await fetch("/api/documents/acceptance", {
      method: "POST",
      body: JSON.stringify(acceptanceData),
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      const error = await res.json();
      setError(error.error ?? "PDF generation failed.");
      return;
    }

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);

    // Trigger download
    const a = document.createElement("a");
    a.href = url;
    a.download = "acceptance_document.pdf";
    a.click();
    /* if (iframeRef.current) {
      iframeRef.current.src = url;
    }*/
  };

  return (
    <div className="flex flex-col">
      <div className="my-2.5 flex sm:justify-between flex-col gap-10 md:flex-row">
        <div className="flex flex-col justify-between">
          <div className="flex flex-col ">
            <div>ხელმოწერა</div>
            <div className="w-[300px]">
              <SignatureField
                onReadyAction={(api) => (customerSigRef.current = api)}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <h2 className="font-bold ">შემსრულებელი</h2>
          <div>ხელმოწერა</div>
          <div className="w-[300px]">
            <SignatureField
              onReadyAction={(api) => (executorSigRef.current = api)}
            />
          </div>
        </div>
      </div>{" "}
      {error && <p className="text-red-600">{error}</p>}
      <div className="flex">
        <button
          className="w-28 px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-20 cursor-pointer active:scale-95 disabled:active:scale-100 disabled:cursor-auto m-auto"
          onClick={handleOk}
        >
          preview
        </button>
        <button
          className="w-28 px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-20 cursor-pointer active:scale-95 disabled:active:scale-100 disabled:cursor-auto m-auto"
          onClick={handleUpload}
          disabled={uploadStatus === "uploading"}
        >
          {uploadStatus === "uploading"
            ? "uploading..."
            : uploadStatus === "done"
              ? "uploaded ✓"
              : "upload"}
        </button>
        <button
          className="w-28 px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-20 cursor-pointer active:scale-95 disabled:active:scale-100 disabled:cursor-auto m-auto"
          onClick={handleDownload}
        >
          download
        </button>
      </div>
      <iframe
        ref={iframeRef}
        style={{
          width: "100%",
          height: "100vh",
          border: "1px solid #ccc",
        }}
      />
    </div>
  );
}

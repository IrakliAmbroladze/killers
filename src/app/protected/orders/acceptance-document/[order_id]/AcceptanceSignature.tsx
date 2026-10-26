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
      <div className="flex m-5">
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
      </div>
    </div>
  );
}

"use client";
import { SignatureField } from "@/components";
import { useState, useRef } from "react";
import { SignatureCanvasRef } from "@/components/Signature/SignatureCanvas";
import { AcceptanceFormData } from "@/types";

export default function AcceptanceSignature({
  formData,
}: {
  formData: AcceptanceFormData;
}) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const customerSigRef = useRef<SignatureCanvasRef | null>(null);
  const executorSigRef = useRef<SignatureCanvasRef | null>(null);

  const [error, setError] = useState<string | null>(null);

  const handleOk = async () => {
    if (!customerSigRef.current || !executorSigRef.current) {
      setError("Signatures not ready");
      return;
    }

    if (customerSigRef.current.getDataURL().endsWith("AAAA")) {
      setError("Customer signature is empty");
      return;
    }

    if (executorSigRef.current.getDataURL().endsWith("AAAA")) {
      setError("Executor signature is empty");
      return;
    }

    if (customerSigRef.current.isEmpty()) {
      setError("Customer signature is required");
      return;
    }
    if (executorSigRef.current.isEmpty()) {
      setError("Executor signature is required");
      return;
    }

    const customerPng = customerSigRef.current.getDataURL();
    const executorPng = executorSigRef.current.getDataURL();

    const acceptanceData: AcceptanceFormData = {
      ...formData,
      customer: {
        name: formData.customer.name,
        signature: customerPng,
        personalNumber: formData.customer.personalNumber,
      },
      executor: { signature: executorPng },
    };

    const res = await fetch("/api/documents/acceptance", {
      method: "POST",
      body: JSON.stringify(acceptanceData),
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      return alert("PDF generation failed.");
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

  return (
    <div className="flex flex-col">
      <div className="my-2.5 flex sm:justify-between flex-col gap-10 md:gap-0 md:flex-row">
        <div className="flex flex-col justify-between">
          <h2 className="font-bold ">დამკვეთის წარმომადგენელი</h2>
          <div className="flex flex-col ">
            <label>
              სახელი, გვარი <input type="text" className="border-b" />
            </label>{" "}
            <label>
              პირადი ნომერი <input type="text" className="border-b" />
            </label>{" "}
            <div>ხელმოწერა</div>
            <div className="w-[320px]">
              <SignatureField
                onReadyAction={(api) => (customerSigRef.current = api)}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <h2 className="font-bold ">შემსრულებელი</h2>
          <div>ხელმოწერა</div>
          <div className="w-[320px]">
            <SignatureField
              onReadyAction={(api) => (executorSigRef.current = api)}
            />
          </div>
        </div>
      </div>{" "}
      {error && <p className="text-red-600">{error}</p>}
      <button
        className="w-28 px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-20 cursor-pointer active:scale-95 disabled:active:scale-100 disabled:cursor-auto m-auto"
        onClick={handleOk}
      >
        OK
      </button>
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

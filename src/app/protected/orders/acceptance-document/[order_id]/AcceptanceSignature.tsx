"use client";
import { SignatureField } from "@/components";
import { useState, useRef } from "react";
import { SignatureCanvasRef } from "@/components/Signature/SignatureCanvas";

export default function AcceptanceSignature() {
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

    /* await fetch("/api/documents/acceptance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customerSignature: customerPng,
        executorSignature: executorPng,
      }),
    });*/
    const res = await fetch("/api/documents/acceptance", {
      method: "POST",
      body: JSON.stringify({
        customerName: "John Doe",
        orderId: "ORDER-123",
        customerSignature: customerPng,
        executorSignature: executorPng,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      return alert("PDF generation failed.");
    }

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);

    // Trigger download
    const a = document.createElement("a");
    a.href = url;
    a.download = "acceptance_document.pdf";
    a.click();

    console.log("Signatures accepted & sent");
    console.log(customerPng);
    console.log(executorPng);
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
    </div>
  );
}

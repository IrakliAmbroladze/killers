"use client";
import { useRef } from "react";
import { SignatureCanvas, SignatureCanvasRef } from "./SignatureCanvas";

export const SignatureField = ({
  onReadyAction,
}: {
  onReadyAction: (api: SignatureCanvasRef) => void;
}) => {
  const sigRef = useRef<SignatureCanvasRef | null>(null);
  return (
    <>
      <SignatureCanvas
        onReadyAction={(api) => {
          sigRef.current = api;
          onReadyAction(api);
        }}
      />
      <button
        className="px-4 py-2 bg-gray-200 rounded text-[#000] cursor-pointer hover:scale-105 active:scale-95"
        onClick={() => {
          sigRef.current?.clear();
        }}
      >
        Clear
      </button>
    </>
  );
};

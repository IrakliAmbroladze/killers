"use client";
import { useEffect, useRef } from "react";
import SignaturePad from "signature_pad";

export type SignatureCanvasRef = {
  clear: () => void;
  getDataURL: () => string;
  isEmpty: () => boolean;
};

export const SignatureCanvas = ({
  onReadyAction,
}: {
  onReadyAction: (ref: SignatureCanvasRef) => void;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const padRef = useRef<SignaturePad | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    canvas.width = canvas.offsetWidth * 2;
    canvas.height = canvas.offsetHeight * 2;
    canvas.getContext("2d")?.scale(2, 2);

    padRef.current = new SignaturePad(canvas, {
      backgroundColor: "white",
      penColor: "#000080",
    });

    onReadyAction({
      clear: () => padRef.current?.clear(),
      getDataURL: () => padRef.current!.toDataURL(),
      isEmpty: () => padRef.current?.isEmpty() ?? true,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <canvas
      ref={canvasRef}
      className="border rounded-md w-full h-40 bg-white"
    />
  );
};

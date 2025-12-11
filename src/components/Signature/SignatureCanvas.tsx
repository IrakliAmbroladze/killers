"use client";
import { useEffect, useRef } from "react";
import SignaturePad from "signature_pad";

export const SignatureCanvas = () => {
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

    /*   if (props.onReady) {
      props.onReady({
        clear: () => padRef.current?.clear(),
        getDataURL: () => padRef.current!.toDataURL(),
      });
    }*/
  }, []);
  return (
    <canvas
      ref={canvasRef}
      className="border rounded-md w-full h-56 bg-white"
    />
  );
};

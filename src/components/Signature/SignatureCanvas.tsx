"use client";
import { useRef } from "react";

export const SignatureCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  return <canvas className="border rounded-md w-full h-56 bg-white" />;
};

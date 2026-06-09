"use client";

import { Toaster as Sonner } from "sonner";

export default function Toaster() {
  return (
    <Sonner
      position="top-right"
      toastOptions={{
        style: {
          background: "#1b263b",
          border: "1px solid #2a3a52",
          color: "#ffffff",
        },
      }}
    />
  );
}

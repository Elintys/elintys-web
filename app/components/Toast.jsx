"use client";

import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

function Toast({ message, seconds = 5, onDone }) {
  const [remaining, setRemaining] = useState(seconds);

  useEffect(() => {
    setRemaining(seconds);
    const timer = window.setInterval(() => {
      setRemaining((value) => {
        if (value <= 1) {
          window.clearInterval(timer);
          return 0;
        }
        return value - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [seconds, message]);

  useEffect(() => {
    if (remaining === 0 && onDone) {
      onDone();
    }
  }, [remaining, onDone]);

  return (
    <div className="fixed right-6 top-6 z-[9999] flex items-center gap-2 rounded-xl bg-gray-900 px-4 py-3 text-sm text-white shadow-xl">
      <span>{message}</span>
      <span className="font-semibold">{remaining}s</span>
    </div>
  );
}

let toastRoot = null;
let toastContainer = null;

export const showToast = (message, seconds = 5) => {
  if (typeof window === "undefined") return;
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    document.body.appendChild(toastContainer);
    toastRoot = createRoot(toastContainer);
  }
  const handleDone = () => {
    window.setTimeout(() => {
      if (toastRoot) {
        toastRoot.unmount();
        toastRoot = null;
      }
      if (toastContainer) {
        toastContainer.remove();
        toastContainer = null;
      }
    }, 0);
  };
  toastRoot.render(<Toast message={message} seconds={seconds} onDone={handleDone} />);
};

export default Toast;

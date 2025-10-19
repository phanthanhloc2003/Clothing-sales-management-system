"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

type ErrorAlertProps = {
  show: boolean;
  message: string;
  title?: string;
  onClose?: () => void;
  autoHideMs?: number;
};

export default function ErrorAlert({ show, message, title = "Có lỗi xảy ra", onClose, autoHideMs }: ErrorAlertProps) {
  useEffect(() => {
    if (!autoHideMs || !show) return;
    const id = setTimeout(() => {
      onClose?.();
    }, autoHideMs);
    return () => clearTimeout(id);
  }, [autoHideMs, show, onClose]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ type: "spring", stiffness: 320, damping: 28 }}
          className="relative w-full rounded-lg border p-4 pr-10"
          style={{
            background: "#fff5f5",
            borderColor: "#fecaca",
            color: "#b91c1c",
          }}
          role="alert"
          aria-live="assertive"
        >
          <div className="mb-1 font-semibold">{title}</div>
          <div className="text-sm opacity-90">{message}</div>
          {onClose && (
            <button
              type="button"
              aria-label="Đóng thông báo lỗi"
              onClick={onClose}
              className="absolute right-2 top-2 rounded p-1 hover:bg-black/5"
            >
              ×
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}



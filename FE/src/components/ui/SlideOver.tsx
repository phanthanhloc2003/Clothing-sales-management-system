"use client";
import { Fragment } from "react";
import { AnimatePresence, motion } from "framer-motion";

type SlideOverProps = {
  open: boolean;
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
  widthClass?: string; // e.g. w-full sm:w-[480px]
};

export default function SlideOver({ open, title, onClose, children, widthClass = "w-full sm:w-[480px]" }: SlideOverProps) {
  return (
    <AnimatePresence>
      {open ? (
        <Fragment>
          <motion.div
            className="fixed inset-0 z-[60] bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            className={`fixed right-0 top-0 z-[61] h-dvh ${widthClass} bg-white dark:bg-neutral-900 border-l border-black/10 dark:border-white/10 shadow-2xl overflow-y-auto`}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
          >
            <div className="flex items-center justify-between p-4 border-b border-black/10 dark:border-white/10">
              <div className="text-lg font-semibold" style={{ color: "var(--brand-navy)" }}>{title}</div>
              <button onClick={onClose} className="text-sm opacity-80 hover:opacity-100">✕</button>
            </div>
            <div className="p-4">
              {children}
            </div>
          </motion.aside>
        </Fragment>
      ) : null}
    </AnimatePresence>
  );
}



"use client";
import { forwardRef } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";

type Props = Omit<HTMLMotionProps<"input">, "ref"> & {
  label: string;
  error?: string;
};

const TextField = forwardRef<HTMLInputElement, Props>(function TextField(
  { label, error, className, ...rest },
  ref
) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium" style={{ color: "var(--brand-navy)" }}>{label}</span>
      <motion.input
        whileFocus={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        ref={ref}
        className={`w-full rounded-md border px-3 py-2 outline-none transition-colors bg-white/90 dark:bg-white/5 border-black/10 focus:border-[color:var(--accent)] ${className ?? ""}`}
        {...rest}
      />
      {error ? (
        <span className="text-xs text-red-500">{error}</span>
      ) : null}
    </label>
  );
});

export default TextField;



"use client";
import { useState, forwardRef } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";

type Props = Omit<HTMLMotionProps<"input">, "ref"> & {
  label: string;
  error?: string;
};

const EyeIcon = ({ open }: { open: boolean }) => (
  <motion.span
    initial={{ opacity: 0, rotate: -10 }}
    animate={{ opacity: 1, rotate: 0 }}
    transition={{ duration: 0.2 }}
    className="inline-flex items-center justify-center w-10 h-10"
    aria-hidden
  >
    {open ? "👁️" : "👁️‍🗨️"}
  </motion.span>
);

const PasswordField = forwardRef<HTMLInputElement, Props>(function PasswordField(
  { label, error, className, ...rest },
  ref
) {
  const [show, setShow] = useState(false);
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium" style={{ color: "var(--brand-navy)" }}>{label}</span>
      <div className="relative">
        <motion.input
          whileFocus={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          ref={ref}
          type={show ? "text" : "password"}
          className={`w-full rounded-md border px-3 py-2 pr-10 outline-none transition-colors bg-white/90 dark:bg-white/5 border-black/10 focus:border-[color:var(--accent)] ${className ?? ""}`}
          {...rest}
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="absolute inset-y-0 right-1 inline-flex items-center justify-center rounded-md text-sm opacity-80 hover:opacity-100"
          aria-label={show ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
        >
          <EyeIcon open={show} />
        </button>
      </div>
      {error ? (
        <span className="text-xs text-red-500">{error}</span>
      ) : null}
    </label>
  );
});

export default PasswordField;



"use client";
import { motion, type HTMLMotionProps } from "framer-motion";

type Props = Omit<HTMLMotionProps<"button">, "ref"> & {
  loading?: boolean;
  variant?: "accent" | "ghost" | "navy";
};

export default function Button({ loading, disabled, variant = "accent", className, children, ...rest }: Props) {
  const base = "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors";
  const styles =
    variant === "accent"
      ? "bg-[color:var(--accent)] text-[color:var(--accent-foreground)] hover:brightness-95"
      : variant === "navy"
      ? "bg-[color:var(--brand-navy)] text-white hover:brightness-110"
      : "bg-transparent border border-black/10 hover:border-black/20";

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      whileHover={{ y: -1 }}
      disabled={disabled || loading}
      className={`${base} ${styles} ${className ?? ""}`}
      {...rest}
    >
      {loading ? "Đang xử lý..." : children}
    </motion.button>
  );
}



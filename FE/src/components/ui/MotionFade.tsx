"use client";
import { motion, type Variants } from "framer-motion";
import { ReactNode } from "react";

type MotionFadeProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
};

export default function MotionFade({ children, delay = 0, y = 8, className }: MotionFadeProps) {
  const variants: Variants = {
    hidden: { opacity: 0, y },
    visible: { opacity: 1, y: 0 },
  };
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}



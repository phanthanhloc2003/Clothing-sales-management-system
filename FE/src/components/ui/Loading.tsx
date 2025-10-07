"use client";
import { motion } from "framer-motion";

type LoadingProps = {
  size?: "sm" | "md" | "lg";
  text?: string;
  overlay?: boolean;
};

const sizeClasses = {
  sm: "w-6 h-6",
  md: "w-8 h-8", 
  lg: "w-12 h-12"
};

export default function Loading({ size = "md", text, overlay = false }: LoadingProps) {
  const spinnerVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  const dotsVariants = {
    animate: {
      y: [0, -8, 0],
      transition: {
        duration: 0.6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const LoadingSpinner = () => (
    <div className="flex flex-col items-center justify-center space-y-3">
      {/* Spinner chính */}
      <div className="relative">
        <motion.div
          className={`${sizeClasses[size]} border-2 border-transparent border-t-[color:var(--accent)] rounded-full`}
          variants={spinnerVariants}
          animate="animate"
        />
        <motion.div
          className={`absolute inset-0 ${sizeClasses[size]} border-2 border-transparent border-r-[color:var(--brand-navy)] rounded-full`}
          variants={spinnerVariants}
          animate="animate"
          style={{ animationDelay: "0.2s" }}
        />
      </div>

      {/* Dots animation */}
      <div className="flex space-x-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-[color:var(--accent)] rounded-full"
            variants={dotsVariants}
            animate="animate"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>

      {/* Text */}
      {text && (
        <motion.p
          className="text-sm opacity-80"
          style={{ color: "var(--brand-navy)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 0.3 }}
        >
          {text}
        </motion.p>
      )}
    </div>
  );

  if (overlay) {
    return (
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-black/80 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-black/10 dark:border-white/10"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <LoadingSpinner />
        </motion.div>
      </motion.div>
    );
  }

  return <LoadingSpinner />;
}

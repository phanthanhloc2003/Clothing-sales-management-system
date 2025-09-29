"use client";
import { motion } from "framer-motion";

type Props = {
  onGoogle?: () => void;
  onFacebook?: () => void;
  onApple?: () => void;
};

export default function SocialAuth({ onGoogle, onFacebook, onApple }: Props) {
  return (
    <div className="mt-6">
      <div className="relative">
        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-black/10 dark:border-white/10" /></div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-white dark:bg-transparent px-2 opacity-70">Hoặc tiếp tục với</span>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-3">
        <motion.button whileTap={{ scale: 0.98 }} whileHover={{ y: -1 }} onClick={onGoogle} className="h-10 rounded-md border border-black/10 bg-white/90 dark:bg-white/5">
          <span className="sr-only">Google</span>🟢
        </motion.button>
        <motion.button whileTap={{ scale: 0.98 }} whileHover={{ y: -1 }} onClick={onFacebook} className="h-10 rounded-md border border-black/10 bg-white/90 dark:bg-white/5">
          <span className="sr-only">Facebook</span>🔵
        </motion.button>
        <motion.button whileTap={{ scale: 0.98 }} whileHover={{ y: -1 }} onClick={onApple} className="h-10 rounded-md border border-black/10 bg-white/90 dark:bg-white/5">
          <span className="sr-only">Apple</span>⚫️
        </motion.button>
      </div>
    </div>
  );
}



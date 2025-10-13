"use client";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

type Props = {
  fullName?: string;
  avatar?: string | null;
  onLogout?: () => void;
};

export default function UserMenu({ fullName = "", avatar, onLogout }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className="flex items-center gap-2 rounded-full border border-black/10 px-2 py-1.5 bg-white/70 dark:bg-white/5 backdrop-blur hover:border-black/20 transition-colors"
      >
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full overflow-hidden bg-[color:var(--brand-navy)] text-white">
          {avatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={avatar} alt="avatar" className="h-full w-full object-cover" />
          ) : (
            <span className="text-sm font-medium">
              {fullName ? fullName.charAt(0).toUpperCase() : "U"}
            </span>
          )}
        </span>
        <span className="hidden sm:block text-sm opacity-90 max-w-[120px] truncate">{fullName || "Tài khoản"}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.18 }}
            className="absolute right-0 mt-2 w-48 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900 shadow-xl overflow-hidden"
          >
            <div className="px-3 py-2 text-xs opacity-70">Tài khoản</div>
            <div className="py-1">
              <Link href="/profile" className="block px-3 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/5 transition-colors">Hồ sơ</Link>
              <Link href="/orders" className="block px-3 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/5 transition-colors">Đơn hàng</Link>
            </div>
            <div className="border-t border-black/10 dark:border-white/10" />
            <button
              onClick={onLogout}
              className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
            >
              Đăng xuất
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}



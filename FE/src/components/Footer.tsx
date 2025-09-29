"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-black/10 dark:border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-sm opacity-80">
            © {new Date().getFullYear()} <span style={{ color: "var(--brand-navy)" }}>FASHION</span>. All rights reserved.
          </div>
          <div className="flex items-center gap-5">
            {[
              { href: "https://facebook.com", label: "Facebook" },
              { href: "https://instagram.com", label: "Instagram" },
              { href: "https://tiktok.com", label: "TikTok" },
            ].map((s) => (
              <motion.div key={s.label} whileHover={{ y: -2, color: "var(--accent)" }} transition={{ type: "spring", stiffness: 500, damping: 30 }}>
                <Link href={s.href} target="_blank" className="text-sm opacity-80 hover:opacity-100 transition-opacity hover:text-[color:var(--accent)]">
                  {s.label}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="mt-6 text-xs text-center opacity-70">
          Made with <span className="text-accent">♥</span> for modern fashion.
        </div>
      </div>
    </footer>
  );
}



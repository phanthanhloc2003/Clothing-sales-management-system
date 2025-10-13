"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh grid grid-cols-[240px_1fr]">
      <aside className="hidden md:block border-r border-black/10 dark:border-white/10">
        <div className="p-4 text-lg font-semibold" style={{ color: "var(--brand-navy)" }}>Admin</div>
        <nav className="px-2 space-y-1">
          {[
            { href: "/admin", label: "Dashboard" },
            { href: "/admin/products", label: "Products" },
            { href: "/admin/categories", label: "Categories" },
          ].map((i) => (
            <Link key={i.href} href={i.href} className="block px-3 py-2 rounded-md hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
              {i.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="p-4 md:p-6">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          {children}
        </motion.div>
      </main>
    </div>
  );
}



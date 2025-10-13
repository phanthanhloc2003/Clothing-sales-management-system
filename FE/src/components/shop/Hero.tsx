"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="container-page py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight" style={{ color: "var(--brand-navy)" }}>
              Thời trang hiện đại, tinh tế
            </h1>
            <p className="mt-4 text-base md:text-lg opacity-80">
              Bộ sưu tập mới nhất theo tông navy/white/be — đơn giản nhưng nổi bật.
            </p>
            <div className="mt-8 flex gap-3">
              <Link href="/collections" className="btn-accent px-5 py-2 rounded-md">
                Mua ngay
              </Link>
              <Link href="/sale" className="px-5 py-2 rounded-md border border-black/10 hover:border-black/20 transition-colors">
                Ưu đãi nổi bật
              </Link>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, ease: "easeOut" }}>
            <div className="rounded-2xl hero-gradient aspect-[4/3] md:aspect-[5/4] bg-white/70 dark:bg-white/5 backdrop-blur border border-black/10 dark:border-white/10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}



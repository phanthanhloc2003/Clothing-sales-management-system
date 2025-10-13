"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export type Product = {
  id: string | number;
  name: string;
  price: number;
  image?: string;
  rating?: number;
};

export default function ProductCard({ id, name, price, image, rating = 4.5 }: Product) {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 400, damping: 28 }} className="group rounded-xl border border-black/10 dark:border-white/10 overflow-hidden bg-white/70 dark:bg-white/5 backdrop-blur">
      <Link href={`/products/${id}`} className="block">
        <div className="aspect-[4/5] overflow-hidden bg-black/5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image || "/public/images/placeholder.png"} alt={name} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
        </div>
        <div className="p-3">
          <div className="text-sm opacity-70">{rating.toFixed(1)} ★</div>
          <div className="mt-1 font-medium">{name}</div>
          <div className="mt-1 text-[color:var(--accent)] font-semibold">{price.toLocaleString()} đ</div>
        </div>
      </Link>
    </motion.div>
  );
}



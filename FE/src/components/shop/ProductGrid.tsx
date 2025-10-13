"use client";
import { motion } from "framer-motion";
import ProductCard, { type Product } from "./ProductCard";

export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="container-page py-10">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map((p, idx) => (
          <motion.div key={p.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.04 }}>
            <ProductCard {...p} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}



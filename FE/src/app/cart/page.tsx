"use client";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import RevealOnScroll from "@/components/ui/Reveal";

type CartItem = {
  id: number;
  name: string;
  price: number;
  qty: number;
};

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([
    { id: 1, name: "Áo thun Navy Essential", price: 299000, qty: 1 },
    { id: 2, name: "Quần jean Slim Fit", price: 599000, qty: 2 },
  ]);

  const total = useMemo(() => items.reduce((s, i) => s + i.price * i.qty, 0), [items]);

  const updateQty = (id: number, delta: number) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i)));
  };

  const removeItem = (id: number) => setItems((prev) => prev.filter((i) => i.id !== id));

  return (
    <div className="container-page py-10">
      <h1 className="text-2xl font-semibold" style={{ color: "var(--brand-navy)" }}>Giỏ hàng</h1>
      <div className="mt-6 grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-3">
          {items.map((i, idx) => (
            <motion.div key={i.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }} className="rounded-xl border border-black/10 dark:border-white/10 p-4 bg-white/70 dark:bg-white/5 backdrop-blur">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="font-medium">{i.name}</div>
                  <div className="text-[color:var(--accent)]">{i.price.toLocaleString()} đ</div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" className="px-2 py-1" onClick={() => updateQty(i.id, -1)}>-</Button>
                  <span className="w-8 text-center">{i.qty}</span>
                  <Button variant="ghost" className="px-2 py-1" onClick={() => updateQty(i.id, 1)}>+</Button>
                </div>
                <Button variant="ghost" className="px-2 py-1" onClick={() => removeItem(i.id)}>Xóa</Button>
              </div>
            </motion.div>
          ))}
        </div>

        <RevealOnScroll>
          <div className="rounded-xl border border-black/10 dark:border-white/10 p-4 h-fit bg-white/70 dark:bg-white/5 backdrop-blur">
            <div className="text-lg font-semibold" style={{ color: "var(--brand-navy)" }}>Tổng thanh toán</div>
            <div className="mt-3 flex items-center justify-between">
              <span>Tạm tính</span>
              <span>{total.toLocaleString()} đ</span>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span>Phí vận chuyển</span>
              <span>Miễn phí</span>
            </div>
            <div className="mt-3 flex items-center justify-between font-semibold">
              <span>Tổng cộng</span>
              <span className="text-[color:var(--accent)]">{total.toLocaleString()} đ</span>
            </div>
            <Button variant="accent" className="w-full mt-4">Thanh toán</Button>
          </div>
        </RevealOnScroll>
      </div>
    </div>
  );
}



"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import SlideOver from "@/components/ui/SlideOver";
import ProductForm from "@/components/admin/forms/ProductForm";

type ProductRow = { id: number; name: string; price: number; category: string };

export default function AdminProductsPage() {
  const [rows, setRows] = useState<ProductRow[]>([
    { id: 1, name: "Áo thun Navy Essential", price: 299000, category: "Tops" },
    { id: 2, name: "Quần jean Slim Fit", price: 599000, category: "Bottoms" },
  ]);
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold" style={{ color: "var(--brand-navy)" }}>Products</h1>
        <Button variant="accent" onClick={() => setOpen(true)}>Tạo sản phẩm</Button>
      </div>

      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-black/10 dark:border-white/10 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-black/5">
            <tr>
              <th className="text-left p-3">Tên</th>
              <th className="text-left p-3">Danh mục</th>
              <th className="text-left p-3">Giá</th>
              <th className="text-left p-3">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t border-black/10">
                <td className="p-3">{r.name}</td>
                <td className="p-3">{r.category}</td>
                <td className="p-3 text-[color:var(--accent)] font-medium">{r.price.toLocaleString()} đ</td>
                <td className="p-3">
                  <div className="flex gap-2">
                    <Button variant="ghost" className="px-2 py-1">Sửa</Button>
                    <Button variant="ghost" className="px-2 py-1">Xóa</Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      <SlideOver open={open} onClose={() => setOpen(false)} title="Tạo sản phẩm">
        <ProductForm onSubmit={async (values) => {
          setRows((prev) => [
            { id: Date.now(), name: values.name, price: values.price, category: values.categoryId === "1" ? "Tops" : "Bottoms" },
            ...prev,
          ]);
          setOpen(false);
        }} />
      </SlideOver>
    </div>
  );
}



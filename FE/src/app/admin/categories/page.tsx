"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import SlideOver from "@/components/ui/SlideOver";
import CategoryForm from "@/components/admin/forms/CategoryForm";

type CategoryRow = { id: number; name: string; slug: string; parentId?: number | null; description?: string | null; createdAt?: string };

export default function AdminCategoriesPage() {
  const [rows, setRows] = useState<CategoryRow[]>([
    { id: 1, name: "Tops", slug: "tops", parentId: null, description: "Áo, áo khoác" , createdAt: new Date().toISOString()},
    { id: 2, name: "Bottoms", slug: "bottoms", parentId: null, description: "Quần các loại" , createdAt: new Date().toISOString()},
  ]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<CategoryRow | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold" style={{ color: "var(--brand-navy)" }}>Categories</h1>
        <Button variant="accent" onClick={() => setOpen(true)}>Tạo danh mục</Button>
      </div>

      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-black/10 dark:border-white/10 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-black/5">
            <tr>
              <th className="text-left p-3">Tên</th>
              <th className="text-left p-3">Slug</th>
              <th className="text-left p-3">Cha</th>
              <th className="text-left p-3">Mô tả</th>
              <th className="text-left p-3">Ngày tạo</th>
              <th className="text-left p-3">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t border-black/10">
                <td className="p-3">{r.name}</td>
                <td className="p-3 opacity-70">/{r.slug}</td>
                <td className="p-3">{r.parentId ?? "—"}</td>
                <td className="p-3 truncate max-w-[240px]" title={r.description || ''}>{r.description}</td>
                <td className="p-3 opacity-70">{r.createdAt ? new Date(r.createdAt).toLocaleString() : '—'}</td>
                <td className="p-3">
                  <div className="flex gap-2">
                    <Button variant="ghost" className="px-2 py-1" onClick={() => { setEditing(r); setOpen(true); }}>Sửa</Button>
                    <Button variant="ghost" className="px-2 py-1" onClick={() => setRows((prev) => prev.filter((x) => x.id !== r.id))}>Xóa</Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      <SlideOver open={open} onClose={() => { setOpen(false); setEditing(null); }} title={editing ? "Sửa danh mục" : "Tạo danh mục"}>
        <CategoryForm onSubmit={async (values) => {
          if (editing) {
            setRows((prev) => prev.map((x) => x.id === editing.id ? {
              ...x,
              name: values.name,
              slug: values.slug,
              parentId: values.parentId ? Number(values.parentId) : null,
              description: values.description || null,
            } : x));
          } else {
            setRows((prev) => [
              { id: Date.now(), name: values.name, slug: values.slug, parentId: values.parentId ? Number(values.parentId) : null, description: values.description || null, createdAt: new Date().toISOString() },
              ...prev,
            ]);
          }
          setOpen(false);
          setEditing(null);
        }} />
      </SlideOver>
    </div>
  );
}



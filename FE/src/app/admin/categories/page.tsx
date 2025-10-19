"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import SlideOver from "@/components/ui/SlideOver";
import CategoryForm from "@/components/admin/forms/CategoryForm";
import { categoryService } from "@/services/category";
import { Category } from "@/types/category";
import Loading from "@/components/ui/Loading";
import ErrorAlert from "@/components/ui/ErrorAlert";




export default function AdminCategoriesPage() {
  const [rows, setRows] = useState<Category[]>([]);
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [categoryParents, setCategoryParents] = useState<Category[]>([])
  const [load, setLoad] = useState<boolean>(false)
  const [errorMsg,setErrorMsg] = useState<string>("")

  const toCategoryFormDefaults = (c: Category) => ({
    name: c.name,
    slug: c.slug,
    parentId: c.parentId != null ? String(c.parentId) : "",
    description: c.description ?? "",
  });

  useEffect(()=> {
    const fectDataCategory = async () => {
          try{
            setIsLoading(true);
            const res = await categoryService.getCategory();
            const parent = await categoryService.getCategoryParents();
            if (res.success && res.data) {
              setRows(res.data);
            }
            if (parent.success && parent.data) {
              setCategoryParents(parent.data);
            }
          } finally {
            setIsLoading(false);
          }
         
    }
    fectDataCategory()
  },[load])
  return (
    <div className="space-y-6">
      {isLoading && <Loading overlay text="Đang tải danh mục..." />}
      <ErrorAlert show={!!errorMsg} message={errorMsg} onClose={() => setErrorMsg("")} autoHideMs={4000} />
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold" style={{ color: "var(--brand-navy)" }}>Categories</h1>
        <Button variant="accent" onClick={() => setOpenCreate(true)}>Tạo danh mục</Button>
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
                    <Button variant="ghost" className="px-2 py-1" onClick={() => { setEditing(r); setOpenEdit(true); }}>Sửa</Button>
                    <Button variant="ghost" className="px-2 py-1" onClick={() => setRows((prev) => prev.filter((x) => x.id !== r.id))}>Xóa</Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      <SlideOver open={openCreate} onClose={() => { setOpenCreate(false); }} title="Tạo danh mục">
        <CategoryForm 
          categoryParents={categoryParents}
          onSubmit={async (values) => {
            const payload = {
              name: values.name,
              slug: values.slug,
              parentId: values.parentId ? Number(values.parentId) : null,
              description: values.description || null,
            };
            const res = await categoryService.createCategory(payload);
            if(res.success && res.data){
              setLoad(!load)
              setOpenEdit(false);
              setEditing(null);
            }
            else{
              setErrorMsg(res.message || "Tạo danh mục thất bại");
            }

          }} />
      </SlideOver>

      <SlideOver open={openEdit} onClose={() => { setOpenEdit(false); setEditing(null); }} title="Sửa danh mục">
        <CategoryForm 
          initialValues={editing ? toCategoryFormDefaults(editing) : undefined} 
          categoryParents={categoryParents}
          onSubmit={async (values) => {
            if (!editing) return;
            const payload = {
              name: values.name,
              slug: values.slug,
              parentId: values.parentId ? Number(values.parentId) : null,
              description: values.description || null,
            };
            // const res = await categoryService.updateCategory(editing.id, payload);
            // if (res.success) {
            //   setRows((prev) => prev.map((x) => x.id === editing.id ? { ...x, ...payload } as Category : x));
            //   setOpenEdit(false);
            //   setEditing(null);
            // }
          }} />
      </SlideOver>
    </div>
  );
}



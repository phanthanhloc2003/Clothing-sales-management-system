"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import SlideOver from "@/components/ui/SlideOver";
import UserForm from "@/components/admin/forms/UserForm";

type UserRow = {
  id: number;
  fullName: string;
  phone: string;
  role: "USER" | "ADMIN";
  status: "ACTIVE" | "INACTIVE";
  createdAt: string;
};

export default function AdminUsersPage() {
  const [rows, setRows] = useState<UserRow[]>([
    {
      id: 1,
      fullName: "phan thanh lộc",
      phone: "0353376671",
      role: "USER",
      status: "ACTIVE",
      createdAt: "2025-09-29T21:44:03.294024",
    },
  ]);
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold" style={{ color: "var(--brand-navy)" }}>Users</h1>
        <div className="flex gap-2">
          <Button variant="ghost">Xuất CSV</Button>
          <Button variant="accent" onClick={() => setOpen(true)}>Tạo user</Button>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-black/10 dark:border-white/10 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-black/5">
            <tr>
              <th className="text-left p-3">ID</th>
              <th className="text-left p-3">Họ tên</th>
              <th className="text-left p-3">SĐT</th>
              <th className="text-left p-3">Vai trò</th>
              <th className="text-left p-3">Trạng thái</th>
              <th className="text-left p-3">Ngày tạo</th>
              <th className="text-left p-3">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t border-black/10">
                <td className="p-3">{r.id}</td>
                <td className="p-3 font-medium">{r.fullName}</td>
                <td className="p-3">{r.phone}</td>
                <td className="p-3">
                  <span className="px-2 py-0.5 rounded-md text-xs bg-black/5">{r.role}</span>
                </td>
                <td className="p-3">
                  <span className={`px-2 py-0.5 rounded-md text-xs ${r.status === "ACTIVE" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`}>
                    {r.status}
                  </span>
                </td>
                <td className="p-3 opacity-70">{new Date(r.createdAt).toLocaleString()}</td>
                <td className="p-3">
                  <div className="flex gap-2">
                    <Button variant="ghost" className="px-2 py-1">Khóa</Button>
                    <Button variant="ghost" className="px-2 py-1">Phân quyền</Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      <SlideOver open={open} onClose={() => setOpen(false)} title="Tạo user">
        <UserForm onSubmit={async (values) => {
          setRows((prev) => [
            {
              id: Date.now(),
              fullName: values.fullName,
              phone: values.phone,
              role: values.role,
              status: values.status,
              createdAt: new Date().toISOString(),
            },
            ...prev,
          ]);
          setOpen(false);
        }} />
      </SlideOver>
    </div>
  );
}



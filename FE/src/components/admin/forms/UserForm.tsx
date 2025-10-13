"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema, type UserFormValues } from "@/validation/admin";
import TextField from "@/components/ui/TextField";
import Button from "@/components/ui/Button";

export default function UserForm({ onSubmit }: { onSubmit: (values: UserFormValues) => Promise<void> | void }) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: { fullName: "", phone: "", role: "USER", status: "ACTIVE" },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <TextField label="Họ và tên" {...register("fullName")} error={errors.fullName?.message} />
      <TextField label="Số điện thoại" inputMode="tel" {...register("phone")} error={errors.phone?.message} />
      <div className="grid grid-cols-2 gap-3">
        <label className="block text-sm">Vai trò<select className="mt-1 w-full rounded-md border border-black/10 px-3 py-2" {...register("role")}><option value="USER">USER</option><option value="ADMIN">ADMIN</option></select></label>
        <label className="block text-sm">Trạng thái<select className="mt-1 w-full rounded-md border border-black/10 px-3 py-2" {...register("status")}><option value="ACTIVE">ACTIVE</option><option value="INACTIVE">INACTIVE</option></select></label>
      </div>
      <Button type="submit" variant="accent" loading={isSubmitting}>Lưu</Button>
    </form>
  );
}



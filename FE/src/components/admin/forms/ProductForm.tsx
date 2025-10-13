"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema, type ProductFormValues } from "@/validation/admin";
import TextField from "@/components/ui/TextField";
import Button from "@/components/ui/Button";

export default function ProductForm({ onSubmit }: { onSubmit: (values: ProductFormValues) => Promise<void> | void }) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: { name: "", price: 0, categoryId: "" },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <TextField label="Tên sản phẩm" {...register("name")} error={errors.name?.message} />
      <TextField label="Giá" inputMode="numeric" {...register("price", { valueAsNumber: true })} error={errors.price?.message} />
      <label className="block text-sm">Danh mục<select className="mt-1 w-full rounded-md border border-black/10 px-3 py-2" {...register("categoryId")}><option value="">-- Chọn --</option><option value="1">Tops</option><option value="2">Bottoms</option></select></label>
      <Button type="submit" variant="accent" loading={isSubmitting}>Lưu</Button>
    </form>
  );
}



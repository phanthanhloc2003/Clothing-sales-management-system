"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { categorySchema, type CategoryFormValues } from "@/validation/admin";
import TextField from "@/components/ui/TextField";
import Button from "@/components/ui/Button";
import { Category } from "@/types/category";

export default function CategoryForm({
  onSubmit,
  initialValues,
  categoryParents = [],
}: {
  onSubmit: (values: CategoryFormValues) => Promise<void> | void;
  initialValues?: Partial<CategoryFormValues>;
  categoryParents?: Category[];
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: { ...initialValues },
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <TextField
        label="Tên danh mục"
        {...register("name")}
        error={errors.name?.message}
      />
      <TextField
        label="Slug"
        {...register("slug")}
        error={errors.slug?.message}
      />
      <label className="block text-sm">
        Danh mục cha
        <select
          className="mt-1 w-full rounded-md border border-black/10 px-3 py-2"
          {...register("parentId")}
        >
          <option value="">-- Không chọn --</option>
          {categoryParents.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </label>
      <label className="block text-sm">
        Mô tả
        <textarea
          className="mt-1 w-full rounded-md border border-black/10 px-3 py-2"
          rows={3}
          {...register("description")}
        />
      </label>
      <Button type="submit" variant="accent" loading={isSubmitting}>
        Lưu
      </Button>
    </form>
  );
}

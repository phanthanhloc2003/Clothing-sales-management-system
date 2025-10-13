import { z } from "zod";

export const userSchema = z.object({
  fullName: z.string().trim().min(1, "Vui lòng nhập họ tên"),
  phone: z.string().trim().regex(/^\+?\d{9,15}$/, "Số điện thoại không hợp lệ"),
  role: z.enum(["USER", "ADMIN"]),
  status: z.enum(["ACTIVE", "INACTIVE"]),
});
export type UserFormValues = z.infer<typeof userSchema>;

export const categorySchema = z.object({
  name: z.string().trim().min(1, "Vui lòng nhập tên danh mục"),
  slug: z.string().trim().min(1, "Vui lòng nhập slug"),
  parentId: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
});
export type CategoryFormValues = z.infer<typeof categorySchema>;

export const productSchema = z.object({
  name: z.string().trim().min(1, "Vui lòng nhập tên sản phẩm"),
  price: z.number().min(0, "Giá không hợp lệ"),
  categoryId: z.string().min(1, "Chọn danh mục"),
});
export type ProductFormValues = z.infer<typeof productSchema>;



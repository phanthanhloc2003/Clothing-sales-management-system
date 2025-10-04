import { z } from "zod";

export const registerSchema = z.object({
  fullName: z.string().trim().min(1, "Vui lòng nhập tên"),
  phone: z
    .string()
    .trim()
    .regex(/^\+?\d{9,15}$/, "Số điện thoại không hợp lệ"),
  password: z.string().min(6, "Mật khẩu tối thiểu 6 ký tự"),
});


export const loginSchema = z.object({
  phone: z
    .string()
    .trim()
    .regex(/^\+?\d{9,15}$/, "Số điện thoại không hợp lệ"),
  password: z.string().min(6, "Mật khẩu tối thiểu 6 ký tự"),
});




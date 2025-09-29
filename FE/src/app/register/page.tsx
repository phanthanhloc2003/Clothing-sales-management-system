"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import MotionFade from "@/components/ui/MotionFade";
import TextField from "@/components/ui/TextField";
import PasswordField from "@/components/ui/PasswordField";
import Button from "@/components/ui/Button";
import SocialAuth from "@/components/ui/SocialAuth";
import type { AxiosError } from "axios";
import { authService } from "@/services/auth";
import { RegisterRequest } from "@/types/auth";
import { registerSchema } from "@/validation/auth";

export default function RegisterPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<RegisterRequest>({
    resolver: zodResolver(registerSchema),
    defaultValues: { fullName: "", phone: "", password: "" },
    mode: "onBlur",
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      const res = await authService.register(values);
      if (res?.success) {
        setTimeout(() => router.push("/"), 800);
      } else {
        setError("root", { message: res?.message || "Đăng ký thất bại" });
      }
    } catch (err: unknown) {
      let message = "Có lỗi xảy ra";
      const ax = err as AxiosError<{ message?: string }>;
      if (ax?.response?.data?.message) message = ax.response.data.message;
      setError("root", { message });
    }
  });

  return (
    <div className="container-page py-12">
      <MotionFade y={12}>
        <div className="mx-auto max-w-md rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur p-6">
          <h1 className="text-2xl font-semibold" style={{ color: "var(--brand-navy)" }}>Tạo tài khoản</h1>
          <p className="mt-1 text-sm opacity-80">Tham gia để mua sắm nhanh hơn và nhận ưu đãi.</p>

          <form className="mt-6 space-y-4" onSubmit={onSubmit}>
            <MotionFade delay={0.05}>
              <TextField label="Họ và tên" placeholder="Nguyễn Văn A" {...register("fullName")} error={errors.fullName?.message} />
            </MotionFade>
            <MotionFade delay={0.1}>
              <TextField label="Số điện thoại" placeholder="0901234567" inputMode="tel" {...register("phone")} error={errors.phone?.message} />
            </MotionFade>
            <MotionFade delay={0.15}>
              <PasswordField label="Mật khẩu" placeholder="Ít nhất 6 ký tự" {...register("password")} error={errors.password?.message} />
            </MotionFade>

            {errors.root?.message ? (
              <MotionFade>
                <div className="text-sm text-red-500">{errors.root.message}</div>
              </MotionFade>
            ) : null}

            <MotionFade delay={0.2}>
              <Button type="submit" variant="accent" className="w-full" loading={isSubmitting}>
                Đăng ký
              </Button>
            </MotionFade>
          </form>
          <div className="mt-4 text-sm">
            <span className="opacity-80">Đã có tài khoản?</span>{" "}
            <a href="/login" className="underline hover:text-[color:var(--accent)]">Đăng nhập</a>
          </div>
          <SocialAuth />
        </div>
      </MotionFade>
    </div>
  );
}



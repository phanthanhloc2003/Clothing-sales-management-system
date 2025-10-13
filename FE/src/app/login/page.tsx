"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import MotionFade from "@/components/ui/MotionFade";
import TextField from "@/components/ui/TextField";
import PasswordField from "@/components/ui/PasswordField";
import Button from "@/components/ui/Button";
import SocialAuth from "@/components/ui/SocialAuth";
import Loading from "@/components/ui/Loading";
import { LoginRequest } from "@/types/auth";
import { loginSchema } from "@/validation/auth";
import { authService } from "@/services/auth";
import { useAppDispatch } from "@/store/hooks";
import { loginSuccess } from "@/store/authSlice";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm<LoginRequest>({
    resolver: zodResolver(loginSchema),
    defaultValues: { phone: "", password: "" },
    mode: "onBlur",
  });

  const onSubmit = handleSubmit(async (values) => {
    const res = await authService.login(values);
    if (res.success && res.data) {
      dispatch(loginSuccess(res.data));
      setTimeout(() => router.push("/"),0);
    } else {
      setError("root", { message: res.message || "Đăng nhập thất bại" });
    }
  });

  return (
    <>
      {isSubmitting && <Loading overlay text="Đang đăng nhập..." />}
      <div className="container-page py-12">
        <MotionFade y={12}>
          <div className="mx-auto max-w-md rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur p-6">
            <h1 className="text-2xl font-semibold" style={{ color: "var(--brand-navy)" }}>Đăng nhập</h1>
            <p className="mt-1 text-sm opacity-80">Chào mừng quay lại với <span style={{ color: "var(--brand-navy)" }}>FASHION</span>.</p>
            <form className="mt-6 space-y-4" onSubmit={onSubmit}>
              <MotionFade delay={0.05}>
                <TextField label="Số điện thoại" placeholder="0901234567" inputMode="tel" {...register("phone")} error={errors.phone?.message} />
              </MotionFade>
              <MotionFade delay={0.1}>
                <PasswordField label="Mật khẩu" placeholder="Mật khẩu của bạn" {...register("password")} error={errors.password?.message} />
              </MotionFade>

              {errors.root?.message ? (
                <MotionFade>
                  <div className="text-sm text-red-500">{errors.root.message}</div>
                </MotionFade>
              ) : null}

              <MotionFade delay={0.2}>
                <Button type="submit" variant="navy" className="w-full" loading={isSubmitting}>
                  Đăng nhập
                </Button>
              </MotionFade>
            </form>
            <div className="mt-4 text-sm">
              <span className="opacity-80">Chưa có tài khoản?</span>{" "}
              <a href="/register" className="underline hover:text-[color:var(--accent)]">Đăng ký</a>
            </div>
            <SocialAuth />
          </div>
        </MotionFade>
      </div>
    </>
  );
}



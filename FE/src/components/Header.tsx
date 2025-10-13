"use client";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useEffect, useState } from "react";
import UserMenu from "@/components/ui/UserMenu";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout } from "@/store/authSlice";

export default function Header() {
  const { scrollY } = useScroll();
  const [elevated, setElevated] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector((s) => s.auth);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setElevated(latest > 10);
  });

  useEffect(() => {
    setMounted(true);
    setElevated(false);
  }, []);

  if (!mounted) {
    return (
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-[color:var(--brand-beige)]/70 dark:supports-[backdrop-filter]:bg-[color:var(--background)]/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex h-16 items-center justify-between">
            <Link href="/" className="font-semibold tracking-tight text-xl">
              <span style={{ color: "var(--brand-navy)" }}>FASHION</span>
              <span className="sr-only">.</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/search" aria-label="Tìm kiếm" className="opacity-80 hover:opacity-100 transition-opacity hover:text-[color:var(--accent)]">
                🔍
              </Link>
              <Link href="/cart" aria-label="Giỏ hàng" className="opacity-80 hover:opacity-100 transition-opacity hover:text-[color:var(--accent)]">
                🛒
              </Link>
            </div>
          </nav>
        </div>
      </header>
    );
  }

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-[color:var(--brand-beige)]/70 dark:supports-[backdrop-filter]:bg-[color:var(--background)]/40 ${
        elevated ? "shadow-sm border-b border-black/10 dark:border-white/10" : ""
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="flex h-16 items-center justify-between">
          <Link href="/" className="font-semibold tracking-tight text-xl">
            <span style={{ color: "var(--brand-navy)" }}>FASHION</span>
            <span className="sr-only">.</span>
          </Link>
          <ul className="hidden md:flex items-center gap-8 text-sm">
            {[
              { href: "/collections", label: "Bộ sưu tập" },
              { href: "/men", label: "Nam" },
              { href: "/women", label: "Nữ" },
              { href: "/sale", label: "Sale" },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="relative py-2 transition-colors hover:text-[color:var(--brand-navy)]"
                >
                  <span>{item.label}</span>
                  <motion.span
                    layoutId={`underline`}
                    className="pointer-events-none absolute inset-x-0 -bottom-1 h-[2px] origin-left"
                    style={{ backgroundColor: "var(--accent)" }}
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-4">
            <Link href="/search" aria-label="Tìm kiếm" className="opacity-80 hover:opacity-100 transition-opacity hover:text-[color:var(--accent)]">
              🔍
            </Link>
            <Link href="/cart" aria-label="Giỏ hàng" className="opacity-80 hover:opacity-100 transition-opacity hover:text-[color:var(--accent)]">
              🛒
            </Link>
            {isAuthenticated ? (
              <UserMenu
                fullName={user?.fullName}
                avatar={user?.avatar ?? null}
                onLogout={() => dispatch(logout())}
              />
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link href="/login" className="text-sm px-3 py-1.5 rounded-md border border-black/10 hover:border-black/20 transition-colors">Đăng nhập</Link>
                <Link href="/register" className="text-sm px-3 py-1.5 rounded-md bg-[color:var(--accent)] text-white hover:brightness-95 transition-colors">Đăng ký</Link>
              </div>
            )}
          </div>
        </nav>
      </div>
    </motion.header>
  );
}



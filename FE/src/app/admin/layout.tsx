import AdminLayout from "@/components/admin/AdminLayout";
import AdminGuard from "@/components/providers/AdminGuard";

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminGuard>
      <AdminLayout>{children}</AdminLayout>
    </AdminGuard>
  );
}



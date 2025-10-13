"use client";
import { motion } from "framer-motion";

function StatCard({ title, value, trend }: { title: string; value: string; trend?: string }) {
  return (
    <motion.div whileHover={{ y: -3 }} className="rounded-xl border border-black/10 dark:border-white/10 p-4 bg-white/70 dark:bg-white/5 backdrop-blur">
      <div className="text-sm opacity-70">{title}</div>
      <div className="mt-2 text-2xl font-semibold" style={{ color: "var(--brand-navy)" }}>{value}</div>
      {trend ? <div className="mt-1 text-xs opacity-70">{trend}</div> : null}
    </motion.div>
  );
}

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold" style={{ color: "var(--brand-navy)" }}>Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Doanh thu tháng" value="120.500.000 đ" trend="▲ +12% so với tháng trước" />
        <StatCard title="Lợi nhuận tháng" value="38.200.000 đ" trend="▲ +8%" />
        <StatCard title="Đơn hàng mới" value="1.245" trend="▼ -3%" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <motion.div className="rounded-xl border border-black/10 dark:border-white/10 p-4 lg:col-span-2 bg-white/70 dark:bg-white/5 backdrop-blur" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-sm opacity-70">Biểu đồ doanh thu (placeholder)</div>
          <div className="mt-3 h-64 rounded-md bg-black/5" />
        </motion.div>
        <motion.div className="rounded-xl border border-black/10 dark:border-white/10 p-4 bg-white/70 dark:bg-white/5 backdrop-blur" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-sm opacity-70">Sản phẩm bán chạy</div>
          <ul className="mt-3 space-y-2 text-sm">
            <li>Áo thun Navy Essential</li>
            <li>Quần jean Slim Fit</li>
            <li>Áo sơ mi Linen Beige</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}



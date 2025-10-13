"use client";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import RevealOnScroll from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";

export default function ProductDetailPage() {
  const params = useParams();
  const { id } = params as { id: string };

  const product = {
    id,
    name: "Áo thun Navy Essential",
    price: 299000,
    description: "Chất liệu cotton thoáng mát, phom dáng vừa vặn.",
    images: [
      "/public/images/placeholder.png",
      "/public/images/placeholder.png",
      "/public/images/placeholder.png",
    ],
  };

  return (
    <div className="container-page py-10">
      <div className="grid md:grid-cols-2 gap-8">
        <RevealOnScroll>
          <div>
            <div className="aspect-[4/5] overflow-hidden rounded-xl bg-black/5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover" />
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {product.images.slice(1).map((src, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={i} src={src} alt={`thumb-${i}`} className="h-24 w-full object-cover rounded-md bg-black/5" />
              ))}
            </div>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.08}>
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold" style={{ color: "var(--brand-navy)" }}>{product.name}</h1>
            <div className="mt-2 text-[color:var(--accent)] text-xl font-bold">{product.price.toLocaleString()} đ</div>
            <p className="mt-4 opacity-80">{product.description}</p>

            <div className="mt-6 flex items-center gap-3">
              <Button variant="accent">Thêm vào giỏ</Button>
              <Button variant="navy">Mua ngay</Button>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </div>
  );
}



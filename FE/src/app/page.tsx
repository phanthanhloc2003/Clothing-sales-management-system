
import Hero from "@/components/shop/Hero";
import ProductGrid from "@/components/shop/ProductGrid";
import type { Product } from "@/components/shop/ProductCard";

export default function Home() {
  const mock: Product[] = [
    { id: 1, name: "Áo thun Navy Essential", price: 299000 },
    { id: 2, name: "Quần jean Slim Fit", price: 599000 },
    { id: 3, name: "Áo sơ mi Linen Beige", price: 499000 },
    { id: 4, name: "Váy midi Trắng", price: 799000 },
    { id: 5, name: "Áo khoác Bomber Navy", price: 899000 },
    { id: 6, name: "Giày Sneaker Trắng", price: 999000 },
    { id: 7, name: "Túi Tote Canvas", price: 259000 },
    { id: 8, name: "Mũ lưỡi trai Navy", price: 199000 },
  ];

  return (
    <>
      <Hero />
      <ProductGrid products={mock} />
    </>
  );
}

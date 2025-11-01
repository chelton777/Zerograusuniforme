import type { Metadata } from "next"
import { ProductGrid } from "@/components/product-grid"

export const metadata: Metadata = {
  title: "Todos os Produtos | ZERO GRAUS",
  description: "Explore toda nossa coleção de uniformes e roupas profissionais de alta qualidade",
}

export default function ProdutosPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900/20 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 animate-fade-in-up">
            <h1 className="text-4xl lg:text-5xl font-bold text-balance">Todos os Produtos</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Explore nossa coleção completa de uniformes e roupas profissionais
            </p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProductGrid />
        </div>
      </section>
    </div>
  )
}

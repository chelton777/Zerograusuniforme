import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { getProductsByGender } from "@/lib/data"

export const metadata: Metadata = {
  title: "Uniformes Masculinos | ZERO GRAUS",
  description: "Descubra nossa coleção de uniformes e roupas profissionais masculinas de alta qualidade",
}

export default function HomemPage() {
  const products = getProductsByGender("homem")

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 animate-fade-in-up">
            <h1 className="text-4xl lg:text-5xl font-bold text-balance">Coleção Masculina</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Uniformes profissionais e roupas de qualidade para homens exigentes
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <Card
                key={product.id}
                className="group overflow-hidden hover-lift animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-0">
                  <Link href={`/produtos/${product.id}`}>
                    <div className="relative aspect-square overflow-hidden bg-slate-100 dark:bg-slate-800">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                      {product.inStock ? (
                        <span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                          Em Stock
                        </span>
                      ) : (
                        <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                          Esgotado
                        </span>
                      )}
                    </div>
                    <div className="p-4 space-y-2">
                      <h3 className="font-semibold text-sm lg:text-base line-clamp-1">{product.name}</h3>
                      <p className="text-xs text-muted-foreground line-clamp-2">{product.description}</p>
                      <p className="text-lg font-bold text-blue-600 dark:text-blue-400">{product.price} MT</p>
                    </div>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {products.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground">Nenhum produto encontrado nesta categoria.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { products, getProductById } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { AddToCartButton } from "@/components/add-to-cart-button"

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }))
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = getProductById(id)

  if (!product) {
    notFound()
  }

  // Get related products from the same category
  const relatedProducts = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8 animate-fade-in">
          <Link href="/" className="hover:text-foreground transition-colors">
            Início
          </Link>
          <span>/</span>
          <Link href="/#produtos" className="hover:text-foreground transition-colors">
            Produtos
          </Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>

        {/* Product Details */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Product Image */}
          <div className="space-y-4 animate-fade-in-up">
            <div className="aspect-square overflow-hidden rounded-lg bg-sand-100 dark:bg-slate-800">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                width={600}
                height={600}
                className="w-full h-full object-cover hover-scale"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6 animate-fade-in-up animate-delay-100">
            <div>
              <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {product.price.toLocaleString()} MT
                </span>
                {product.inStock ? (
                  <Badge className="bg-green-500">Em Stock</Badge>
                ) : (
                  <Badge variant="secondary">Esgotado</Badge>
                )}
              </div>
            </div>

            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p className="text-lg text-muted-foreground leading-relaxed">{product.description}</p>
            </div>

            <Card className="p-6 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
              <h3 className="font-semibold mb-4">Características do Produto</h3>
              <ul className="space-y-2 text-sm">
                {product.features?.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <svg
                      className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
                <li className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Material: {product.material}</span>
                </li>
              </ul>
            </Card>

            {(product.sizes || product.colors) && (
              <div className="space-y-4">
                {product.sizes && product.sizes.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-2">Tamanhos Disponíveis</h3>
                    <div className="flex gap-2 flex-wrap">
                      {product.sizes.map((size) => (
                        <Badge key={size} variant="outline" className="px-3 py-1">
                          {size}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                {product.colors && product.colors.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-2">Cores Disponíveis</h3>
                    <div className="flex gap-2 flex-wrap">
                      {product.colors.map((color) => (
                        <Badge key={color} variant="outline" className="px-3 py-1">
                          {color}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Add to Cart */}
            <div className="space-y-4">
              <AddToCartButton product={product} />
              <Button variant="outline" size="lg" className="w-full hover-lift bg-transparent" asChild>
                <a href="https://wa.me/258843456789" target="_blank" rel="noopener noreferrer">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  Fazer Pedido via WhatsApp
                </a>
              </Button>
            </div>

            {/* Shipping Info */}
            <div className="border-t pt-6 space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                  />
                </svg>
                <div>
                  <p className="font-medium">Entrega Rápida</p>
                  <p className="text-muted-foreground">Entrega em Maputo e Matola</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                <div>
                  <p className="font-medium">Garantia de Qualidade</p>
                  <p className="text-muted-foreground">Produtos verificados e de alta qualidade</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="animate-fade-in-up animate-delay-200">
            <h2 className="text-2xl font-bold mb-8">Produtos Relacionados</h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct, index) => (
                <Card
                  key={relatedProduct.id}
                  className="group overflow-hidden hover:shadow-lg transition-shadow hover-lift animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Link href={`/produtos/${relatedProduct.id}`}>
                    <div className="aspect-square overflow-hidden bg-sand-100 dark:bg-slate-800 relative">
                      <Image
                        src={relatedProduct.image || "/placeholder.svg"}
                        alt={relatedProduct.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-1">
                        {relatedProduct.name}
                      </h3>
                      <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                        {relatedProduct.price.toLocaleString()} MT
                      </span>
                    </div>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

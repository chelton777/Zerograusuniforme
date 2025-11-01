import { HeroCarousel } from "@/components/hero-carousel"
import { ProductGrid } from "@/components/product-grid"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Intelligent Carousel */}
      <HeroCarousel />

      {/* Services Section */}
      <section className="py-12 bg-slate-900 dark:bg-slate-950 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center space-y-3 animate-fade-in-up">
              <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center mx-auto hover-scale">
                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-white">Uniformes Escolares</h3>
              <p className="text-xs text-slate-400">Primária & Secundária</p>
            </div>

            <div className="text-center space-y-3 animate-fade-in-up animate-delay-100">
              <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center mx-auto hover-scale">
                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                  />
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-white">Bordados</h3>
              <p className="text-xs text-slate-400">Personalizados</p>
            </div>

            <div className="text-center space-y-3 animate-fade-in-up animate-delay-200">
              <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center mx-auto hover-scale">
                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 0115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-white">Estampagens</h3>
              <p className="text-xs text-slate-400">Camisas & Mais</p>
            </div>

            <div className="text-center space-y-3 animate-fade-in-up animate-delay-300">
              <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center mx-auto hover-scale">
                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-white">Roupas Segurança</h3>
              <p className="text-xs text-slate-400">Profissionais</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="produtos" className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 animate-fade-in-up">Nossa Coleção</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty animate-fade-in-up animate-delay-100">
              Uniformes escolares, bordados personalizados e roupas de segurança
            </p>
          </div>

          <ProductGrid />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-sand-50 dark:bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4 animate-fade-in-up">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto hover-scale animate-float">
                <svg
                  className="w-8 h-8 text-blue-600 dark:text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold">Qualidade Premium</h3>
              <p className="text-muted-foreground text-pretty">
                Materiais de alta qualidade para durabilidade excepcional
              </p>
            </div>

            <div className="text-center space-y-4 animate-fade-in-up animate-delay-100">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto hover-scale animate-float">
                <svg
                  className="w-8 h-8 text-blue-600 dark:text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold">Entrega Rápida</h3>
              <p className="text-muted-foreground text-pretty">Entrega rápida em Maputo e Matola</p>
            </div>

            <div className="text-center space-y-4 animate-fade-in-up animate-delay-200">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto hover-scale animate-float">
                <svg
                  className="w-8 h-8 text-blue-600 dark:text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold">Suporte Dedicado</h3>
              <p className="text-muted-foreground text-pretty">Atendimento personalizado via WhatsApp</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

import { Suspense } from 'react';
import { Search } from 'lucide-react';
import { ProductGrid } from '@/components/product-grid';
import { SearchBar } from '@/components/search-bar';
import { Button } from '@/components/ui/button';

interface SearchPageProps {
  searchParams: {
    q?: string;
    page?: string;
    category?: string;
    sort?: string;
  };
}

// Função simulada para buscar produtos
async function searchProducts(query: string, filters = {}) {
  // Em uma aplicação real, você faria uma chamada para sua API
  // Exemplo: const response = await fetch(`/api/search?q=${query}&...`);
  // return await response.json();
  
  // Simulando uma resposta da API
  await new Promise(resolve => setTimeout(resolve, 500)); // Simula atraso de rede
  
  const mockProducts = [
    {
      id: '1',
      name: `Camiseta ${query}`,
      price: 99.90,
      image: '/placeholder-product.jpg',
      category: 'Camisetas',
      inStock: true,
    },
    {
      id: '2',
      name: `Calça ${query}`,
      price: 159.90,
      image: '/placeholder-product.jpg',
      category: 'Calças',
      inStock: true,
    },
    // Adicione mais produtos simulados conforme necessário
  ];
  
  return {
    products: mockProducts,
    total: mockProducts.length,
    page: 1,
    totalPages: 1,
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || '';
  const { products, total } = await searchProducts(query, {
    page: searchParams.page,
    category: searchParams.category,
    sort: searchParams.sort,
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto mb-12">
        <SearchBar defaultValue={query} className="mb-8" />
        
        {query ? (
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-4">
              Resultados para: <span className="text-primary">"{query}"</span>
            </h1>
            <p className="text-muted-foreground">
              {total} {total === 1 ? 'resultado encontrado' : 'resultados encontrados'}
            </p>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 mb-4">
              <Search className="h-6 w-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight mb-2">O que você está procurando?</h2>
            <p className="text-muted-foreground mb-6">
              Digite palavras-chave para encontrar o produto ideal para você.
            </p>
          </div>
        )}
      </div>

      {query && (
        <Suspense fallback={<div>Carregando...</div>}>
          {products.length > 0 ? (
            <div>
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-muted-foreground">
                    Ordenar por:
                  </span>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">Mais relevantes</Button>
                    <Button variant="ghost" size="sm">Menor preço</Button>
                    <Button variant="ghost" size="sm">Maior preço</Button>
                    <Button variant="ghost" size="sm">Mais recentes</Button>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  {products.length} de {total} produtos
                </div>
              </div>
              
              <ProductGrid products={products} />
              
              {/* Paginação pode ser adicionada aqui */}
              {false && (
                <div className="flex justify-center mt-8">
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">Anterior</Button>
                    <Button variant="outline" size="sm">1</Button>
                    <Button size="sm">2</Button>
                    <Button variant="outline" size="sm">3</Button>
                    <Button variant="outline" size="sm">Próximo</Button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 mb-4">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium mb-2">Nenhum resultado encontrado</h3>
              <p className="text-muted-foreground mb-6">
                Não encontramos nenhum produto correspondente à sua busca.
              </p>
              <div className="space-x-2">
                <Button variant="outline" onClick={() => window.history.back()}>
                  Voltar
                </Button>
                <Button>Ver todos os produtos</Button>
              </div>
            </div>
          )}
        </Suspense>
      )}
    </div>
  );
}

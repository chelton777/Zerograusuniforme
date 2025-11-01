import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TermosPage() {
  return (
    <div className="min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-4xl font-bold mb-4">Termos de Serviço</h1>
          <p className="text-muted-foreground">Última atualização: Janeiro 2025</p>
        </div>

        <div className="space-y-6 animate-fade-in-up animate-delay-100">
          <Card>
            <CardHeader>
              <CardTitle>1. Aceitação dos Termos</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>
                Ao acessar e usar o site da ZERO GRAUS, você concorda em cumprir e estar vinculado a estes Termos de
                Serviço. Se você não concordar com algum destes termos, não use nosso site.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. Produtos e Preços</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>
                Todos os produtos estão sujeitos à disponibilidade. Reservamo-nos o direito de limitar as quantidades de
                qualquer produto que oferecemos. Os preços estão sujeitos a alterações sem aviso prévio.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3. Pedidos e Pagamento</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>
                Ao fazer um pedido, você garante que todas as informações fornecidas são verdadeiras e precisas.
                Reservamo-nos o direito de recusar ou cancelar qualquer pedido por qualquer motivo.
              </p>
              <p>Formas de pagamento aceitas:</p>
              <ul>
                <li>Transferência bancária</li>
                <li>M-Pesa</li>
                <li>Pagamento na entrega (sujeito a aprovação)</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>4. Entrega</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>
                Fazemos entregas em Maputo e Matola. Os prazos de entrega são estimativas e podem variar. Não nos
                responsabilizamos por atrasos causados por circunstâncias fora do nosso controle.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>5. Devoluções e Trocas</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>Aceitamos devoluções e trocas dentro de 7 dias após a entrega, desde que:</p>
              <ul>
                <li>O produto esteja em sua condição original</li>
                <li>Tenha todas as etiquetas e embalagens</li>
                <li>Não tenha sido usado ou lavado</li>
              </ul>
              <p>Entre em contato conosco para iniciar uma devolução ou troca.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>6. Propriedade Intelectual</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>
                Todo o conteúdo deste site, incluindo textos, gráficos, logos e imagens, é propriedade da ZERO GRAUS e
                está protegido por leis de direitos autorais.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>7. Limitação de Responsabilidade</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>
                A ZERO GRAUS não será responsável por quaisquer danos indiretos, incidentais ou consequenciais
                decorrentes do uso ou incapacidade de usar nossos produtos ou serviços.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>8. Alterações aos Termos</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>
                Reservamo-nos o direito de modificar estes termos a qualquer momento. As alterações entrarão em vigor
                imediatamente após a publicação no site.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>9. Contato</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>Para questões sobre estes Termos de Serviço, entre em contato:</p>
              <ul>
                <li>Email: legal@zerograus.co.mz</li>
                <li>Telefone: +258 84 345 6789</li>
                <li>Endereço: Av. Julius Nyerere, 1234, Maputo, Moçambique</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

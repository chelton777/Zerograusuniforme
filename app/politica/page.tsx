import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PoliticaPage() {
  return (
    <div className="min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-4xl font-bold mb-4">Política de Privacidade</h1>
          <p className="text-muted-foreground">Última atualização: Janeiro 2025</p>
        </div>

        <div className="space-y-6 animate-fade-in-up animate-delay-100">
          <Card>
            <CardHeader>
              <CardTitle>1. Informações que Coletamos</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>
                Na ZERO GRAUS, coletamos informações que você nos fornece diretamente ao fazer pedidos, criar uma conta
                ou entrar em contato conosco. Isso pode incluir:
              </p>
              <ul>
                <li>Nome completo</li>
                <li>Endereço de email</li>
                <li>Número de telefone</li>
                <li>Endereço de entrega</li>
                <li>Informações de pagamento</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. Como Usamos Suas Informações</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>Utilizamos as informações coletadas para:</p>
              <ul>
                <li>Processar e entregar seus pedidos</li>
                <li>Comunicar sobre o status do pedido</li>
                <li>Responder às suas perguntas e solicitações</li>
                <li>Enviar informações sobre produtos e promoções (com seu consentimento)</li>
                <li>Melhorar nossos produtos e serviços</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3. Compartilhamento de Informações</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>
                Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros para fins de marketing.
                Podemos compartilhar informações apenas com:
              </p>
              <ul>
                <li>Prestadores de serviços que nos ajudam a operar nosso negócio</li>
                <li>Autoridades legais quando exigido por lei</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>4. Segurança dos Dados</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>
                Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações pessoais
                contra acesso não autorizado, alteração, divulgação ou destruição.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>5. Seus Direitos</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>Você tem o direito de:</p>
              <ul>
                <li>Acessar suas informações pessoais</li>
                <li>Corrigir informações incorretas</li>
                <li>Solicitar a exclusão de suas informações</li>
                <li>Optar por não receber comunicações de marketing</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>6. Cookies</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>
                Utilizamos cookies para melhorar sua experiência em nosso site. Você pode configurar seu navegador para
                recusar cookies, mas isso pode afetar a funcionalidade do site.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>7. Contato</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>Se você tiver dúvidas sobre nossa Política de Privacidade, entre em contato conosco:</p>
              <ul>
                <li>Email: privacidade@zerograus.co.mz</li>
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

"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

export default function FazerPedidoPage() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    produto: "",
    quantidade: "",
    tamanho: "",
    mensagem: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Create WhatsApp message
    const message = `
*Novo Pedido - ZERO GRAUS*

*Nome:* ${formData.nome}
*Email:* ${formData.email}
*Telefone:* ${formData.telefone}
*Produto:* ${formData.produto}
*Quantidade:* ${formData.quantidade}
*Tamanho:* ${formData.tamanho}
*Mensagem:* ${formData.mensagem}
    `.trim()

    const whatsappUrl = `https://wa.me/258843456789?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")

    toast({
      title: "Pedido enviado!",
      description: "Você será redirecionado para o WhatsApp para finalizar o pedido.",
    })

    // Reset form
    setFormData({
      nome: "",
      email: "",
      telefone: "",
      produto: "",
      quantidade: "",
      tamanho: "",
      mensagem: "",
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-4xl font-bold mb-4">Fazer Pedido</h1>
          <p className="text-xl text-muted-foreground text-pretty">
            Preencha o formulário abaixo e entraremos em contato via WhatsApp
          </p>
        </div>

        <Card className="animate-fade-in-up animate-delay-100">
          <CardHeader>
            <CardTitle>Informações do Pedido</CardTitle>
            <CardDescription>Preencha todos os campos para processar seu pedido</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome Completo *</Label>
                  <Input
                    id="nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                    placeholder="Seu nome completo"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telefone">Telefone *</Label>
                  <Input
                    id="telefone"
                    name="telefone"
                    type="tel"
                    value={formData.telefone}
                    onChange={handleChange}
                    required
                    placeholder="+258 84 345 6789"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="seu@email.com"
                />
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="produto">Produto *</Label>
                  <Input
                    id="produto"
                    name="produto"
                    value={formData.produto}
                    onChange={handleChange}
                    required
                    placeholder="Nome do produto"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quantidade">Quantidade *</Label>
                  <Input
                    id="quantidade"
                    name="quantidade"
                    type="number"
                    min="1"
                    value={formData.quantidade}
                    onChange={handleChange}
                    required
                    placeholder="1"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tamanho">Tamanho *</Label>
                  <Input
                    id="tamanho"
                    name="tamanho"
                    value={formData.tamanho}
                    onChange={handleChange}
                    required
                    placeholder="P, M, G, GG"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="mensagem">Mensagem Adicional</Label>
                <Textarea
                  id="mensagem"
                  name="mensagem"
                  value={formData.mensagem}
                  onChange={handleChange}
                  placeholder="Informações adicionais sobre seu pedido..."
                  rows={4}
                />
              </div>

              <Button type="submit" size="lg" className="w-full">
                Enviar Pedido via WhatsApp
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg animate-fade-in-up animate-delay-200">
          <h3 className="font-semibold mb-2">Como funciona?</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
            <li>Preencha o formulário com as informações do seu pedido</li>
            <li>Clique em "Enviar Pedido via WhatsApp"</li>
            <li>Você será redirecionado para o WhatsApp com a mensagem pronta</li>
            <li>Envie a mensagem e aguarde nosso contato para confirmar o pedido</li>
          </ol>
        </div>
      </div>
    </div>
  )
}

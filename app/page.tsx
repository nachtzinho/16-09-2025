"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ExternalLink,
  Scissors,
  Radar as Razor,
  Brush,
  Star,
  Award,
  Users,
  ShoppingBag,
  ArrowRight,
  Play,
  Instagram,
  Facebook,
  Twitter,
  Shield,
  Truck,
  Clock,
  Phone,
  Mail,
  MapPin,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getProducts, type Product } from "@/lib/products"

const testimonials = [
  {
    name: "Carlos Silva",
    role: "Barbeiro Profissional",
    content: "Os produtos da useandrades revolucionaram minha barbearia. Qualidade excepcional!",
    rating: 5,
    image: "/barbeiro-profissional.jpg",
  },
  {
    name: "Roberto Santos",
    role: "Cliente Fiel",
    content: "Uso há 2 anos e não troco por nada. Meu cabelo nunca esteve tão bem cuidado.",
    rating: 5,
    image: "/cliente-satisfeito.jpg",
  },
  {
    name: "André Costa",
    role: "Influencer",
    content: "Recomendo para todos os meus seguidores. Produtos de qualidade premium!",
    rating: 5,
    image: "/influencer-masculino.jpg",
  },
]

export default function Component() {
  const [scrollY, setScrollY] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    setIsVisible(true)
    setProducts(getProducts())
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Animated Background Particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            >
              <div className="w-1 h-1 bg-white/20 rounded-full" />
            </div>
          ))}
        </div>
      </div>

      {/* Header - Enhanced */}
      <header className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-xl border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 group">
              <div className="relative">
                <Scissors className="h-8 w-8 text-white group-hover:rotate-12 transition-transform duration-300" />
                <div className="absolute inset-0 bg-white/20 rounded-full blur-xl group-hover:bg-white/30 transition-all duration-300" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                useandrades
              </h1>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              {["Produtos", "Sobre", "Depoimentos", "Contato"].map((item) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="relative text-gray-300 hover:text-white transition-all duration-300 group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-white to-gray-400 group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
              <Link
                href="/admin/login"
                className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-white transition-all duration-300 text-sm"
              >
                Admin
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section - Spectacular */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800"
            style={{ transform: `translateY(${scrollY * 0.5}px)` }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[
            { Icon: Razor, size: "h-16 w-16", position: "top-20 left-10", rotation: "rotate-12", delay: "0s" },
            { Icon: Brush, size: "h-12 w-12", position: "top-40 right-20", rotation: "-rotate-45", delay: "1s" },
            { Icon: Scissors, size: "h-20 w-20", position: "bottom-32 left-1/4", rotation: "rotate-45", delay: "2s" },
            { Icon: Razor, size: "h-14 w-14", position: "bottom-20 right-10", rotation: "-rotate-12", delay: "0.5s" },
          ].map(({ Icon, size, position, rotation, delay }, index) => (
            <div
              key={index}
              className={`absolute ${position} ${rotation} opacity-10 animate-bounce`}
              style={{ animationDelay: delay, animationDuration: "3s" }}
            >
              <Icon className={`${size} text-white`} />
            </div>
          ))}
        </div>

        <div
          className={`relative container mx-auto text-center px-4 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="mb-6">
            <Badge className="bg-white/10 text-white border-white/20 mb-4 animate-pulse">
              ✨ Cosméticos Premium para Barbearia
            </Badge>
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 leading-none">
            <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent animate-pulse">
              use
            </span>
            <span className="bg-gradient-to-r from-gray-400 via-white to-gray-400 bg-clip-text text-transparent">
              andrades
            </span>
          </h1>

          <p className="text-xl md:text-3xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            Transforme seu visual com produtos de{" "}
            <span className="text-white font-semibold">qualidade profissional</span>.
            <br />
            Desenvolvidos para o homem que não aceita menos que a{" "}
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent font-bold">
              excelência
            </span>
            .
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <Button
              size="lg"
              className="bg-white text-black hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 shadow-2xl px-8 py-4 text-lg font-semibold group"
              onClick={() => document.getElementById("produtos")?.scrollIntoView({ behavior: "smooth" })}
            >
              Explorar Produtos
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 transition-all duration-300 backdrop-blur-sm px-8 py-4 text-lg group bg-transparent"
            >
              <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Ver Demonstração
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            {[
              { number: "10K+", label: "Clientes Satisfeitos" },
              { number: "500+", label: "Barbearias Parceiras" },
              { number: "4.9★", label: "Avaliação Média" },
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-2xl md:text-3xl font-bold text-white mb-1 group-hover:scale-110 transition-transform">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Products Section - Enhanced with Dynamic Data */}
      <section id="produtos" className="py-24 px-4 bg-gradient-to-b from-black via-gray-900 to-black relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.05),transparent_50%)]" />

        <div className="container mx-auto relative">
          <div className="text-center mb-16">
            <Badge className="bg-white/10 text-white border-white/20 mb-4">🏆 Produtos Premium</Badge>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
              Nossa Coleção Exclusiva
            </h2>
            <p className="text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed">
              Cada produto é cuidadosamente desenvolvido com ingredientes premium para garantir resultados profissionais
              e satisfação total.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.slice(0, 6).map((product, index) => (
              <Card
                key={product.id}
                className={`bg-black/50 border-white/10 hover:border-white/30 transition-all duration-500 group backdrop-blur-sm hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-white/10 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <CardHeader className="p-0 relative overflow-hidden">
                  <div className="relative">
                    <Image
                      src={product.image || "/placeholder.svg?height=400&width=400&query=produto+cosmético+masculino"}
                      alt={product.name}
                      width={400}
                      height={400}
                      className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Badge */}
                    <Badge className="absolute top-4 left-4 bg-white text-black font-semibold">{product.badge}</Badge>

                    {/* Rating */}
                    <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-white text-sm font-semibold">{product.rating}</span>
                    </div>

                    {!product.inStock && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <Badge variant="destructive" className="text-lg px-4 py-2">
                          Fora de Estoque
                        </Badge>
                      </div>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="p-6">
                  <CardTitle className="text-white mb-3 text-xl group-hover:text-gray-200 transition-colors">
                    {product.name}
                  </CardTitle>
                  <CardDescription className="text-gray-400 mb-4 line-clamp-3 leading-relaxed">
                    {product.description}
                  </CardDescription>

                  <div className="mb-4">
                    <Badge variant="outline" className="border-blue-500/30 text-blue-400 text-xs">
                      {product.category}
                    </Badge>
                  </div>

                  <div className="flex items-center space-x-2 mb-4">
                    <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
                    <span className="text-2xl font-bold text-white">{product.price}</span>
                    <Badge variant="outline" className="border-green-500 text-green-400">
                      ECONOMIA
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-600"
                          }`}
                        />
                      ))}
                      <span className="text-sm text-gray-400 ml-2">({product.reviews} avaliações)</span>
                    </div>
                  </div>

                  <Button
                    asChild
                    className={`w-full transition-all duration-300 transform hover:scale-105 font-semibold group ${
                      product.inStock
                        ? "bg-white text-black hover:bg-gray-200"
                        : "bg-gray-600 text-gray-300 cursor-not-allowed"
                    }`}
                    disabled={!product.inStock}
                  >
                    <Link href={product.inStock ? product.link : "#"} target="_blank" rel="noopener noreferrer">
                      <ShoppingBag className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                      {product.inStock ? "Comprar Agora" : "Indisponível"}
                      {product.inStock && (
                        <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      )}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {products.length > 6 && (
            <div className="text-center mt-12">
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 px-8 py-4 bg-transparent"
              >
                Ver Todos os Produtos ({products.length})
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          )}
        </div>
      </section>

      <section className="py-24 px-4 bg-gradient-to-b from-gray-900 to-black relative">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-white/10 text-white border-white/20 mb-4">🛡️ Garantias</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
              Compre com Confiança
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Garantia de Qualidade",
                description: "30 dias para trocar ou devolver se não ficar satisfeito",
                color: "bg-green-500/20 text-green-400",
              },
              {
                icon: Truck,
                title: "Frete Grátis",
                description: "Entrega gratuita para compras acima de R$ 99,00",
                color: "bg-blue-500/20 text-blue-400",
              },
              {
                icon: Clock,
                title: "Entrega Rápida",
                description: "Receba em até 3 dias úteis em todo o Brasil",
                color: "bg-purple-500/20 text-purple-400",
              },
            ].map((benefit, index) => (
              <Card
                key={index}
                className="bg-black/50 border-white/10 hover:border-white/30 transition-all duration-300 text-center"
              >
                <CardContent className="p-8">
                  <div
                    className={`${benefit.color} rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6`}
                  >
                    <benefit.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">{benefit.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="depoimentos" className="py-24 px-4 bg-gradient-to-b from-black to-gray-900 relative">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-white/10 text-white border-white/20 mb-4">💬 Depoimentos</Badge>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
              O Que Dizem Nossos Clientes
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="bg-white/5 border-white/10 hover:border-white/30 transition-all duration-300 backdrop-blur-sm group hover:transform hover:scale-105"
              >
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-6 italic leading-relaxed">"{testimonial.content}"</p>
                  <div className="flex items-center space-x-3">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={50}
                      height={50}
                      className="rounded-full"
                    />
                    <div>
                      <div className="text-white font-semibold">{testimonial.name}</div>
                      <div className="text-gray-400 text-sm">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section - Enhanced */}
      <section id="sobre" className="py-24 px-4 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.05),transparent_50%)]" />

        <div className="container mx-auto relative">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <Badge className="bg-white/10 text-white border-white/20 mb-4">🎯 Nossa Missão</Badge>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                  Excelência em Cada Produto
                </h2>
                <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                  Na <strong>useandrades</strong>, acreditamos que todo homem merece produtos de qualidade excepcional.
                  Desenvolvemos cada fórmula com ingredientes premium, testados e aprovados por barbeiros profissionais
                  em todo o Brasil.
                </p>
                <p className="text-gray-400 mb-8 leading-relaxed">
                  Nossa paixão pela excelência nos levou a criar uma linha completa de cosméticos masculinos que
                  combinam tradição e inovação, proporcionando resultados profissionais em casa.
                </p>

                <div className="grid grid-cols-2 gap-6 mb-8">
                  {[
                    { number: "5+", label: "Anos de Experiência" },
                    { number: "100%", label: "Ingredientes Premium" },
                    { number: "24h", label: "Suporte ao Cliente" },
                    { number: "30", label: "Dias de Garantia" },
                  ].map((stat, index) => (
                    <div key={index} className="text-center group">
                      <div className="text-3xl font-bold text-white mb-1 group-hover:scale-110 transition-transform">
                        {stat.number}
                      </div>
                      <div className="text-sm text-gray-400">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-8">
                {[
                  {
                    icon: Award,
                    title: "Qualidade Premium",
                    description: "Produtos desenvolvidos com os melhores ingredientes do mercado internacional",
                  },
                  {
                    icon: Users,
                    title: "Aprovado por Profissionais",
                    description: "Testados e recomendados por barbeiros experientes em todo o país",
                  },
                  {
                    icon: Star,
                    title: "Resultados Garantidos",
                    description: "Satisfação comprovada com mais de 10.000 clientes satisfeitos",
                  },
                ].map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4 group">
                    <div className="bg-white/10 rounded-full p-3 group-hover:bg-white/20 transition-colors">
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-gray-200 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section - Enhanced */}
      <section id="contato" className="py-24 px-4 bg-gradient-to-b from-gray-900 to-black relative">
        <div className="container mx-auto text-center">
          <Badge className="bg-white/10 text-white border-white/20 mb-4">📞 Fale Conosco</Badge>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
            Vamos Conversar?
          </h2>
          <p className="text-gray-300 text-xl mb-12 max-w-3xl mx-auto leading-relaxed">
            Tem alguma dúvida sobre nossos produtos? Nossa equipe está pronta para ajudar você a encontrar a solução
            perfeita para suas necessidades.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
            <Card className="bg-white/5 border-white/10 hover:border-white/30 transition-all duration-300 backdrop-blur-sm group hover:transform hover:scale-105">
              <CardContent className="p-8 text-center">
                <div className="bg-green-500/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-green-500/30 transition-colors">
                  <Phone className="h-8 w-8 text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">WhatsApp</h3>
                <p className="text-gray-400 mb-4">Atendimento rápido e personalizado</p>
                <p className="text-sm text-gray-500 mb-4">(11) 99999-9999</p>
                <Button className="bg-green-500 hover:bg-green-600 text-white" asChild>
                  <Link href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer">
                    Chamar no WhatsApp
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 hover:border-white/30 transition-all duration-300 backdrop-blur-sm group hover:transform hover:scale-105">
              <CardContent className="p-8 text-center">
                <div className="bg-blue-500/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-500/30 transition-colors">
                  <Mail className="h-8 w-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">E-mail</h3>
                <p className="text-gray-400 mb-4">Suporte técnico e parcerias</p>
                <p className="text-sm text-gray-500 mb-4">contato@useandrades.com</p>
                <Button
                  variant="outline"
                  className="border-blue-500 text-blue-400 hover:bg-blue-500/10 bg-transparent"
                  asChild
                >
                  <Link href="mailto:contato@useandrades.com">Enviar E-mail</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 hover:border-white/30 transition-all duration-300 backdrop-blur-sm group hover:transform hover:scale-105">
              <CardContent className="p-8 text-center">
                <div className="bg-purple-500/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-500/30 transition-colors">
                  <MapPin className="h-8 w-8 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Endereço</h3>
                <p className="text-gray-400 mb-4">Visite nossa loja física</p>
                <p className="text-sm text-gray-500 mb-4">São Paulo - SP</p>
                <Button
                  variant="outline"
                  className="border-purple-500 text-purple-400 hover:bg-purple-500/10 bg-transparent"
                >
                  Ver no Mapa
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Social Media */}
          <div className="flex justify-center space-x-6">
            {[
              { Icon: Instagram, href: "#", color: "hover:text-pink-400" },
              { Icon: Facebook, href: "#", color: "hover:text-blue-400" },
              { Icon: Twitter, href: "#", color: "hover:text-sky-400" },
            ].map(({ Icon, href, color }, index) => (
              <Link
                key={index}
                href={href}
                className={`text-gray-400 ${color} transition-colors transform hover:scale-110`}
              >
                <Icon className="h-8 w-8" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer - Elegant */}
      <footer className="bg-black border-t border-white/10 py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <Scissors className="h-8 w-8 text-white" />
                <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  useandrades
                </span>
              </div>
              <p className="text-gray-400 mb-4 max-w-md leading-relaxed">
                Cosméticos premium para o homem moderno. Qualidade profissional, resultados excepcionais.
              </p>
              <div className="flex space-x-4">
                {[Instagram, Facebook, Twitter].map((Icon, index) => (
                  <div
                    key={index}
                    className="bg-white/10 rounded-full p-2 hover:bg-white/20 transition-colors cursor-pointer"
                  >
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Links Rápidos</h4>
              <ul className="space-y-2">
                {["Produtos", "Sobre", "Depoimentos", "Contato"].map((item) => (
                  <li key={item}>
                    <Link href={`#${item.toLowerCase()}`} className="text-gray-400 hover:text-white transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Suporte</h4>
              <ul className="space-y-2">
                {["FAQ", "Política de Privacidade", "Termos de Uso", "Garantia"].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 <span className="text-white font-semibold">useandrades</span>. Todos os direitos reservados.
              Desenvolvido com ❤️ para o homem moderno.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

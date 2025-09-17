"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Package,
  Users,
  ShoppingCart,
  TrendingUp,
  Star,
  Eye,
  Camera,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"
import AuthGuard from "@/components/admin/auth-guard"
import AdminLayout from "@/components/admin/layout"
import { getProducts } from "@/lib/products"
import Link from "next/link"

interface DashboardStats {
  totalProducts: number
  totalUsers: number
  totalOrders: number
  totalRevenue: string
  avgRating: number
  totalViews: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: "R$ 0,00",
    avgRating: 0,
    totalViews: 0,
  })

  const [recentActivity, setRecentActivity] = useState([
    {
      id: 1,
      type: "product",
      message: "Novo produto adicionado: Pomada Modeladora Premium",
      time: "2 horas atrás",
      icon: Package,
    },
    {
      id: 2,
      type: "order",
      message: "Pedido #1234 realizado - R$ 89,90",
      time: "4 horas atrás",
      icon: ShoppingCart,
    },
    {
      id: 3,
      type: "user",
      message: "Novo usuário cadastrado: João Silva",
      time: "6 horas atrás",
      icon: Users,
    },
    {
      id: 4,
      type: "review",
      message: "Nova avaliação 5 estrelas recebida",
      time: "8 horas atrás",
      icon: Star,
    },
  ])

  useEffect(() => {
    // Calcular estatísticas baseadas nos produtos
    const products = getProducts()
    const totalRating = products.reduce((sum, product) => sum + product.rating, 0)
    const totalReviews = products.reduce((sum, product) => sum + product.reviews, 0)

    setStats({
      totalProducts: products.length,
      totalUsers: 1247, // Simulado
      totalOrders: 89, // Simulado
      totalRevenue: "R$ 12.450,00", // Simulado
      avgRating: products.length > 0 ? totalRating / products.length : 0,
      totalViews: 15420, // Simulado
    })
  }, [])

  const statCards = [
    {
      title: "Total de Produtos",
      value: stats.totalProducts.toString(),
      description: "Produtos cadastrados",
      icon: Package,
      trend: "+12%",
      trendUp: true,
    },
    {
      title: "Usuários Ativos",
      value: stats.totalUsers.toLocaleString(),
      description: "Usuários registrados",
      icon: Users,
      trend: "+8%",
      trendUp: true,
    },
    {
      title: "Pedidos do Mês",
      value: stats.totalOrders.toString(),
      description: "Pedidos realizados",
      icon: ShoppingCart,
      trend: "+23%",
      trendUp: true,
    },
    {
      title: "Receita Total",
      value: stats.totalRevenue,
      description: "Faturamento mensal",
      icon: TrendingUp,
      trend: "+15%",
      trendUp: true,
    },
    {
      title: "Avaliação Média",
      value: stats.avgRating.toFixed(1),
      description: "Satisfação dos clientes",
      icon: Star,
      trend: "+0.2",
      trendUp: true,
    },
    {
      title: "Visualizações",
      value: stats.totalViews.toLocaleString(),
      description: "Views no site",
      icon: Eye,
      trend: "-3%",
      trendUp: false,
    },
  ]

  return (
    <AuthGuard>
      <AdminLayout>
        <div className="space-y-6">
          {/* Welcome Section */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Dashboard</h1>
              <p className="text-gray-400">Bem-vindo ao painel administrativo da useandrades</p>
            </div>
            <div className="flex space-x-3">
              <Button asChild className="bg-blue-500 hover:bg-blue-600">
                <Link href="/admin/products">
                  <Camera className="mr-2 h-4 w-4" />
                  Fotografar Produto
                </Link>
              </Button>
              <Button asChild className="bg-white text-black hover:bg-gray-200">
                <Link href="/admin/products">
                  <Plus className="mr-2 h-4 w-4" />
                  Novo Produto
                </Link>
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {statCards.map((stat, index) => (
              <Card
                key={index}
                className="bg-black/50 border-white/10 hover:border-white/30 transition-all duration-300"
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-400">{stat.title}</CardTitle>
                  <div className="bg-white/10 rounded-full p-2">
                    <stat.icon className="h-4 w-4 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="flex items-center space-x-2">
                    <p className="text-xs text-gray-400">{stat.description}</p>
                    <Badge
                      variant="outline"
                      className={`text-xs ${
                        stat.trendUp ? "border-green-500 text-green-400" : "border-red-500 text-red-400"
                      }`}
                    >
                      {stat.trendUp ? (
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                      ) : (
                        <ArrowDownRight className="h-3 w-3 mr-1" />
                      )}
                      {stat.trend}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recent Activity & Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <Card className="bg-black/50 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Atividade Recente</CardTitle>
                <CardDescription className="text-gray-400">Últimas ações realizadas no sistema</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3">
                      <div className="bg-white/10 rounded-full p-2">
                        <activity.icon className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-white">{activity.message}</p>
                        <p className="text-xs text-gray-400">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-black/50 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Ações Rápidas</CardTitle>
                <CardDescription className="text-gray-400">Acesso rápido às principais funcionalidades</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    asChild
                    variant="outline"
                    className="h-20 flex-col border-white/20 text-white hover:bg-white/10 bg-transparent"
                  >
                    <Link href="/admin/products">
                      <Package className="h-6 w-6 mb-2" />
                      <span className="text-sm">Gerenciar Produtos</span>
                    </Link>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    className="h-20 flex-col border-white/20 text-white hover:bg-white/10 bg-transparent"
                  >
                    <Link href="/admin/users">
                      <Users className="h-6 w-6 mb-2" />
                      <span className="text-sm">Usuários</span>
                    </Link>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    className="h-20 flex-col border-white/20 text-white hover:bg-white/10 bg-transparent"
                  >
                    <Link href="/admin/reports">
                      <TrendingUp className="h-6 w-6 mb-2" />
                      <span className="text-sm">Relatórios</span>
                    </Link>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    className="h-20 flex-col border-white/20 text-white hover:bg-white/10 bg-transparent"
                  >
                    <Link href="/admin/settings">
                      <Camera className="h-6 w-6 mb-2" />
                      <span className="text-sm">Fotografar</span>
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* System Status */}
          <Card className="bg-black/50 border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Status do Sistema</CardTitle>
              <CardDescription className="text-gray-400">
                Informações sobre o funcionamento da plataforma
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-green-500/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                  <h3 className="text-white font-medium">Sistema Online</h3>
                  <p className="text-sm text-gray-400">Funcionando normalmente</p>
                </div>

                <div className="text-center">
                  <div className="bg-blue-500/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                    <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                  </div>
                  <h3 className="text-white font-medium">Backup Automático</h3>
                  <p className="text-sm text-gray-400">Último: hoje às 03:00</p>
                </div>

                <div className="text-center">
                  <div className="bg-yellow-500/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                  </div>
                  <h3 className="text-white font-medium">Atualizações</h3>
                  <p className="text-sm text-gray-400">1 atualização disponível</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
    </AuthGuard>
  )
}

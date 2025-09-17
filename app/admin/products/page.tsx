"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Edit, Trash2, Search, Package, Star, ExternalLink } from "lucide-react"
import AuthGuard from "@/components/admin/auth-guard"
import AdminLayout from "@/components/admin/layout"
import { type Product, getProducts, deleteProduct } from "@/lib/products"
import ProductForm from "@/components/admin/product-form"
import Image from "next/image"

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)

  useEffect(() => {
    setProducts(getProducts())
  }, [])

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDelete = (id: number) => {
    if (confirm("Tem certeza que deseja excluir este produto?")) {
      if (deleteProduct(id)) {
        setProducts(getProducts())
      }
    }
  }

  const handleProductSaved = () => {
    setProducts(getProducts())
    setIsFormOpen(false)
    setSelectedProduct(null)
  }

  return (
    <AuthGuard>
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Gerenciar Produtos</h1>
              <p className="text-gray-400">Adicione, edite e remova produtos da sua loja</p>
            </div>
            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
              <DialogTrigger asChild>
                <Button className="bg-white text-black hover:bg-gray-200">
                  <Plus className="mr-2 h-4 w-4" />
                  Novo Produto
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-black border-white/20 text-white max-w-2xl">
                <DialogHeader>
                  <DialogTitle>{selectedProduct ? "Editar Produto" : "Novo Produto"}</DialogTitle>
                  <DialogDescription className="text-gray-400">
                    {selectedProduct ? "Atualize as informações do produto" : "Adicione um novo produto à sua loja"}
                  </DialogDescription>
                </DialogHeader>
                <ProductForm
                  product={selectedProduct}
                  onSave={handleProductSaved}
                  onCancel={() => {
                    setIsFormOpen(false)
                    setSelectedProduct(null)
                  }}
                />
              </DialogContent>
            </Dialog>
          </div>

          <Card className="bg-black/50 border-white/10">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Package className="h-5 w-5 text-white" />
                  <CardTitle className="text-white">Lista de Produtos</CardTitle>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Buscar produtos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-gray-500 w-64"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border border-white/10">
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/10">
                      <TableHead className="text-gray-300">Produto</TableHead>
                      <TableHead className="text-gray-300">Categoria</TableHead>
                      <TableHead className="text-gray-300">Preço</TableHead>
                      <TableHead className="text-gray-300">Avaliação</TableHead>
                      <TableHead className="text-gray-300">Status</TableHead>
                      <TableHead className="text-gray-300">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProducts.map((product) => (
                      <TableRow key={product.id} className="border-white/10">
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Image
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              width={50}
                              height={50}
                              className="rounded-lg object-cover"
                            />
                            <div>
                              <div className="font-medium text-white">{product.name}</div>
                              <div className="text-sm text-gray-400 line-clamp-1">{product.description}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="border-white/20 text-gray-300">
                            {product.category}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-white font-medium">{product.price}</div>
                          <div className="text-sm text-gray-400 line-through">{product.originalPrice}</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="text-white">{product.rating}</span>
                            <span className="text-gray-400 text-sm">({product.reviews})</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={product.inStock ? "default" : "destructive"}
                            className={product.inStock ? "bg-green-500/20 text-green-400" : ""}
                          >
                            {product.inStock ? "Em Estoque" : "Fora de Estoque"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setSelectedProduct(product)
                                setIsFormOpen(true)
                              }}
                              className="text-gray-400 hover:text-white"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(product.id)}
                              className="text-gray-400 hover:text-red-400"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" asChild className="text-gray-400 hover:text-white">
                              <a href={product.link} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-4 w-4" />
                              </a>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-8">
                  <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400">
                    {searchTerm ? "Nenhum produto encontrado" : "Nenhum produto cadastrado"}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
    </AuthGuard>
  )
}

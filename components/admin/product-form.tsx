"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { type Product, addProduct, updateProduct } from "@/lib/products"
import ImageUpload from "./image-upload"
import { Save, X, Star } from "lucide-react"

interface ProductFormProps {
  product?: Product | null
  onSave: () => void
  onCancel: () => void
}

const categories = ["Cabelo", "Barba", "Pele", "Kit Completo", "Acessórios", "Outros"]
const badges = ["NOVO", "BESTSELLER", "OFERTA", "PREMIUM", "RECOMENDADO", "KIT COMPLETO", "LIMITADO"]

export default function ProductForm({ product, onSave, onCancel }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    originalPrice: "",
    image: "",
    link: "",
    badge: "NOVO",
    rating: 5,
    reviews: 0,
    category: "Cabelo",
    inStock: true,
  })

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        link: product.link,
        badge: product.badge,
        rating: product.rating,
        reviews: product.reviews,
        category: product.category,
        inStock: product.inStock,
      })
    }
  }, [product])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (product) {
        updateProduct(product.id, formData)
      } else {
        addProduct(formData)
      }
      onSave()
    } catch (error) {
      console.error("Erro ao salvar produto:", error)
      alert("Erro ao salvar produto. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    // Container com scroll para resolver problema de campo fora de vista
    <div className="max-h-screen overflow-y-auto pb-20">
      <form onSubmit={handleSubmit} className="space-y-6 p-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Informações Básicas */}
          <Card className="bg-white/5 border-white/20">
            <CardHeader>
              <CardTitle className="text-white text-lg">Informações Básicas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-white">
                  Nome do Produto
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="bg-white/5 border-white/20 text-white"
                  placeholder="Ex: Pomada Modeladora Premium"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description" className="text-white">
                  Descrição
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  className="bg-white/5 border-white/20 text-white min-h-[100px]"
                  placeholder="Descreva o produto, seus benefícios e características..."
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category" className="text-white">
                    Categoria
                  </Label>
                  <Select value={formData.category} onValueChange={(value) => handleChange("category", value)}>
                    <SelectTrigger className="bg-white/5 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-black border-white/20">
                      {categories.map((category) => (
                        <SelectItem key={category} value={category} className="text-white">
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="badge" className="text-white">
                    Badge
                  </Label>
                  <Select value={formData.badge} onValueChange={(value) => handleChange("badge", value)}>
                    <SelectTrigger className="bg-white/5 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-black border-white/20">
                      {badges.map((badge) => (
                        <SelectItem key={badge} value={badge} className="text-white">
                          <Badge variant="outline" className="border-white/20">
                            {badge}
                          </Badge>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Preços e Avaliações */}
          <Card className="bg-white/5 border-white/20">
            <CardHeader>
              <CardTitle className="text-white text-lg">Preços e Avaliações</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price" className="text-white">
                    Preço Atual
                  </Label>
                  <Input
                    id="price"
                    value={formData.price}
                    onChange={(e) => handleChange("price", e.target.value)}
                    className="bg-white/5 border-white/20 text-white"
                    placeholder="R$ 45,90"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="originalPrice" className="text-white">
                    Preço Original
                  </Label>
                  <Input
                    id="originalPrice"
                    value={formData.originalPrice}
                    onChange={(e) => handleChange("originalPrice", e.target.value)}
                    className="bg-white/5 border-white/20 text-white"
                    placeholder="R$ 59,90"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="rating" className="text-white">
                    Avaliação
                  </Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="rating"
                      type="number"
                      min="1"
                      max="5"
                      step="0.1"
                      value={formData.rating}
                      onChange={(e) => handleChange("rating", Number.parseFloat(e.target.value))}
                      className="bg-white/5 border-white/20 text-white"
                    />
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < Math.floor(formData.rating) ? "text-yellow-400 fill-current" : "text-gray-600"}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="reviews" className="text-white">
                    Nº de Avaliações
                  </Label>
                  <Input
                    id="reviews"
                    type="number"
                    min="0"
                    value={formData.reviews}
                    onChange={(e) => handleChange("reviews", Number.parseInt(e.target.value))}
                    className="bg-white/5 border-white/20 text-white"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="link" className="text-white">
                  Link de Compra
                </Label>
                <Input
                  id="link"
                  type="url"
                  value={formData.link}
                  onChange={(e) => handleChange("link", e.target.value)}
                  className="bg-white/5 border-white/20 text-white"
                  placeholder="https://mercadolivre.com.br/produto"
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="inStock"
                  checked={formData.inStock}
                  onCheckedChange={(checked) => handleChange("inStock", checked)}
                />
                <Label htmlFor="inStock" className="text-white">
                  Produto em estoque
                </Label>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upload de Imagem - Com estilização corrigida */}
        <Card className="bg-white/5 border-white/20">
          <CardHeader>
            <CardTitle className="text-white text-lg">Imagem do Produto</CardTitle>
          </CardHeader>
          <CardContent>
            <ImageUpload 
              value={formData.image} 
              onChange={(value) => handleChange("image", value)} 
              className="text-white border-white/20"
            />
          </CardContent>
        </Card>

        {/* Botões de Ação */}
        <div className="flex justify-end space-x-4 sticky bottom-0 bg-[#1a1f2b] p-3 rounded-lg border border-white/10">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="border-white/20 text-white hover:bg-white/10 bg-transparent"
          >
            <X className="mr-2 h-4 w-4" />
            Cancelar
          </Button>
          <Button type="submit" disabled={isLoading} className="bg-white text-black hover:bg-gray-200">
            <Save className="mr-2 h-4 w-4" />
            {isLoading ? "Salvando..." : "Salvar Produto"}
          </Button>
        </div>
      </form>
    </div>
  )
}
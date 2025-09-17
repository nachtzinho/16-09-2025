export interface Product {
  id: number
  name: string
  description: string
  price: string
  originalPrice: string
  image: string
  link: string
  badge: string
  rating: number
  reviews: number
  category: string
  inStock: boolean
  createdAt: string
  updatedAt: string
}

const STORAGE_KEY = "useandrades_products"

export const getProducts = (): Product[] => {
  if (typeof window === "undefined") return []
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored) {
    return JSON.parse(stored)
  }

  // Produtos padrão se não houver no localStorage
  const defaultProducts: Product[] = [
    {
      id: 1,
      name: "Pomada Modeladora Premium",
      description:
        "Fixação forte e brilho natural para todos os tipos de cabelo. Fórmula exclusiva com cera de abelha e óleos naturais.",
      price: "R$ 45,90",
      originalPrice: "R$ 59,90",
      image: "/pomada-modeladora-premium-barbearia.jpg",
      link: "https://mercadolivre.com.br/produto1",
      badge: "BESTSELLER",
      rating: 4.9,
      reviews: 127,
      category: "Cabelo",
      inStock: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 2,
      name: "Óleo para Barba Hidratante",
      description:
        "Nutre e amacia a barba, deixando-a sedosa e perfumada. Blend exclusivo de óleos essenciais premium.",
      price: "R$ 32,90",
      originalPrice: "R$ 42,90",
      image: "/-leo-barba-hidratante-premium.jpg",
      link: "https://mercadolivre.com.br/produto2",
      badge: "NOVO",
      rating: 4.8,
      reviews: 89,
      category: "Barba",
      inStock: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ]

  saveProducts(defaultProducts)
  return defaultProducts
}

export const saveProducts = (products: Product[]): void => {
  if (typeof window === "undefined") return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products))
}

export const addProduct = (product: Omit<Product, "id" | "createdAt" | "updatedAt">): Product => {
  const products = getProducts()
  const newProduct: Product = {
    ...product,
    id: Math.max(...products.map((p) => p.id), 0) + 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  const updatedProducts = [...products, newProduct]
  saveProducts(updatedProducts)
  return newProduct
}

export const updateProduct = (id: number, updates: Partial<Product>): Product | null => {
  const products = getProducts()
  const index = products.findIndex((p) => p.id === id)

  if (index === -1) return null

  const updatedProduct = {
    ...products[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  }

  products[index] = updatedProduct
  saveProducts(products)
  return updatedProduct
}

export const deleteProduct = (id: number): boolean => {
  const products = getProducts()
  const filteredProducts = products.filter((p) => p.id !== id)

  if (filteredProducts.length === products.length) return false

  saveProducts(filteredProducts)
  return true
}

export const getProductById = (id: number): Product | null => {
  const products = getProducts()
  return products.find((p) => p.id === id) || null
}

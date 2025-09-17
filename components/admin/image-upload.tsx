// components/image-upload.tsx - Versão Corrigida
"use client"

import type React from "react"
import { useState, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Camera, Upload, X, Download } from "lucide-react"
import Image from "next/image"

interface ImageUploadProps {
  value?: string
  onChange: (value: string) => void
  className?: string
}

export default function ImageUpload({ value, onChange, className }: ImageUploadProps) {
  const [isCapturing, setIsCapturing] = useState(false)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const startCamera = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: "environment",
        },
      })
      setStream(mediaStream)
      setIsCapturing(true)

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
      }
    } catch (error) {
      console.error("Erro ao acessar câmera:", error)
      alert("Não foi possível acessar a câmera. Verifique as permissões.")
    }
  }, [])

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
      setStream(null)
    }
    setIsCapturing(false)
  }, [stream])

  const capturePhoto = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current
      const context = canvas.getContext("2d")

      if (context) {
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        context.drawImage(video, 0, 0)

        const imageDataUrl = canvas.toDataURL("image/jpeg", 0.8)
        onChange(imageDataUrl)
        stopCamera()
      }
    }
  }, [onChange, stopCamera])

  const handleFileUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const result = e.target?.result as string
          onChange(result)
        }
        reader.readAsDataURL(file)
      }
    },
    [onChange],
  )

  const removeImage = useCallback(() => {
    onChange("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }, [onChange])

  const downloadImage = useCallback(() => {
    if (value) {
      const link = document.createElement("a")
      link.href = value
      link.download = `produto-${Date.now()}.jpg`
      link.click()
    }
  }, [value])

  return (
    <div className={className}>
      <div className="space-y-4">
        {/* Preview da imagem */}
        {value && !isCapturing && (
          <Card className="bg-white/5 border-white/20">
            <CardContent className="p-4">
              <div className="relative">
                <Image
                  src={value || "/placeholder.svg"}
                  alt="Preview"
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover rounded-lg"
                />
                <div className="absolute top-2 right-2 flex space-x-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={downloadImage}
                    className="bg-gray-800 hover:bg-gray-700 text-white border-gray-600"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={removeImage}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Câmera ativa */}
        {isCapturing && (
          <Card className="bg-white/5 border-white/20">
            <CardContent className="p-4">
              <div className="relative">
                <video ref={videoRef} autoPlay playsInline className="w-full h-64 object-cover rounded-lg bg-black" />
                <canvas ref={canvasRef} className="hidden" />

                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
                  <Button
                    onClick={capturePhoto}
                    className="bg-blue-600 text-white hover:bg-blue-700 rounded-full w-16 h-16"
                  >
                    <Camera className="h-6 w-6" />
                  </Button>
                  <Button onClick={stopCamera} variant="destructive" className="rounded-full w-12 h-12 bg-red-600 hover:bg-red-700">
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <Badge className="absolute top-2 left-2 bg-red-500 text-white animate-pulse">REC</Badge>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Botões de ação - CORRIGIDOS (problema do botão branco) */}
        {!value && !isCapturing && (
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              onClick={startCamera} 
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white border-blue-700"
            >
              <Camera className="mr-2 h-4 w-4" />
              Capturar com Câmera
            </Button>

            <Button
              onClick={() => fileInputRef.current?.click()}
              variant="outline"
              className="flex-1 border-gray-600 text-white hover:bg-gray-800 bg-gray-900"
            >
              <Upload className="mr-2 h-4 w-4" />
              Upload de Arquivo
            </Button>
          </div>
        )}

        {/* Botão para trocar imagem quando já existe uma */}
        {value && !isCapturing && (
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              onClick={startCamera} 
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white border-blue-700"
            >
              <Camera className="mr-2 h-4 w-4" />
              Nova Foto
            </Button>

            <Button
              onClick={() => fileInputRef.current?.click()}
              variant="outline"
              className="flex-1 border-gray-600 text-white hover:bg-gray-800 bg-gray-900"
            >
              <Upload className="mr-2 h-4 w-4" />
              Trocar Imagem
            </Button>
          </div>
        )}

        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />

        {/* Instruções */}
        <div className="text-sm text-gray-400 space-y-1">
          <p>• Use a câmera para fotografar equipamentos da barbearia</p>
          <p>• Ou faça upload de uma imagem existente</p>
          <p>• Formatos aceitos: JPG, PNG, WebP</p>
          <p>• Tamanho recomendado: 800x600px ou superior</p>
        </div>
      </div>
    </div>
  )
}
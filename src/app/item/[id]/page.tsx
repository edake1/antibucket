'use client'

import { useEffect, useState, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Header } from '@/components/Header'
import {
  ArrowLeft,
  Loader2,
  Heart,
  Share2,
  Copy,
  Check,
  Sparkles,
  Download,
  X
} from 'lucide-react'
import { toast } from 'sonner'
import { categoryEmojis, categoryNames, type AntiBucketItem } from '@/lib/constants'

export default function ItemPage() {
  const params = useParams()
  const router = useRouter()
  const itemId = params.id as string
  const [item, setItem] = useState<AntiBucketItem | null>(null)
  const [loading, setLoading] = useState(true)
  const [meTooing, setMeTooing] = useState(false)
  const [copied, setCopied] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const [generatingImage, setGeneratingImage] = useState(false)
  const shareCardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetchItem()
  }, [itemId])

  const fetchItem = async () => {
    try {
      const res = await fetch(`/api/items/${itemId}`)
      if (!res.ok) throw new Error('Item not found')
      const data = await res.json()
      setItem(data)
    } catch (error) {
      console.error('Failed to fetch item:', error)
      toast.error('Failed to load item')
    } finally {
      setLoading(false)
    }
  }

  const handleMeToo = async () => {
    if (!item || meTooing) return
    setMeTooing(true)
    try {
      const res = await fetch(`/api/items/${item.id}/metoo`, {
        method: 'POST',
      })
      if (!res.ok) throw new Error('Failed')
      const data = await res.json()
      if (data.alreadyDone) {
        toast.info('You already said Me Too! 🙏')
      } else {
        setItem({ ...item, meTooCount: data.meTooCount })
        toast.success('Me too! 💔')
      }
    } catch {
      toast.error('Something went wrong')
    } finally {
      setMeTooing(false)
    }
  }

  const handleCopy = async () => {
    if (!item) return
    const text = `"${item.title}"\n\n${item.eulogy}\n\n— via Anti-Bucket`
    await navigator.clipboard.writeText(text)
    setCopied(true)
    toast.success('Copied to clipboard!')
    setTimeout(() => setCopied(false), 2000)
  }

  const handleNativeShare = async () => {
    if (!item) return
    if (navigator.share) {
      try {
        await navigator.share({
          title: item.title,
          text: item.eulogy,
          url: window.location.href,
        })
      } catch {
        // User cancelled
      }
    } else {
      handleCopy()
    }
  }

  const handleShareAsImage = async () => {
    if (!item) return
    setGeneratingImage(true)

    try {
      // Create canvas for image
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      if (!ctx) throw new Error('Canvas not supported')

      // Set canvas size
      canvas.width = 800
      canvas.height = 600

      // Background gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, '#fff7ed')
      gradient.addColorStop(0.5, '#fff1f2')
      gradient.addColorStop(1, '#fdf2f8')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Add decorative circles
      ctx.fillStyle = 'rgba(244, 63, 94, 0.1)'
      ctx.beginPath()
      ctx.arc(700, 50, 100, 0, Math.PI * 2)
      ctx.fill()
      ctx.beginPath()
      ctx.arc(100, 550, 80, 0, Math.PI * 2)
      ctx.fill()

      // Header bar
      const headerGradient = ctx.createLinearGradient(0, 0, canvas.width, 0)
      headerGradient.addColorStop(0, '#f97316')
      headerGradient.addColorStop(0.5, '#f43f5e')
      headerGradient.addColorStop(1, '#ec4899')
      ctx.fillStyle = headerGradient
      ctx.fillRect(0, 0, canvas.width, 8)

      // Category badge
      ctx.fillStyle = 'rgba(244, 63, 94, 0.1)'
      const catWidth = 120
      const catHeight = 32
      const catX = 40
      const catY = 40
      ctx.beginPath()
      ctx.roundRect(catX, catY, catWidth, catHeight, 16)
      ctx.fill()
      
      ctx.fillStyle = '#be123c'
      ctx.font = '14px system-ui, -apple-system, sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText(`${categoryEmojis[item.category]} ${categoryNames[item.category]}`, catX + catWidth/2, catY + 21)

      // Title
      ctx.fillStyle = '#1c1917'
      ctx.font = 'bold 32px system-ui, -apple-system, sans-serif'
      ctx.textAlign = 'left'
      
      // Word wrap title
      const maxWidth = canvas.width - 80
      const titleLines = wrapText(ctx, item.title, maxWidth)
      let titleY = 110
      titleLines.forEach((line: string) => {
        ctx.fillText(line, 40, titleY)
        titleY += 40
      })

      // Eulogy with quotes
      const quoteY = titleY + 30
      ctx.fillStyle = 'rgba(244, 63, 94, 0.3)'
      ctx.font = '80px Georgia, serif'
      ctx.fillText('"', 30, quoteY + 40)

      ctx.fillStyle = '#44403c'
      ctx.font = 'italic 20px Georgia, serif'
      
      // Word wrap eulogy
      const eulogyLines = wrapText(ctx, item.eulogy, canvas.width - 100, 28)
      let eulogyY = quoteY + 50
      eulogyLines.forEach((line: string) => {
        ctx.fillText(line, 50, eulogyY)
        eulogyY += 32
      })

      // Closing quote
      ctx.fillStyle = 'rgba(244, 63, 94, 0.3)'
      ctx.font = '80px Georgia, serif'
      ctx.fillText('"', canvas.width - 60, eulogyY - 10)

      // Footer
      ctx.fillStyle = '#a8a29e'
      ctx.font = '14px system-ui, -apple-system, sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText('Anti-Bucket', canvas.width / 2, canvas.height - 40)
      ctx.fillText(`${item.meTooCount.toLocaleString()} people are done with this`, canvas.width / 2, canvas.height - 20)

      // Download image
      const link = document.createElement('a')
      link.download = `anti-bucket-${item.id}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()

      toast.success('Image downloaded!')
    } catch {
      toast.error('Failed to generate image')
    } finally {
      setGeneratingImage(false)
    }
  }

  // Helper function to wrap text
  const wrapText = (ctx: CanvasRenderingContext2D, text: string, maxWidth: number, lineHeight = 0) => {
    const words = text.split(' ')
    const lines: string[] = []
    let currentLine = ''

    words.forEach(word => {
      const testLine = currentLine + word + ' '
      const metrics = ctx.measureText(testLine)
      if (metrics.width > maxWidth && currentLine !== '') {
        lines.push(currentLine.trim())
        currentLine = word + ' '
      } else {
        currentLine = testLine
      }
    })
    lines.push(currentLine.trim())
    return lines
  }

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-rose-500" />
        </div>
      </div>
    )
  }

  if (!item) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container py-16 text-center">
          <h2 className="text-xl font-semibold mb-2">Item not found</h2>
          <p className="text-muted-foreground mb-6">
            This Anti-Bucket item may have been removed.
          </p>
          <Button onClick={() => router.push('/')}>Go Home</Button>
        </div>
      </div>
    )
  }

  const emoji = categoryEmojis[item.category] || '🤷'
  const categoryName = categoryNames[item.category] || 'Other'

  return (
    <div className="min-h-screen pb-20">
      <Header />

      <div className="container max-w-2xl py-6 sm:py-8 px-4 sm:px-6">
        <Button
          variant="ghost"
          onClick={() => router.push('/')}
          className="mb-6 text-muted-foreground"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        {/* Main Card */}
        <Card className="border-border/50 overflow-hidden shadow-xl">
          <div className="h-2 bg-gradient-to-r from-orange-500 via-rose-500 to-pink-600" />
          <CardHeader className="space-y-4 pb-4">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="text-4xl sm:text-5xl">{emoji}</div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {categoryName}
                  </Badge>
                  <Badge variant="outline" className="text-xs capitalize">
                    <Sparkles className="h-3 w-3 mr-1" />
                    {item.eulogyStyle}
                  </Badge>
                </div>
                <CardTitle className="text-xl sm:text-2xl md:text-3xl leading-tight">
                  {item.title}
                </CardTitle>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Story */}
            {item.story && (
              <div className="p-4 rounded-xl bg-muted/50 border border-border/50">
                <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">The Story</p>
                <p className="italic text-sm sm:text-base">&quot;{item.story}&quot;</p>
              </div>
            )}

            {/* Eulogy */}
            <div className="relative py-4 sm:py-6">
              <div className="absolute left-0 top-0 text-6xl sm:text-8xl text-rose-500/20 font-serif leading-none">&ldquo;</div>
              <p className="text-lg sm:text-xl md:text-2xl leading-relaxed px-6 sm:px-10 text-center font-serif">
                {item.eulogy}
              </p>
              <div className="absolute right-0 bottom-0 text-6xl sm:text-8xl text-rose-500/20 font-serif leading-none">&rdquo;</div>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-center gap-6 sm:gap-8 py-4 border-t border-b border-border/50">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold gradient-text">
                  {item.meTooCount.toLocaleString()}
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">Also done with this</div>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold">
                  {new Date(item.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">Laid to rest</div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3">
              <Button
                onClick={handleMeToo}
                disabled={meTooing}
                className="w-full h-12 bg-gradient-to-r from-orange-500 via-rose-500 to-pink-600 hover:from-orange-600 hover:via-rose-600 hover:to-pink-700 shadow-lg shadow-rose-500/25"
                size="lg"
              >
                {meTooing ? (
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                ) : (
                  <Heart className="h-5 w-5 mr-2" />
                )}
                Me Too — I&apos;m Done With This
              </Button>
              
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant="outline"
                  onClick={handleNativeShare}
                  className="h-11"
                >
                  <Share2 className="h-4 w-4 mr-1.5" />
                  Share
                </Button>
                <Button
                  variant="outline"
                  onClick={handleShareAsImage}
                  disabled={generatingImage}
                  className="h-11"
                >
                  {generatingImage ? (
                    <Loader2 className="h-4 w-4 mr-1.5 animate-spin" />
                  ) : (
                    <Download className="h-4 w-4 mr-1.5" />
                  )}
                  Image
                </Button>
                <Button
                  variant="outline"
                  onClick={handleCopy}
                  className="h-11"
                >
                  {copied ? (
                    <Check className="h-4 w-4 mr-1.5 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4 mr-1.5" />
                  )}
                  {copied ? 'Copied!' : 'Copy'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

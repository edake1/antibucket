'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Header } from '@/components/Header'
import {
  Plus,
  Sparkles,
  Loader2,
  XCircle,
  RefreshCw,
  Check,
  ArrowLeft,
  Lightbulb
} from 'lucide-react'
import { toast } from 'sonner'
import { categories, eulogyStyles } from '@/lib/constants'

const suggestions = [
  'Kale smoothies',
  'Dating musicians',
  'Waking up at 5 AM',
  'Working at startups',
  'NFTs',
  'Small talk',
  'Hostels in my 30s',
]

export default function AddPage() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [story, setStory] = useState('')
  const [eulogyStyle, setEulogyStyle] = useState('dramatic')
  const [eulogy, setEulogy] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [step, setStep] = useState<'details' | 'eulogy'>('details')

  const handleGenerateEulogy = async () => {
    if (!title.trim()) {
      toast.error('Please enter what you\'re done with')
      return
    }
    if (!category) {
      toast.error('Please pick a category')
      return
    }

    setIsGenerating(true)
    try {
      const res = await fetch('/api/ai/eulogy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          category,
          story: story.trim() || null,
          style: eulogyStyle
        }),
      })

      if (!res.ok) throw new Error('Failed to generate eulogy')

      const data = await res.json()
      setEulogy(data.eulogy)
      setStep('eulogy')
      toast.success('Eulogy generated!')
    } catch {
      toast.error('Failed to generate eulogy. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleRegenerate = async () => {
    await handleGenerateEulogy()
  }

  const handleSubmit = async () => {
    if (!title.trim() || !category || !eulogy) {
      toast.error('Please complete all required fields')
      return
    }

    setIsSubmitting(true)
    try {
      const res = await fetch('/api/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          category,
          story: story.trim() || null,
          eulogy,
          eulogyStyle,
          isAnonymous: true
        }),
      })

      if (!res.ok) throw new Error('Failed to create item')

      const item = await res.json()
      toast.success('Added to your Anti-Bucket!')
      router.push(`/item/${item.id}`)
    } catch {
      toast.error('Failed to save. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setTitle(suggestion)
  }

  return (
    <div className="min-h-screen pb-20">
      <Header />

      <div className="container max-w-2xl py-6 sm:py-12 px-4 sm:px-6">
        <Button
          variant="ghost"
          onClick={() => router.push('/')}
          className="mb-4 sm:mb-6 text-muted-foreground"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="space-y-6 sm:space-y-8">
          {/* Header */}
          <div className="text-center space-y-2 sm:space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500/10 border border-rose-500/20">
              <XCircle className="h-4 w-4 text-rose-500" />
              <span className="text-sm font-medium text-rose-600">
                Add to Anti-Bucket
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold">
              What are you <span className="gradient-text">done with?</span>
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Tell us what you&apos;re never doing again. We&apos;ll give it a proper send-off.
            </p>
          </div>

          {/* Step Indicators */}
          <div className="flex items-center justify-center gap-4">
            <div className={`flex items-center gap-2 transition-colors ${step === 'details' ? 'text-foreground' : 'text-muted-foreground'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${step === 'details' ? 'bg-gradient-to-r from-orange-500 via-rose-500 to-pink-600 text-white' : 'bg-muted'}`}>
                1
              </div>
              <span className="text-sm font-medium hidden sm:inline">Details</span>
            </div>
            <div className="w-12 h-px bg-border" />
            <div className={`flex items-center gap-2 transition-colors ${step === 'eulogy' ? 'text-foreground' : 'text-muted-foreground'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${step === 'eulogy' ? 'bg-gradient-to-r from-orange-500 via-rose-500 to-pink-600 text-white' : 'bg-muted'}`}>
                2
              </div>
              <span className="text-sm font-medium hidden sm:inline">Eulogy</span>
            </div>
          </div>

          {step === 'details' && (
            <Card className="border-border/50">
              <CardContent className="p-4 sm:p-6 space-y-5 sm:space-y-6">
                {/* What */}
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-base">What are you done with?</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Kale smoothies, Dating musicians..."
                    className="h-12 border-border/50"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  {/* Suggestions */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Lightbulb className="h-3 w-3" />
                      Try:
                    </span>
                    {suggestions.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => handleSuggestionClick(s)}
                        className="text-xs px-2 py-1 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <Label className="text-base">Category</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setCategory(cat.id)}
                        className={`flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg border text-sm transition-all ${
                          category === cat.id
                            ? 'border-rose-500 bg-rose-500/10 text-rose-600 ring-2 ring-rose-500/20'
                            : 'border-border/50 hover:border-border bg-background hover:bg-muted/50'
                        }`}
                      >
                        <span>{cat.emoji}</span>
                        <span className="hidden sm:inline truncate">{cat.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Story */}
                <div className="space-y-2">
                  <Label htmlFor="story" className="text-base">
                    Why? <span className="text-muted-foreground font-normal text-sm">(optional)</span>
                  </Label>
                  <Textarea
                    id="story"
                    placeholder="Tell us the story of why you're done with this..."
                    rows={3}
                    className="border-border/50 resize-none"
                    value={story}
                    onChange={(e) => setStory(e.target.value)}
                  />
                </div>

                {/* Eulogy Style */}
                <div className="space-y-2">
                  <Label className="text-base">Eulogy Style</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {eulogyStyles.map((style) => (
                      <button
                        key={style.id}
                        type="button"
                        onClick={() => setEulogyStyle(style.id)}
                        className={`flex items-center gap-2 p-3 rounded-lg border text-left transition-all ${
                          eulogyStyle === style.id
                            ? 'border-rose-500 bg-rose-500/10 ring-2 ring-rose-500/20'
                            : 'border-border/50 hover:border-border bg-background hover:bg-muted/50'
                        }`}
                      >
                        <span className="text-xl">{style.emoji}</span>
                        <div className="min-w-0">
                          <div className={`text-sm font-medium ${eulogyStyle === style.id ? 'text-rose-600' : ''}`}>
                            {style.name}
                          </div>
                          <div className="text-xs text-muted-foreground truncate">
                            {style.description}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Generate Button */}
                <Button
                  onClick={handleGenerateEulogy}
                  disabled={isGenerating || !title.trim() || !category}
                  className="w-full h-12 bg-gradient-to-r from-orange-500 via-rose-500 to-pink-600 hover:from-orange-600 hover:via-rose-600 hover:to-pink-700 shadow-lg shadow-rose-500/25"
                  size="lg"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      Writing Eulogy...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-5 w-5 mr-2" />
                      Generate Eulogy
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          )}

          {step === 'eulogy' && (
            <div className="space-y-6">
              {/* Eulogy Card */}
              <Card className="border-border/50 overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-orange-500 via-rose-500 to-pink-600" />
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <span className="text-2xl sm:text-3xl">{categories.find(c => c.id === category)?.emoji}</span>
                    <div className="min-w-0">
                      <CardTitle className="text-lg sm:text-xl truncate">{title}</CardTitle>
                      <CardDescription className="text-sm">
                        {categories.find(c => c.id === category)?.name}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {story && (
                    <div className="p-3 rounded-lg bg-muted/50">
                      <p className="text-sm text-muted-foreground italic">&quot;{story}&quot;</p>
                    </div>
                  )}
                  <div className="relative py-4">
                    <div className="absolute -left-2 top-0 text-5xl sm:text-6xl text-rose-500/20 font-serif leading-none">&ldquo;</div>
                    <p className="text-base sm:text-lg leading-relaxed px-4 sm:px-6 text-center">
                      {eulogy}
                    </p>
                    <div className="absolute -right-2 bottom-0 text-5xl sm:text-6xl text-rose-500/20 font-serif leading-none">&rdquo;</div>
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="outline"
                  onClick={() => setStep('details')}
                  className="flex-1 h-11"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  onClick={handleRegenerate}
                  disabled={isGenerating}
                  className="flex-1 h-11"
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${isGenerating ? 'animate-spin' : ''}`} />
                  Regenerate
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex-1 h-11 bg-gradient-to-r from-orange-500 via-rose-500 to-pink-600"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Add to Anti-Bucket
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

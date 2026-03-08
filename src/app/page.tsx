'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { AntiBucketCard } from '@/components/AntiBucketCard'
import { Header } from '@/components/Header'
import { XCircle, TrendingUp, Sparkles, Plus, Loader2, Search } from 'lucide-react'
import { toast } from 'sonner'
import { categories, type AntiBucketItem } from '@/lib/constants'
import { motion } from 'framer-motion'

export default function Home() {
  const [items, setItems] = useState<AntiBucketItem[]>([])
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery)
    }, 300)
    return () => clearTimeout(timer)
  }, [searchQuery])

  useEffect(() => {
    fetchItems()
  }, [activeFilter, debouncedSearch])

  const fetchItems = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (activeFilter) params.set('category', activeFilter)
      if (debouncedSearch) params.set('q', debouncedSearch)
      params.set('limit', '20')

      const res = await fetch(`/api/items?${params}`)
      const data = await res.json()
      setItems(data.items || [])
    } catch (error) {
      console.error('Failed to fetch items:', error)
      toast.error('Failed to load items')
    } finally {
      setLoading(false)
    }
  }

  const totalMeToos = items.reduce((acc, item) => acc + item.meTooCount, 0)

  const clearSearch = () => {
    setSearchQuery('')
    setDebouncedSearch('')
  }

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 overflow-hidden">
        <div className="container px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto space-y-4 sm:space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500/10 border border-rose-500/20 animate-in fade-in-0 slide-in-from-top-4 duration-500">
              <Sparkles className="h-4 w-4 text-rose-500" />
              <span className="text-sm font-medium text-rose-600 dark:text-rose-400">
                Celebrate what you&apos;re done with
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight px-4 animate-in fade-in-0 slide-in-from-bottom-4 duration-500 delay-100">
              The Things You&apos;re{' '}
              <span className="gradient-text">Officially Over</span>
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground px-4 animate-in fade-in-0 slide-in-from-bottom-4 duration-500 delay-200">
              Add things you&apos;ve tried and will never do again. Get a funny AI-generated eulogy.
              Discover you&apos;re not alone.
            </p>

            {/* Search Bar */}
            <div className="max-w-md mx-auto px-4 animate-in fade-in-0 slide-in-from-bottom-4 duration-500 delay-300">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 via-rose-500 to-pink-600 rounded-2xl blur-lg opacity-25 group-hover:opacity-40 transition-opacity" />
                <div className="relative flex items-center bg-background rounded-xl border border-border/50 shadow-lg">
                  <Search className="absolute left-4 h-5 w-5 text-muted-foreground" />
                  <input
                    type="search"
                    placeholder="Search Anti-Buckets..."
                    className="flex-1 h-12 pl-12 pr-4 bg-transparent border-0 focus:outline-none focus:ring-0 text-base"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <button
                      onClick={clearSearch}
                      className="pr-4 text-muted-foreground hover:text-foreground"
                    >
                      <XCircle className="h-5 w-5" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="flex justify-center gap-6 sm:gap-8 pt-4 animate-in fade-in-0 slide-in-from-bottom-4 duration-500 delay-400">
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold gradient-text">{items.length}</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Items Buried</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold gradient-text">{totalMeToos.toLocaleString()}</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Me Toos</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold gradient-text">{categories.length}</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Categories</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-4 sm:py-6 border-y bg-muted/30 sticky top-16 z-40 backdrop-blur-sm">
        <div className="container px-4 sm:px-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
            <Button
              variant={!activeFilter ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveFilter('')}
              className="shrink-0 rounded-full"
            >
              All ✨
            </Button>
            {categories.map((cat, index) => (
              <Button
                key={cat.id}
                variant={activeFilter === cat.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveFilter(cat.id)}
                className="shrink-0 rounded-full animate-in fade-in-0 slide-in-from-right-2"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span className="mr-1">{cat.emoji}</span>
                <span className="hidden sm:inline">{cat.name}</span>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Search Results Header */}
      {debouncedSearch && (
        <div className="container px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Searching for: <span className="font-medium text-foreground">&quot;{debouncedSearch}&quot;</span>
            </p>
            <Button variant="ghost" size="sm" onClick={clearSearch}>
              Clear
            </Button>
          </div>
        </div>
      )}

      {/* Items Grid */}
      <section className="py-8 sm:py-12">
        <div className="container px-4 sm:px-6">
          {!debouncedSearch && (
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-rose-500" />
                <h2 className="text-xl sm:text-2xl font-bold">
                  {activeFilter
                    ? categories.find(c => c.id === activeFilter)?.name
                    : 'Trending'}
                </h2>
              </div>
              <Badge variant="secondary" className="text-sm">
                {items.length} items
              </Badge>
            </div>
          )}

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-44 rounded-xl bg-muted animate-pulse" />
              ))}
            </div>
          ) : items.length === 0 ? (
            <Card className="border-border/50">
              <CardContent className="py-12 sm:py-16 text-center">
                <XCircle className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  {debouncedSearch ? 'No results found' : 'Nothing here yet'}
                </h3>
                <p className="text-muted-foreground mb-6 px-4">
                  {debouncedSearch
                    ? 'Try a different search term'
                    : 'Be the first to add something to this category!'}
                </p>
                <Button className="bg-gradient-to-r from-orange-500 via-rose-500 to-pink-600" asChild>
                  <a href="/add">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Item
                  </a>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <AntiBucketCard item={item} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 sm:py-12 border-t">
        <div className="container px-4 sm:px-6">
          <Card className="border-border/50 bg-gradient-to-br from-rose-500/5 via-orange-500/5 to-pink-500/5">
            <CardContent className="py-8 sm:py-12 text-center">
              <h3 className="text-xl sm:text-2xl font-bold mb-3">What are you done with?</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto px-4">
                Add your first Anti-Bucket item and get a personalized eulogy from AI.
              </p>
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-500 via-rose-500 to-pink-600 hover:from-orange-600 hover:via-rose-600 hover:to-pink-700 shadow-lg shadow-rose-500/25"
                asChild
              >
                <a href="/add">
                  <Plus className="h-5 w-5 mr-2" />
                  Add Your First Item
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t bg-muted/30">
        <div className="container px-4 sm:px-6 text-center space-y-2">
          <p className="text-sm font-medium gradient-text">
            Anti-Bucket
          </p>
          <p className="text-xs text-muted-foreground">
            Made with 💔 for things we&apos;re done with
          </p>
        </div>
      </footer>
    </div>
  )
}

'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Plus, XCircle } from 'lucide-react'
import { useState } from 'react'
import { ThemeToggle } from '@/components/ThemeToggle'
import { APP_NAME } from '@/lib/constants'

export function Header() {
  const [searchQuery, setSearchQuery] = useState('')
  const [showSearch, setShowSearch] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/?q=${encodeURIComponent(searchQuery.trim())}`
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between gap-2 sm:gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 sm:gap-3 group shrink-0">
          <div className="relative">
            <div className="absolute inset-0 bg-rose-500/30 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-gradient-to-br from-orange-500 via-rose-500 to-pink-600 shadow-lg shadow-rose-500/25">
              <XCircle className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
            </div>
          </div>
          <span className="text-lg sm:text-xl font-bold gradient-text">
            {APP_NAME}
          </span>
        </Link>

        {/* Desktop Search */}
        <form onSubmit={handleSearch} className="hidden sm:flex flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search things people are done with..."
              className="pl-10 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>

        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <ThemeToggle />

          {/* Mobile Search Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="sm:hidden h-9 w-9"
            onClick={() => setShowSearch(!showSearch)}
          >
            <Search className="h-4 w-4" />
          </Button>

          <Link href="/add">
            <Button className="bg-gradient-to-r from-orange-500 via-rose-500 to-pink-600 hover:from-orange-600 hover:via-rose-600 hover:to-pink-700 shadow-lg shadow-rose-500/25">
              <Plus className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Add Item</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {showSearch && (
        <div className="sm:hidden border-t px-4 py-3 bg-background">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
            </div>
          </form>
        </div>
      )}
    </header>
  )
}

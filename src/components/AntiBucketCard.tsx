'use client'

import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Users, ChevronRight } from 'lucide-react'
import { categoryEmojis, categoryColors, type AntiBucketItem } from '@/lib/constants'

export function AntiBucketCard({ item }: { item: AntiBucketItem }) {
  const emoji = categoryEmojis[item.category] || '🤷'
  const colorClass = categoryColors[item.category] || categoryColors.other

  return (
    <Link href={`/item/${item.id}`}>
      <Card className="h-full card-hover cursor-pointer group border-border/50 overflow-hidden">
        <CardContent className="p-5">
          <div className="flex items-start gap-4">
            <div className={`shrink-0 p-2.5 rounded-xl border ${colorClass}`}>
              <span className="text-2xl">{emoji}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1.5">
                <Badge variant="outline" className={`text-xs ${colorClass}`}>
                  {item.category}
                </Badge>
              </div>
              <h3 className="font-semibold text-lg leading-tight group-hover:text-rose-500 transition-colors line-clamp-2 mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                {item.eulogy}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>{item.meTooCount.toLocaleString()} done with this</span>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-rose-500 transition-colors" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

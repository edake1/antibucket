import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET /api/items - List all items with optional filters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const q = searchParams.get('q')
    const trending = searchParams.get('trending') === 'true'
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = parseInt(searchParams.get('offset') || '0')

    const where = {
      ...(category ? { category } : {}),
      ...(q ? {
        OR: [
          { title: { contains: q } },
          { story: { contains: q } },
          { eulogy: { contains: q } },
        ]
      } : {}),
    }

    const orderBy = trending
      ? { meTooCount: 'desc' as const }
      : { createdAt: 'desc' as const }

    const [items, total] = await Promise.all([
      prisma.antiBucketItem.findMany({
        where,
        orderBy,
        take: limit,
        skip: offset,
      }),
      prisma.antiBucketItem.count({ where })
    ])

    return NextResponse.json({ items, total })
  } catch (error) {
    console.error('Error fetching items:', error)
    return NextResponse.json({ error: 'Failed to fetch items' }, { status: 500 })
  }
}

// POST /api/items - Create new Anti-Bucket item
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, category, story, eulogy, eulogyStyle } = body

    if (!title || !category || !eulogy) {
      return NextResponse.json({ error: 'Title, category, and eulogy are required' }, { status: 400 })
    }

    const item = await prisma.antiBucketItem.create({
      data: {
        title,
        category,
        story: story || null,
        eulogy,
        eulogyStyle: eulogyStyle || 'dramatic',
        isAnonymous: true,
      }
    })

    return NextResponse.json(item, { status: 201 })
  } catch (error) {
    console.error('Error creating item:', error)
    return NextResponse.json({ error: 'Failed to create item' }, { status: 500 })
  }
}

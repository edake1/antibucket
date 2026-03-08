import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// Derive a simple fingerprint from request headers
function getFingerprint(request: NextRequest): string {
  const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
  const ua = request.headers.get('user-agent') || 'unknown'
  // Simple hash combining IP + UA
  let hash = 0
  const str = `${ip}::${ua}`
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash |= 0
  }
  return Math.abs(hash).toString(36)
}

// POST /api/items/[id]/metoo - Register a "Me Too" (deduplicated)
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const fingerprint = getFingerprint(request)

    // Check if item exists
    const item = await prisma.antiBucketItem.findUnique({ where: { id } })
    if (!item) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 })
    }

    // Check if already me-too'd
    const existing = await prisma.meToo.findUnique({
      where: { itemId_fingerprint: { itemId: id, fingerprint } },
    })

    if (existing) {
      return NextResponse.json({
        success: true,
        alreadyDone: true,
        meTooCount: item.meTooCount,
      })
    }

    // Create MeToo record and increment count atomically
    const [, updatedItem] = await prisma.$transaction([
      prisma.meToo.create({ data: { itemId: id, fingerprint } }),
      prisma.antiBucketItem.update({
        where: { id },
        data: { meTooCount: { increment: 1 } },
      }),
    ])

    return NextResponse.json({
      success: true,
      alreadyDone: false,
      meTooCount: updatedItem.meTooCount,
    })
  } catch (error) {
    console.error('Error incrementing me too:', error)
    return NextResponse.json({ error: 'Failed to increment' }, { status: 500 })
  }
}

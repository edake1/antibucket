export const categories = [
  { id: 'food', name: 'Food & Drink', emoji: '🍔' },
  { id: 'relationships', name: 'Relationships', emoji: '💔' },
  { id: 'work', name: 'Work & Career', emoji: '💼' },
  { id: 'habits', name: 'Habits', emoji: '🏃' },
  { id: 'trends', name: 'Trends & Fads', emoji: '🎭' },
  { id: 'entertainment', name: 'Entertainment', emoji: '🎬' },
  { id: 'travel', name: 'Travel', emoji: '✈️' },
  { id: 'products', name: 'Products', emoji: '🛒' },
  { id: 'ideas', name: 'Ideas & Beliefs', emoji: '💭' },
  { id: 'other', name: 'Other', emoji: '🤷' },
] as const

export const categoryEmojis: Record<string, string> = Object.fromEntries(
  categories.map((c) => [c.id, c.emoji])
)

export const categoryNames: Record<string, string> = Object.fromEntries(
  categories.map((c) => [c.id, c.name])
)

export const categoryColors: Record<string, string> = {
  food: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20',
  relationships: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
  work: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
  habits: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
  trends: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
  entertainment: 'bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20',
  travel: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20',
  products: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
  ideas: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20',
  other: 'bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20',
}

export const eulogyStyles = [
  { id: 'dramatic', name: 'Dramatic', description: 'Over-the-top theatrical', emoji: '🎭' },
  { id: 'sarcastic', name: 'Sarcastic', description: 'Dry wit and humor', emoji: '😏' },
  { id: 'heartfelt', name: 'Heartfelt', description: 'Genuinely touching', emoji: '💝' },
  { id: 'rockstar', name: 'Rock Star', description: 'Legendary vibes', emoji: '🎸' },
] as const

export type AntiBucketItem = {
  id: string
  title: string
  category: string
  story: string | null
  eulogy: string
  eulogyStyle: string
  meTooCount: number
  createdAt: string
}

export const APP_NAME = 'Anti-Bucket'
export const APP_DESCRIPTION =
  "The app where you celebrate what you're done with. Add things you've tried and will never do again — and get a funny AI-generated eulogy."
export const APP_TAGLINE = "Celebrate what you're done with"

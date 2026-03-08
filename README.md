# AntiBucket

> **"The app where you celebrate what you're *done* with."**

Bucket lists are about what you *want* to do. AntiBucket is for what you're *done* doing. Add things you've quit, AI writes a eulogy, and the world piles on with "Me Too" solidarity. Closure, humor, and wisdom — all in one place.

---

## Core Features

### Add Anti-Bucket Items
Describe what you're done with, pick a category, tell your story. AI generates a personalized eulogy — funny, dramatic, or heartfelt.

### AI Eulogy Generator
The magic moment. Powered by **OpenAI GPT-4o-mini**.

> *"Here lies Kale Smoothies. You tried your best to be palatable. You really did. But no amount of honey could mask your true nature: liquid lawn clippings with delusions of grandeur. Three honest attempts were made. You will not be missed."*

**Eulogy styles:** Dramatic | Sarcastic | Heartfelt | Rock Star

### "Me Too" Solidarity
See how many others are also done with the same thing. *"847 people are also done with kale smoothies."*

### Browse & Discover
10 categories: Food, Relationships, Work, Habits, Trends, Entertainment, Travel, Products, Ideas, Other. Search, filter, and explore what humanity is collectively over.

### Share
Beautiful eulogy cards. Copy to clipboard. Native share on mobile.

---

## Getting Started

```bash
# Install dependencies
bun install

# Set up database
bunx prisma db push
bunx prisma db seed

# Add your OpenAI API key to .env
# OPENAI_API_KEY="sk-..."

# Start development server
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js, React 19, TypeScript |
| Styling | Tailwind CSS, shadcn/ui |
| Database | Prisma + SQLite |
| AI | OpenAI GPT-4o-mini |
| Design | Mobile-first, warm rose/orange gradients |

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Home — trending items, search, categories
│   ├── add/page.tsx          # Add new item + AI eulogy generation
│   ├── item/[id]/page.tsx    # Item detail + Me Too + share
│   └── api/
│       ├── items/            # CRUD for items
│       └── ai/eulogy/        # AI eulogy generation
├── components/
│   ├── Header.tsx
│   └── AntiBucketCard.tsx
└── lib/
    └── prisma.ts
```

---

## Data Model

```prisma
model AntiBucketItem {
  id          String   @id @default(cuid())
  title       String
  category    String
  story       String?
  eulogy      String
  eulogyStyle String
  meTooCount  Int      @default(0)
  isAnonymous Boolean  @default(true)
  createdAt   DateTime @default(now())
}
```

---

## Roadmap

- [ ] User accounts & profiles
- [ ] Comments and reactions
- [ ] Share-as-image eulogy cards
- [ ] "Related Anti-Buckets" recommendations
- [ ] Year in Review export
- [ ] Gamification (Wisdom Score, badges)

---

## Why This Works

1. **Universal** — Everyone has "never again" stories
2. **Low Friction** — Quick to add, immediately rewarding
3. **Shareable** — Eulogies are made for social media
4. **Viral** — "What are you done with?" starts conversations
5. **Positive** — It's not complaining, it's wisdom

---

*"I've been there. I'm done. Here's my story."*

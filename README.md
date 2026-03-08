# Anti-Bucket

> **"The app where you celebrate what you're *done* with."**

---

## 🎯 The Vision

Bucket lists are about what you *want* to do. But what about what you're *done* doing?

We've all had experiences, habits, relationships, foods, jobs, and trends that we've tried — and decided: **never again**.

**Anti-Bucket** is where you add things you're officially done with. It's closure. It's humor. It's solidarity. It's wisdom.

---

## 💡 Core Features

### 1. Add Anti-Bucket Items
- What are you done with?
- Pick a category (Food, Relationships, Jobs, Habits, Trends, etc.)
- Write your story/why (optional)
- AI generates a "eulogy" — funny, dramatic, or heartfelt

### 2. AI Eulogy Generator
The magic moment. When you add an item, AI writes a eulogy:

> *"Here lies Kale Smoothies. You tried your best to be palatable. You really did. But no amount of honey could mask your true nature: liquid lawn clippings with delusions of grandeur. Three honest attempts were made. You will not be missed."*

Eulogy styles:
- 🎭 **Dramatic** — Over-the-top theatrical flair
- 😏 **Sarcastic** — Dry wit and cutting humor
- 💝 **Heartfelt** — Genuinely touching and warm
- 🎸 **Rock Star** — Legendary musician vibes

### 3. "Me Too" Solidarity
- See how many others have also added the same thing
- "847 people are also done with kale smoothies"
- Creates a sense of community and validation

### 4. Browse by Category
- 🍔 Food & Drink
- 💔 Relationships
- 💼 Work & Career
- 🏃 Habits
- 🎭 Trends & Fads
- 🎬 Entertainment
- ✈️ Travel
- 🛒 Products
- 💭 Ideas & Beliefs
- 🤷 Other

### 5. Share Your Anti-Buckets
- Beautiful eulogy cards
- Copy to clipboard
- Native share on mobile

---

## 🗂️ Data Model

### AntiBucketItem
```typescript
{
  id: string
  title: string          // "Kale smoothies"
  category: string       // "food", "relationships", etc.
  story: string?         // User's "why" (optional)
  eulogy: string         // AI-generated eulogy
  eulogyStyle: string    // "dramatic", "sarcastic", "heartfelt", "rockstar"
  meTooCount: number     // How many others agree
  isAnonymous: boolean   // Always true for MVP
  createdAt: datetime
}
```

---

## 🚀 Getting Started

```bash
# Install dependencies
bun install

# Set up database
bunx prisma db push
bunx prisma db seed

# Start development server
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

---

## 🛠️ Tech Stack

- **Frontend:** Next.js 15, React, TypeScript
- **Styling:** Tailwind CSS with custom warm theme
- **UI Components:** shadcn/ui
- **Database:** Prisma + SQLite
- **AI:** z-ai-web-dev-sdk for eulogy generation

---

## 📱 Mobile-First Design

Every feature designed for mobile first:
- Touch-friendly interactions
- Large tap targets
- Smooth scrolling
- Native share integration
- Responsive layouts

---

## 🎨 Design Philosophy

### Vibe: Satisfying Closure

- **Colors:** Warm rose/orange/pink gradients (not harsh or negative)
- **Typography:** Clean, modern, slightly playful
- **Tone:** Humorous but not mean-spirited
- **Feeling:** Like crossing something off a list — satisfying!

---

## 📂 Project Structure

```
src/
├── app/
│   ├── page.tsx           # Home page with trending items
│   ├── add/page.tsx       # Add new Anti-Bucket item
│   ├── item/[id]/page.tsx # Item detail page
│   └── api/
│       ├── items/         # CRUD for items
│       └── ai/eulogy/     # AI eulogy generation
├── components/
│   ├── Header.tsx         # Site header
│   └── AntiBucketCard.tsx # Item card component
└── lib/
    └── prisma.ts          # Database client
```

---

## 🔮 Future Features

- User accounts & profiles
- Comments and discussions
- "Related Anti-Buckets" suggestions
- Export as beautiful shareable images
- Year in Review — your Anti-Bucket journey
- Collaborative Anti-Buckets (couples, teams)

---

## 💭 Why This Works

1. **Universal Appeal** — Everyone has "never again" stories
2. **Low Friction** — Quick to add, immediately rewarding
3. **Shareable** — Eulogies are made for social
4. **Viral Potential** — "What are you done with?" is a great conversation starter
5. **Positive Spin** — It's not complaining, it's wisdom

---

*"I've been there. I'm done. Here's my story."*

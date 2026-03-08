import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// POST /api/ai/eulogy - Generate AI eulogy
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, category, story, style } = body

    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 })
    }

    const stylePrompts: Record<string, string> = {
      dramatic: 'Write an over-the-top, dramatic eulogy with theatrical flair. Use grand language and epic metaphors.',
      sarcastic: 'Write a dry, sarcastic eulogy with witty one-liners and deadpan humor. Keep it short and cutting.',
      heartfelt: 'Write a genuinely touching, heartfelt eulogy that honors the journey and lesson learned. Sincere and warm.',
      rockstar: 'Write a rock star eulogy as if the thing being bid farewell was a legendary musician. Use music industry metaphors.',
    }

    const stylePrompt = stylePrompts[style] || stylePrompts.dramatic

    const prompt = `Write a eulogy for "${title}" in the ${category} category.

${story ? `The person's story/reason: "${story}"` : ''}

${stylePrompt}

Guidelines:
- Keep it between 2-4 sentences
- Make it memorable and shareable
- Include a touch of humor or wisdom
- End on a satisfying note of closure
- DO NOT use quotes around the title in your response

Write only the eulogy, nothing else.`

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a witty, creative writer who specializes in writing entertaining eulogies for things people are done with. You balance humor with heart.'
        },
        { role: 'user', content: prompt }
      ],
      temperature: 0.9,
      max_tokens: 200,
    })

    const eulogy = completion.choices[0]?.message?.content || ''

    return NextResponse.json({ eulogy })
  } catch (error) {
    console.error('Error generating eulogy:', error)
    return NextResponse.json({ error: 'Failed to generate eulogy' }, { status: 500 })
  }
}

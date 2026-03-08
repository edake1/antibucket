import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const sampleItems = [
  {
    title: 'Kale Smoothies',
    category: 'food',
    story: 'I tried to be healthy. I really did. But no amount of honey could mask the taste of liquid lawn clippings.',
    eulogy: 'Here lies Kale Smoothies. You tried your best to be palatable. You really did. But no amount of honey could mask your true nature: liquid lawn clippings with delusions of grandeur. Three honest attempts were made. You will not be missed.',
    eulogyStyle: 'sarcastic',
    meTooCount: 0,
  },
  {
    title: 'Dating Musicians',
    category: 'relationships',
    story: 'Three times. Three heartbreaks. The songs were beautiful but the communication was non-existent.',
    eulogy: 'Here lies Dating Musicians. You were a dream wrapped in guitar picks and broken promises. The late-night studio sessions, the songs that were totally about you, the discovery that touring means no texting back for months. We have moved on to accountants. They text back.',
    eulogyStyle: 'dramatic',
    meTooCount: 0,
  },
  {
    title: 'Working at Startups',
    category: 'work',
    story: 'Unlimited PTO that you can never take. Ping pong tables instead of health insurance. We are a family means no work-life balance.',
    eulogy: 'Here lies Working at Startups. You promised us equity, free snacks, and a family culture. You delivered burnout, a ping pong table nobody used, and the realization that unlimited PTO means never take a day off. Your hoodies were comfy though.',
    eulogyStyle: 'sarcastic',
    meTooCount: 0,
  },
  {
    title: 'Waking Up at 5 AM',
    category: 'habits',
    story: 'Every productivity guru said it would change my life. It just made me tired and resentful.',
    eulogy: 'Here lies Waking Up at 5 AM. The productivity gurus promised we would join the 5 AM Club and transform our lives. Instead, we joined the Exhausted by 2 PM Club and transformed into zombies. The sunrise is also viewable on Instagram at a reasonable hour.',
    eulogyStyle: 'heartfelt',
    meTooCount: 0,
  },
  {
    title: 'NFTs',
    category: 'trends',
    story: 'Bored Apes. Digital real estate. The future of ownership. I still do not know what I was thinking.',
    eulogy: 'Here lies NFTs. You were the future of ownership, the revolution of art, the blockchain manifest destiny. Now you are a reminder that FOMO is a powerful drug and right click save was always an option. Your JPEGs are forever. Their value, less so.',
    eulogyStyle: 'sarcastic',
    meTooCount: 0,
  },
  {
    title: 'Pretentious Movies',
    category: 'entertainment',
    story: 'I sat through three hours of slow cinema because it had a 98 percent on Rotten Tomatoes. I have never been more bored in my life.',
    eulogy: 'Here lies Pretentious Movies. You had a 98 percent on Rotten Tomatoes. You swept the film festivals. You made critics weep. Meanwhile, we checked our phones four times during your seventeen-minute silent contemplation scene. Art is subjective. Boredom is universal.',
    eulogyStyle: 'sarcastic',
    meTooCount: 0,
  },
  {
    title: 'Hostels in My 30s',
    category: 'travel',
    story: 'I thought I could still do it. I cannot still do it. I need my own bathroom and silence after 10 PM.',
    eulogy: 'Here lies Hostels in Your 30s. You were an adventure at 22. At 32, you are a cry for help. The snoring roommate, the shared bathroom situation, the 3 AM arrival who did not realize the lights were off. We have aged out. It is hotels or nothing now.',
    eulogyStyle: 'heartfelt',
    meTooCount: 0,
  },
  {
    title: 'Expensive Skincare',
    category: 'products',
    story: 'Two hundred dollar serum. One hundred fifty dollar moisturizer. My skin looked exactly the same.',
    eulogy: 'Here lies Expensive Skincare. You came in beautiful packaging with scientific-sounding ingredients and the promise of eternal youth. You left our bank accounts depleted and our skin exactly the same. The real secret was hydration and sleep all along.',
    eulogyStyle: 'dramatic',
    meTooCount: 0,
  },
  {
    title: 'Manifesting',
    category: 'ideas',
    story: 'I wrote down my desires. I visualized. I believed. The universe did not deliver.',
    eulogy: 'Here lies Manifesting. You told us to visualize success, write our desires, and trust the universe. The universe, it turns out, is indifferent to our vision boards. Action, it seems, was the manifesting all along.',
    eulogyStyle: 'sarcastic',
    meTooCount: 0,
  },
  {
    title: 'Small Talk',
    category: 'other',
    story: 'How about this weather? Busy week? I am done pretending to care about surface-level conversation.',
    eulogy: 'Here lies Small Talk. You were the social lubricant of humanity, the bridge between strangers. But life is short and we have things to say. How is the weather has been replaced with What keeps you up at night. We are deep talk people now.',
    eulogyStyle: 'heartfelt',
    meTooCount: 0,
  },
]

async function main() {
  console.log('Seeding Anti-Bucket database...')

  for (const item of sampleItems) {
    await prisma.antiBucketItem.create({
      data: {
        title: item.title,
        category: item.category,
        story: item.story,
        eulogy: item.eulogy,
        eulogyStyle: item.eulogyStyle,
        meTooCount: item.meTooCount,
        isAnonymous: true,
      }
    })
  }

  console.log(`Created ${sampleItems.length} Anti-Bucket items`)
  console.log('\nSeeding complete!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

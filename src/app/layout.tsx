import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Suspense } from 'react'
import { Toaster } from '@/components/ui/sonner'
import { ThemeProvider } from '@/components/ThemeProvider'
import { APP_NAME, APP_DESCRIPTION } from '@/lib/constants'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: {
    default: `${APP_NAME} — Celebrate What You're Done With`,
    template: `%s | ${APP_NAME}`,
  },
  description: APP_DESCRIPTION,
  keywords: ['anti-bucket list', 'eulogy', 'done with', 'closure', 'humor', 'AI'],
  openGraph: {
    title: `${APP_NAME} — Celebrate What You're Done With`,
    description: APP_DESCRIPTION,
    type: 'website',
    siteName: APP_NAME,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${APP_NAME} — Celebrate What You're Done With`,
    description: APP_DESCRIPTION,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider>
          <div className="relative min-h-screen bg-background">
            {/* Background decoration */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-40 -right-40 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl" />
              <div className="absolute top-1/3 -left-40 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-pink-500/5 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10">
              <Suspense fallback={
                <div className="flex items-center justify-center min-h-screen">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-rose-500 border-t-transparent" />
                </div>
              }>
                {children}
              </Suspense>
            </div>
          </div>
          <Toaster position="bottom-right" richColors />
        </ThemeProvider>
      </body>
    </html>
  )
}

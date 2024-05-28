export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'
import GeneralContext from '@/lib/context/GeneralContext'
import { Toaster } from '@/components/ui/sonner'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Base',
  description: 'Base',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <GeneralContext>
          <Toaster />
          <main
            className={`${inter.variable} bg-black flex flex-col w-full min-h-screen mx-auto bg-background `}>
            {children}
          </main>
        </GeneralContext>
      </body>
    </html>
  )
}

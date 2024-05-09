export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'
import GeneralContext from '@/lib/context/GeneralContext'
import { MobileContextProvider } from '@/lib/context/MobileContext'
import { LoadingContextProvider } from '@/lib/context/LoadingContext'
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
          <LoadingContextProvider>
            <MobileContextProvider>
              <Analytics />
              <main
                className={`${inter.variable} flex flex-col w-full min-h-screen mx-auto bg-background `}>
                {children}
              </main>
            </MobileContextProvider>
          </LoadingContextProvider>
        </GeneralContext>
      </body>
    </html>
  )
}

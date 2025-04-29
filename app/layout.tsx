export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import GeneralContext from '@/lib/context/GeneralContext'
import { Toaster } from '@/components/ui/sonner'
import { sdk } from '@farcaster/frame-sdk'

// Use local font file
const archivoBold = localFont({
  src: '../public/Archivo-Bold.ttf',
  variable: '--font-archivo-bold',
  display: 'swap',
})

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={archivoBold.variable}>
      <body className="font-archivo-bold">
        <GeneralContext>
          <Toaster />
          <main className="bg-black flex flex-col w-full min-h-screen mx-auto bg-background">
            {children}
          </main>
        </GeneralContext>
      </body>
    </html>
  )
}

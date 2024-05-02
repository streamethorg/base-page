import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Analytics } from '@vercel/analytics/react'
import HomePageNavbar from '@/components/Layout/HomePageNavbar'
import { Page } from '@/lib/types'
import { TopNavbarContextProvider } from '@/lib/context/TopNavbarContext'
import './globals.css'
import GeneralContext from '@/lib/context/GeneralContext'
import { ModalContextProvider } from '@/lib/context/ModalContext'
import { MobileContextProvider } from '@/lib/context/MobileContext'
import { LoadingContextProvider } from '@/lib/context/LoadingContext'
import { generalMetadata } from '@/lib/utils/metadata'
import { Toaster } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Base',
  description: 'Base',
}

const pages: Page[] = [
  {
    name: 'Home',
    href: 'home',
    bgColor: 'bg-muted',
  },
  {
    name: 'Collections',
    href: 'collections',
    bgColor: 'bg-muted',
  },
  {
    name: 'Browse all videos',
    href: 'videos',
    bgColor: 'bg-muted',
  },
]

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <TooltipProvider>
          <GeneralContext>
            <Toaster />
            <LoadingContextProvider>
              <MobileContextProvider>
                <ModalContextProvider>
                  <TopNavbarContextProvider>
                    <Analytics />
                    <main
                      className={`${inter.variable} flex flex-col w-full min-h-screen mx-auto bg-background `}>
                      <div className="flex flex-col mx-auto w-full min-h-[100vh]">
                        <HomePageNavbar pages={pages} showSearchBar />
                        <div className="flex-grow w-full h-full">
                          {children}
                        </div>
                      </div>
                    </main>
                  </TopNavbarContextProvider>
                </ModalContextProvider>
              </MobileContextProvider>
            </LoadingContextProvider>
          </GeneralContext>
        </TooltipProvider>
      </body>
    </html>
  )
}

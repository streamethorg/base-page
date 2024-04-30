'use client'

import React, { useState, Suspense, useLayoutEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { NavigationMenu } from '@/components/ui/navigation-menu'
import { Menu, X } from 'lucide-react'
import { Page } from '@/lib/types'
import { useSIWE } from 'connectkit'
import useUserData from '@/lib/hooks/useUserData'
import { IExtendedOrganization } from '@/lib/types'
import { cn } from '@/lib/utils/utils'
import NavbarLayout from './NavbarLayout'
import BaseLogo from '@/lib/svg/BaseLogo'

const HomePageNavbar = ({
  logo,
  pages,
  showLogo = true,
  showSearchBar = true,
  organizations,
  currentOrganization,
}: {
  logo?: string
  pages: Page[]
  showLogo?: boolean
  showSearchBar?: boolean
  organizations?: IExtendedOrganization[]
  currentOrganization?: string
}) => {
  return (
    <Suspense fallback={null}>
      <div className="md:hidden">
        <MobileNavBar pages={pages} showSearchBar={showSearchBar} />
      </div>
      <div className="hidden md:block">
        <DesktopNavBar pages={pages} showSearchBar={showSearchBar} />
      </div>
    </Suspense>
  )
}

const MobileNavBar = ({
  pages,
  showSearchBar,
}: {
  pages: Page[]
  showSearchBar: boolean
}) => {
  const [menuVisible, setMenuVisible] = useState(false)
  const [searchVisible, setSearchVisible] = useState(false)
  const toggleSearch = () => setSearchVisible(!searchVisible)
  const toggleMenu = () => setMenuVisible(!menuVisible)
  const { isSignedIn } = useSIWE()
  const { userData } = useUserData()

  useLayoutEffect(() => {
    if (menuVisible || searchVisible) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [menuVisible, searchVisible])

  return (
    <NavigationMenu className="flex sticky top-0 flex-row items-center bg-black lg:hidden backdrop-blur z-[999999]">
      {(searchVisible || menuVisible) && (
        <div className="fixed inset-0 z-50 bg-opacity-50 backdrop-blur-none" />
      )}

      <div
        className={cn(
          'flex relative flex-row items-center p-4 w-full',
          menuVisible && 'items-start bg-[#0052FF] h-screen'
        )}>
        {pages.length > 0 && (
          <button onClick={toggleMenu} className="z-50">
            {!menuVisible ? (
              <Menu
                size={30}
                strokeWidth={2}
                className="text-white text-muted-foreground"
              />
            ) : (
              <X size={30} strokeWidth={1} className="text-white" />
            )}
          </button>
        )}
        <div className="ml-auto">
          {showSearchBar && (
            <Link href={'/'}>
              <Image
                src={'/base_logo.png'}
                alt="Logo"
                height={30}
                width={30}
                className="h-full aspect-square"
              />
            </Link>
          )}
        </div>
        {menuVisible && <NavbarLayout pages={pages} />}
      </div>
    </NavigationMenu>
  )
}

const DesktopNavBar = ({
  pages,
  showLogo = true,
  showSearchBar,
}: {
  pages: Page[]
  showLogo?: boolean
  showSearchBar: boolean
}) => {
  const [showSidebar, setShowSidebar] = useState(false)

  return (
    <NavigationMenu className="relative h-full">
      <button
        onClick={() => setShowSidebar(!showSidebar)}
        className={`absolute top-4 left-4 z-30 ${showSidebar ? 'hidden' : 'block'}`}>
        <Menu strokeWidth={1} size={40} className="text-white" />
      </button>

      {showSidebar && (
        <>
          <aside className="absolute w-[40%] bg-base-blue h-full z-20 left-0 top-0">
            <div className="p-2">
              <NavbarLayout pages={pages} />
              <div className="hidden grid-cols-1 gap-4 px-6 mt-8 md:grid">
                <div className="bg-blue-500 animate-pulse aspect-video" />
                <div className="bg-red-500 animate-pulse aspect-video" />
              </div>
            </div>
          </aside>
          <div className="absolute top-0 left-[calc(40%)] p-2 pb-4 h-full z-30 flex flex-col items-center">
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className="z-30">
              <X size={45} strokeWidth={1} className="text-white" />
            </button>
            <div className="flex-grow" />
            <BaseLogo height={'5%'} />
          </div>
        </>
      )}
    </NavigationMenu>
  )
}

export default HomePageNavbar

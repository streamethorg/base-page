'use client'
import React, { useState, Suspense, useLayoutEffect } from 'react'
import Image from 'next/image'
import SearchBar from '@/components/misc/SearchBar'
import Link from 'next/link'
import { NavigationMenu } from '@/components/ui/navigation-menu'
import { Menu, X } from 'lucide-react'
import { ConnectWalletButton } from '../misc/ConnectWalletButton'
import { Search } from 'lucide-react'
import { Page } from '@/lib/types'
import { useSIWE } from 'connectkit'
import useUserData from '@/lib/hooks/useUserData'
import { IExtendedOrganization } from '@/lib/types'
import { cn } from '@/lib/utils/utils'
import { Button } from '@/components/ui/button'
import NavbarLayout from './NavbarLayout'

const getPages = (
  pages: Page[],
  isSignedIn: boolean,
  studioOrg?: string
) => {
  if (isSignedIn) {
    return [...pages]
  } else return pages
}

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
        {menuVisible && (
          <NavbarLayout
            pages={getPages(
              pages,
              isSignedIn,
              userData?.organizations?.[0]?.slug
            )}
          />
        )}
      </div>
    </NavigationMenu>
  )
}

const DesktopNavBar = ({
  pages,
  showSearchBar,
  showLogo = true,
}: {
  pages: Page[]
  showLogo?: boolean
  showSearchBar: boolean
}) => {
  const { isSignedIn } = useSIWE()
  const { userData } = useUserData()
  const [showSidebar, setShowSidebar] = useState(false)

  return (
    <NavigationMenu className="flex justify-start h-full">
      {showSidebar ? (
        <aside className="w-[40%] h-[100vh] bg-[#0052FF]">
          <div className="flex justify-between items-center p-2">
            <NavbarLayout
              pages={getPages(
                pages,
                isSignedIn,
                userData?.organizations?.[0]?.slug
              )}
            />
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className="z-20">
              <X size={35} strokeWidth={1} className="text-white" />
            </button>
          </div>
        </aside>
      ) : (
        <button
          onClick={() => setShowSidebar(!showSidebar)}
          className="z-20">
          <Menu strokeWidth={1} size={40} />
        </button>
      )}
    </NavigationMenu>
  )
}

export default HomePageNavbar

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
    return [
      ...pages,
      // {
      //   name: 'studio',
      //   href: studioOrg ? `/studio/${studioOrg}` : '/studio',
      //   bgColor: 'bg-primary text-primary-foreground',
      // },
    ]
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
      <MobileNavBar pages={pages} showSearchBar={showSearchBar} />
      <DesktopNavBar pages={pages} showSearchBar={showSearchBar} />
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
  return (
    <NavigationMenu className="hidden sticky top-0 flex-row justify-between items-center p-2 px-4 w-full bg-white shadow-sm md:hidden lg:flex">
      <div className="flex flex-1 justify-start items-center">
        {showLogo && (
          <Link href="/">
            <Image
              src={'/base_logo.png'}
              alt="Logo"
              width={50}
              height={50}
              className="hidden lg:block"
            />
          </Link>
        )}
      </div>
      <div className="flex flex-grow-0 justify-center items-center mx-auto w-2/5">
        {showSearchBar && <SearchBar searchVisible={showSearchBar} />}
      </div>
      <div className="flex flex-1 justify-end items-center">
        <NavbarLayout
          pages={getPages(
            pages,
            isSignedIn,
            userData?.organizations?.[0]?.slug
          )}
        />
        <ConnectWalletButton />
      </div>
    </NavigationMenu>
  )
}

export default HomePageNavbar

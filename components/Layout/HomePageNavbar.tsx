'use client'

import React, { useState, Suspense, useLayoutEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { NavigationMenu } from '@/components/ui/navigation-menu'
import { Menu, X } from 'lucide-react'
import { Page, eTab } from '@/lib/types'
import { useSIWE } from 'connectkit'
import useUserData from '@/lib/hooks/useUserData'
import { IExtendedOrganization } from '@/lib/types'
import { cn } from '@/lib/utils/utils'
import NavbarLayout from './NavbarLayout'
import BaseLogo from '@/lib/svg/BaseLogo'
import AllCollections from '@/app/collections/components/AllCollections'
import { ConnectWalletButton } from '../misc/ConnectWalletButton'
import useSearchParams from '@/lib/hooks/useSearchParams'

const HomePageNavbar = ({
  pages,
  showSearchBar = true,
}: {
  logo?: string
  pages: Page[]
  showLogo?: boolean
  showSearchBar?: boolean
  organizations?: IExtendedOrganization[]
  currentOrganization?: string
}) => {
  const { searchParams } = useSearchParams()
  const tab = searchParams.get('tab')

  return (
    <Suspense fallback={null}>
      <div className="md:hidden">
        <MobileNavBar pages={pages} showSearchBar={showSearchBar} />
      </div>
      <div className="hidden md:block">
        <DesktopNavBar pages={pages} tab={tab} />
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
  const toggleMenu = () => setMenuVisible(!menuVisible)

  // useLayoutEffect(() => {
  //   if (menuVisible || searchVisible) {
  //     document.body.style.overflow = 'hidden'
  //   } else {
  //     document.body.style.overflow = 'auto'
  //   }
  // }, [menuVisible, searchVisible])

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
  tab,
}: {
  pages: Page[]
  tab?: string | null
}) => {
  const { searchParams, handleTermChange } = useSearchParams()

  const showSidebar = searchParams.get('tab') !== eTab.none

  return (
    <NavigationMenu className="relative h-full">
      <button
        onClick={() =>
          handleTermChange([{ key: 'tab', value: eTab.home }])
        }
        className={` absolute top-4 left-4 z-30 ${showSidebar ? 'hidden' : 'block'}`}>
        <Menu strokeWidth={1} size={40} className="text-white" />
      </button>
      <ConnectWalletButton className="absolute right-0 top-4 z-30 mr-4 uppercase bg-transparent rounded-none border border-white end-0" />

      {showSidebar && (
        <>
          <aside className="absolute w-[50%] bg-base-blue overflow-auto h-full z-20 left-0 top-0">
            <div className="p-2">
              <NavbarLayout pages={pages} />
              {/* <div className="hidden grid-cols-1 gap-4 px-6 mt-8 md:grid">
                <div className="bg-blue-500 animate-pulse aspect-video" />
                <div className="bg-red-500 animate-pulse aspect-video" />
              </div> */}
              {tab === eTab.collections && <AllCollections />}
            </div>
          </aside>
          <div className="absolute top-0 left-[calc(50%)] p-2 pb-4 h-full z-30 flex flex-col items-center">
            <button
              onClick={() =>
                handleTermChange([{ key: 'tab', value: eTab.none }])
              }
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

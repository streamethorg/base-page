import React, { Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { NavigationMenu } from '@/components/ui/navigation-menu'
import { Page, eTab } from '@/lib/types'
import { IExtendedOrganization } from '@/lib/types'
import NavbarLayout from './NavbarLayout'
import BaseLogo from '@/lib/svg/BaseLogo'
import AllCollections from '@/app/collections/components/AllCollections'
import AboutVideo from '@/app/(home)/components/about/AboutVideos'
import AboutCollection from '@/app/collections/components/AboutCollection'
import { Menu, X } from 'lucide-react'
import { ConnectWalletButton } from '../misc/ConnectWalletButton'

const HomePageNavbar = async ({
  pages,
  searchParams,
  showSearchBar = true,
}: {
  logo?: string
  pages: Page[]
  showLogo?: boolean
  showSearchBar?: boolean
  organizations?: IExtendedOrganization[]
  searchParams: any
  currentOrganization?: string
}) => {
  const tab = searchParams.tab

  return (
    <>
      <div className="md:hidden">
        <MobileNavBar
          searchParams={searchParams}
          pages={pages}
          showSearchBar={showSearchBar}
        />
      </div>
      <div className="hidden md:block">
        <DesktopNavBar
          searchParams={searchParams}
          pages={pages}
          tab={tab}
        />
      </div>
    </>
  )
}

const MobileNavBar = ({
  pages,
  showSearchBar,
  searchParams,
}: {
  pages: Page[]
  showSearchBar: boolean
  searchParams: any
}) => {
  const v = searchParams.v

  // useLayoutEffect(() => {
  //   if (menuVisible || searchVisible) {
  //     document.body.style.overflow = 'hidden'
  //   } else {
  //     document.body.style.overflow = 'auto'
  //   }
  // }, [menuVisible, searchVisible])

  return (
    <NavigationMenu className="flex sticky top-0 flex-row items-center bg-black lg:hidden backdrop-blur z-[999999]">
      {/* {( menuVisible) && (
        <div className="fixed inset-0 z-50 bg-opacity-50 backdrop-blur-none" />
      )}

      <div
        className={cn(
          'flex relative flex-row items-center p-4 w-full',
          menuVisible && 'items-start bg-[#0052FF] h-screen'
        )}>
<<<<<<< Updated upstream
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
||||||| Stash base
        {pages.length > 0 && <MenuVisibleButton />}
        <div className="ml-auto">
          <Link href={'/'}>
            <Image
              src={'/base_logo.png'}
              alt="Logo"
              height={30}
              width={30}
              className="h-full aspect-square"
            />
          </Link>
        </div>
        {menuVisible && (
          <>
            <NavbarLayout pages={pages} />
            <div className="absolute top-0">
              {tab === eTab.about && (
                <Suspense fallback={<div>Loading...</div>}>
                  <AboutVideo sessionId={sessionId || ''} />
                </Suspense>
              )}
            </div>
          </>
=======
        {pages.length > 0 && <MenuVisibleButton />}
        <div className="ml-auto">
          <Link href={'/'}>
            <Image
              src={'/base_logo.png'}
              alt="Logo"
              height={30}
              width={30}
              className="h-full aspect-square"
            />
          </Link>
        </div>
        {menuVisible && (
          <>
            <NavbarLayout pages={pages} />
            {/* Need to look into this*/}
            <div className="absolute top-0">
              {tab === eTab.collections && <AllCollections />}
              {tab === eTab.about && (
                <Suspense fallback={<div>Loading...</div>}>
                  <AboutVideo sessionId={sessionId || ''} />
                </Suspense>
              )}
            </div>
          </>
>>>>>>> Stashed changes
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
      </div> */}
    </NavigationMenu>
  )
}

const DesktopNavBar = ({
  pages,
  tab,
  searchParams,
}: {
  pages: Page[]
  tab?: string | null
  searchParams: any
}) => {
  const showSidebar = tab !== eTab.none && tab !== null

  return (
    <NavigationMenu className="relative h-full">
      <button
        // onClick={() =>
        //   handleTermChange([{ key: 'tab', value: eTab.home }])
        // }
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
              {tab === eTab.collection && (
                <AboutCollection searchParams={searchParams} />
              )}
              {tab === eTab.collections && <AllCollections />}
              {/* {tab === eTab.about && <AboutVideo />} */}
            </div>
          </aside>
          <div className="absolute top-0 left-[calc(50%)] p-2 pb-4 h-full z-30 flex flex-col items-center">
            <button
              // onClick={() =>
              //   handleTermChange([{ key: 'tab', value: eTab.none }])
              // }
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

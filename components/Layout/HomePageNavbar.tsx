'use server'

import { NavigationMenu } from '@/components/ui/navigation-menu'
import { ChannelPageParams, Page, eTab } from '@/lib/types'
import { IExtendedOrganization } from '@/lib/types'
import NavbarLayout from './NavbarLayout'
import BaseLogo from '@/lib/svg/BaseLogo'
import AllCollections from '@/app/(home)/components/collections/AllCollections'
import AboutVideo from '@/app/(home)/components/about/AboutVideos'
import ConnectButtonNav from './Navbar/ConnectButtonNav'
import CloseNavigation from './Navbar/XButton'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import MenuVisibleButton from './Navbar/MenuVisibleButton'
import { Suspense } from 'react'
import MainContent from '@/app/(home)/components/main/MainContent'
import AllVideos from '@/app/(home)/components/videos/AllVideos'
import AboutCollection from '@/app/(home)/components/collections/AboutCollection'
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
  searchParams: ChannelPageParams['searchParams']
  currentOrganization?: string
}) => {
  const tab = searchParams.tab
  const sessionId = searchParams.session

  return (
    <>
      <div className="md:hidden">
        <MobileNavBar
          pages={pages}
          tab={tab}
          sessionId={sessionId}
          showSearchBar={showSearchBar}
          searchParams={searchParams}
        />
      </div>
      <div className="hidden md:block">
        <DesktopNavBar
          pages={pages}
          sessionId={sessionId}
          tab={tab}
          searchParams={searchParams}
        />
      </div>
    </>
  )
}

const MobileNavBar = async ({
  pages,
  tab,
  sessionId,
  showSearchBar,
  searchParams,
}: {
  pages: Page[]
  tab?: string | null
  sessionId?: string
  showSearchBar: boolean
  searchParams: any
}) => {
  const showSidebar = tab !== eTab.none && !!tab

  return (
    <NavigationMenu className="flex sticky top-0 flex-row items-center bg-black md:hidden backdrop-blur z-[999999]">
      <div
        className={cn(
          'flex relative flex-col items-center p-4 w-full',
          showSidebar &&
            'items-start bg-base-blue overflow-auto h-screen'
        )}>
        <div className="flex w-full">
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
        </div>
        {showSidebar && (
          <div className="flex flex-col flex-grow mt-2 w-full">
            <NavbarLayout pages={pages} />
            {tab === eTab.main && <MainContent />}
            {tab === eTab.collection && (
              <AboutCollection searchParams={searchParams} />
            )}
            {tab === eTab.videos && (
              <AllVideos page={searchParams?.page} />
            )}
            {tab === eTab.about && (
              <AboutVideo sessionId={sessionId || ''} />
            )}
          </div>
        )}
      </div>
    </NavigationMenu>
  )
}

const DesktopNavBar = async ({
  pages,
  tab,
  sessionId,
  searchParams,
}: {
  pages: Page[]
  tab?: string | null
  sessionId?: string
  searchParams: any
}) => {
  const showSidebar = tab !== eTab.none && !!tab

  return (
    <NavigationMenu className="relative h-screen">
      {!showSidebar && <ConnectButtonNav showSidebar={showSidebar} />}

      {showSidebar && (
        <div className="flex w-full h-full">
          <aside className=" w-[50%] bg-base-blue overflow-auto h-full z-20">
            <div className="p-2">
              <NavbarLayout pages={pages} />
              {tab === eTab.videos && (
                <AllVideos page={searchParams?.page} />
              )}
              {tab === eTab.collection && (
                <AboutCollection searchParams={searchParams} />
              )}

              {tab === eTab.collections && <AllCollections />}
              {tab === eTab.main && <MainContent />}
              {tab === eTab.about && (
                <AboutVideo sessionId={sessionId || ''} />
              )}
            </div>
          </aside>
          <div className="flex z-30 flex-col justify-between items-start p-2 pb-4 w-1/2 h-full backdrop-blur-sm">
            <div className="flex justify-between items-center w-full">
              <CloseNavigation />
              <ConnectWalletButton className="z-30 m-2 uppercase bg-transparent rounded-none border border-white" />
            </div>
            <div />
            <BaseLogo height={'5%'} />
          </div>
        </div>
      )}
    </NavigationMenu>
  )
}

export default HomePageNavbar

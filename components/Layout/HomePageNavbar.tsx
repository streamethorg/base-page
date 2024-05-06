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
import AllVideos from '@/app/(home)/components/videos/AllVideos'
import AboutCollection from '@/app/(home)/components/collections/AboutCollection'

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
          showSidebar && 'items-start bg-base-blue h-screen'
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
          <div className="flex flex-grow flex-col w-full">
            <NavbarLayout pages={pages} />
            {tab === eTab.collections && <AllCollections />}
            {tab === eTab.collection && (
              <AboutCollection searchParams={searchParams} />
            )}

            {tab === eTab.videos && (
              <AllVideos page={searchParams?.page} />
            )}
            {tab === eTab.about && (
              <Suspense fallback={<div>Loading...</div>}>
                <AboutVideo sessionId={sessionId || ''} />
              </Suspense>
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
    <NavigationMenu className="relative h-full">
      <ConnectButtonNav showSidebar={showSidebar} />

      {showSidebar && (
        <>
          <aside className="absolute w-[50%] bg-base-blue overflow-auto h-full z-20 left-0 top-0">
            <div className="p-2">
              <NavbarLayout pages={pages} />
              {tab === eTab.videos && (
                <AllVideos page={searchParams?.page} />
              )}
              {tab === eTab.collection && (
                <AboutCollection searchParams={searchParams} />
              )}

              {tab === eTab.collections && <AllCollections />}
              {tab === eTab.about && (
                <Suspense fallback={<div>Loading...</div>}>
                  <AboutVideo sessionId={sessionId || ''} />
                </Suspense>
              )}
            </div>
          </aside>
          <div className="absolute top-0 left-[calc(50%)] p-2 pb-4 h-full z-30 flex flex-col items-center">
            <CloseNavigation />
            <div className="flex-grow" />
            <BaseLogo height={'5%'} />
          </div>
        </>
      )}
    </NavigationMenu>
  )
}

export default HomePageNavbar

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
import MainContent from '@/app/(home)/components/main/MainContent'
import AllVideos from '@/app/(home)/components/videos/AllVideos'
import AboutCollection from '@/app/(home)/components/collections/AboutCollection'
import { ConnectWalletButton } from '../misc/ConnectWalletButton'

const HomePageNavbar = async ({
  pages,
  searchParams,
}: {
  logo?: string
  pages: Page[]
  showLogo?: boolean
  organizations?: IExtendedOrganization[]
  searchParams: ChannelPageParams['searchParams']
  currentOrganization?: string
}) => {
  const tab = searchParams.tab
  const sessionId = searchParams.session

  return (
    <div className="z-[99999999]">
      <div className="md:hidden">
        <MobileNavBar
          pages={pages}
          tab={tab}
          sessionId={sessionId}
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
    </div>
  )
}

const MobileNavBar = async ({
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
    <NavigationMenu className="flex sticky top-0 flex-row items-center md:hidden backdrop-blur-md z-[999999999999]">
      <div
        className={cn(
          'flex relative flex-col items-center p-4 w-full duration-200 ease-in-out transition-all h-screen',
          showSidebar && `items-start bg-base-blue overflow-auto`
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
        <div
          className={`flex flex-col flex-grow mt-2 w-full transition-all duration-200 ease-in-out ${showSidebar ? 'opacity-100' : 'opacity-0'}`}>
          <NavbarLayout pages={pages} />
          {tab === eTab.main && <MainContent />}
          {tab === eTab.collection && (
            <AboutCollection searchParams={searchParams} />
          )}
          {tab === eTab.collections && <AllCollections />}
          {tab === eTab.videos && (
            <AllVideos page={searchParams?.page} />
          )}
          {tab === eTab.about && (
            <AboutVideo sessionId={sessionId || ''} />
          )}
        </div>
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
    <NavigationMenu
      className={cn('relative ', { 'h-screen': showSidebar })}>
      {!showSidebar && <ConnectButtonNav showSidebar={showSidebar} />}

      <div className={`flex w-full h-full`}>
        <aside
          className={`transition-all duration-200 ease-in-out ${showSidebar ? 'opacity-100 w-[50%]' : 'opacity-0 w-[48%]'} bg-base-blue overflow-auto h-full z-20`}>
          <div className="p-2">
            <NavbarLayout pages={pages} />
            {tab === eTab.none && <div className="w-full h-screen" />}
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
        {showSidebar && (
          <>
            <div className="flex z-30 flex-col justify-between items-start p-2 pb-4 w-1/2 h-full transition-all backdrop-blur-sm">
              <CloseNavigation />
              <div />
              <BaseLogo height={'5%'} />
            </div>
            <ConnectWalletButton className="absolute right-0 top-4 z-30 mr-4 uppercase bg-transparent rounded-none border border-white end-0" />
          </>
        )}
      </div>
    </NavigationMenu>
  )
}

export default HomePageNavbar

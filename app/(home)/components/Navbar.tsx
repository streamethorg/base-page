'use server'

import { NavigationMenu } from '@/components/ui/navigation-menu'
import { ChannelPageParams, Page, eTab } from '@/lib/types'
import NavbarNavigation from '@/components/layout/Navbar/NavbarNavigation'
import BaseLogo from '@/lib/svg/BaseLogo'
import AllCollections from '@/components/collections/AllCollections'
import AboutVideo from '@/components/videos/AboutVideos'
import ConnectButtonNav from '@/components/layout/Navbar/ConnectButtonNav'
import CloseNavigation from '@/components/layout/Navbar/XButton'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import MenuVisibleButton from '@/components/layout/Navbar/MenuVisibleButton'
import MainContent from '@/components/home'
import AllVideos from '@/components/videos/AllVideos'
import CollectionItem from '@/components/collections/CollectionItem'
import { ConnectWalletButton } from '@/components/ui/ConnectWalletButton'
import { Suspense } from 'react'

const HomePageNavbar = async ({
  pages,
  searchParams,
}: {
  pages: Page[]
  searchParams: ChannelPageParams['searchParams']
}) => {
  const { tab, session: sessionId, page } = searchParams
  const showSidebar = tab !== eTab.none && !!tab

  return (
    <NavigationMenu
      className={cn('relative z-[9999] ', { 'h-screen': showSidebar })}>
      {!showSidebar && <ConnectButtonNav showSidebar={showSidebar} />}

      {showSidebar && (
        <div className="flex w-full h-full">
          <aside className=" w-[50%] bg-base-blue overflow-auto h-full z-20">
            <div className="p-2">
              <NavbarNavigation pages={pages} />

              {(() => {
                switch (tab) {
                  case eTab.videos:
                    return (
                      <Suspense fallback={<div>Loading...</div>}>
                        <AllVideos page={page} />
                      </Suspense>
                    )
                  case eTab.collection:
                    return (
                      <Suspense fallback={<div>Loading...</div>}>
                        <CollectionItem searchParams={searchParams} />
                      </Suspense>
                    )
                  case eTab.collections:
                    return (
                      <Suspense fallback={<div>Loading...</div>}>
                        <AllCollections />
                      </Suspense>
                    )
                  case eTab.about:
                    return (
                      <Suspense fallback={<div>Loading...</div>}>
                        <AboutVideo sessionId={sessionId || ''} />
                      </Suspense>
                    )
                  default:
                    return <MainContent />
                }
              })()}
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
            <NavbarNavigation pages={pages} />

            {/* {tab === eTab.main && <MainContent />}
            {tab === eTab.collection && (
              <AboutCollection searchParams={searchParams} />
            )}
            {tab === eTab.collections && <AllCollections />}
            {tab === eTab.videos && (
              <AllVideos page={searchParams?.page} />
            )}
            {tab === eTab.about && (
              <AboutVideo sessionId={sessionId || ''} />
            )} */}
          </div>
        )}
      </div>
    </NavigationMenu>
  )
}

export default HomePageNavbar

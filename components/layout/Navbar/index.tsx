'use server'
import { cn } from '@/lib/utils'
import { ChannelPageParams, Page, eTab } from '@/lib/types'
import BaseLogo from '@/lib/svg/BaseLogo'
import { Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { NavigationMenu } from '@/components/ui/navigation-menu'
import ConnectButtonNav from './ConnectButtonNav'
import CloseNavigation from './XButton'
import MenuVisibleButton from './MenuVisibleButton'
import NavbarNavigation from './NavbarNavigation'
import { ConnectWalletButton } from '@/components/ui/ConnectWalletButton'
import MainContent from '@/components/home'
import AllCollections from '@/components/collections/AllCollections'
import CollectionItem from '@/components/collections/CollectionItem'
import AllVideos from '@/components/videos/AllVideos'
import AboutVideo from '@/components/videos/AboutVideos'

const Navbar = async ({
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
      className={cn(
        'relative z-[9999] flex flex-col items-center backdrop-blur-md',
        { 'h-screen': showSidebar }
      )}>
      <div
        className={cn(
          'flex relative flex-col items-center p-0 w-full',
          showSidebar &&
            'items-start bg-base-blue md:bg-transparent h-screen'
        )}>
        {!showSidebar && (
          <div className="hidden md:block">
            <ConnectButtonNav showSidebar={showSidebar} />
          </div>
        )}
        <div className="md:hidden flex w-full p-2">
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
          <div className="flex w-full h-[calc(100%-46px)] md:h-full">
            <aside className="w-full md:w-[50%] bg-base-blue h-full z-20">
              <NavbarNavigation pages={pages} />
              <div className='h-[calc(100%-161px)] md:h-[calc(100%-57px)] w-full p-2 overflow-auto'>
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
            <div className="hidden md:flex z-30 flex-col justify-between items-start p-2 pb-4 w-1/2 h-full backdrop-blur-sm">
              <div className="flex justify-between items-center w-full">
                <CloseNavigation />
                <ConnectWalletButton className="z-30 m-2 uppercase bg-transparent rounded-none border border-white" />
              </div>
              <div />
              <BaseLogo height={'5%'} />
            </div>
          </div>
        )}
      </div>
    </NavigationMenu>
  )
}

export default Navbar

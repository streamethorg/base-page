'use server'
import { ChannelPageParams, Page, eTab } from '@/lib/types'
import { Suspense } from 'react'
import MainContent from '@/components/home'
import AllCollections from '@/components/collections/AllCollections'
import CollectionItem from '@/components/collections/CollectionItem'
import AllVideos from '@/components/videos/AllVideos'
import AboutVideo from '@/components/videos/AboutVideos'
import NavbarbarWrapper from './NavbarWrapper'
const Navbar = async ({
  pages,
  searchParams,
}: {
  pages: Page[]
  searchParams: ChannelPageParams['searchParams']
}) => {
  const { tab, session: sessionId, page } = searchParams

  return (
    <NavbarbarWrapper pages={pages}>
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
    </NavbarbarWrapper>
  )
}

export default Navbar

'use server'

import NotFound from '../not-found'
import { Metadata, ResolvingMetadata } from 'next'
import {
  fetchOrganization,
  fetchOrganizations,
} from '@/lib/services/organizationService'
import { ChannelPageParams } from '@/lib/types'
import ChannelShareIcons from './components/ChannelShareIcons'
import Image from 'next/image'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Suspense } from 'react'
import { Card } from '@/components/ui/card'
import StreamethLogoWhite from '@/lib/svg/StreamethLogoWhite'
import WatchGrid, { WatchGridLoading } from './components/WatchGrid'
import UpcomingStreams, {
  UpcomingStreamsLoading,
} from './components/UpcomingStreams'
import { fetchOrganizationStages } from '@/lib/services/stageService'
import Player from '@/components/Player/Player'
import SessionInfoBox from '@/components/sessions/SessionInfoBox'
import { organizationSlug } from '@/lib/utils'
import { fetchAllSessions } from '@/lib/data'
import VideoPlayer from './components/VideoPlayer'

const Home = async ({ params, searchParams }: ChannelPageParams) => {
  const organization = await fetchOrganization({
    organizationSlug: organizationSlug,
  })

  if (!organization) {
    return NotFound()
  }

  const allStreams = (
    await fetchOrganizationStages({
      organizationId: organization._id,
    })
  ).filter((stream) => stream.published)

  const nextStreamNotToday = allStreams?.filter(
    (stream) =>
      stream?.streamDate && new Date(stream.streamDate) > new Date()
  )

  const activeStream = allStreams?.filter(
    (stream) => stream?.streamSettings?.isActive
  )

  const playerActive = !!activeStream[0] || !!nextStreamNotToday[0]
  const stage = activeStream[0]
    ? activeStream[0]
    : nextStreamNotToday[0]

  const videos = (
    await fetchAllSessions({
      organizationSlug,
      onlyVideos: true,
      // published: true,
      limit: 1,
    })
  ).sessions

  return (
    <div className="mx-auto w-full aspect-video h-screen bg-black">
      <div className="relative w-full">
        {stage ? (
          <>
            <Player stage={stage} />
            <div className="px-4 w-full md:p-0">
              <SessionInfoBox
                name={stage.name}
                description={stage.description ?? ''}
                date={stage.streamDate as string}
                vod={true}
              />
            </div>
          </>
        ) : (
          <VideoPlayer video={videos[0]} />
        )}
      </div>
      {/* <Card className="flex items-center p-4 space-y-6 w-full h-full border-none shadow-none md:p-0 bg-base-blue">
        <Suspense fallback={<WatchGridLoading />}>
          <div className="md:hidden">
            <WatchGrid organizationSlug={organizationSlug} />
          </div>
          <div className="hidden md:block">
            <WatchGrid
              organizationSlug={organizationSlug}
              gridLength={6}
            />
          </div>
        </Suspense>
      </Card> */}
    </div>
  )
}

export async function generateMetadata(
  { params }: ChannelPageParams,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const organizationInfo = await fetchOrganization({
    organizationSlug: params.organization,
  })

  if (!organizationInfo) {
    return {
      title: 'Organization not found',
      description: 'Organization not found',
    }
  }

  const imageUrl = organizationInfo.logo
  try {
    return {
      title: organizationInfo.name,
      description: organizationInfo.description,
      openGraph: {
        images: [imageUrl],
      },
    }
  } catch (e) {
    console.log(e)
    return {
      title: organizationInfo.name,
      description: organizationInfo.description,
    }
  }
}

export default Home

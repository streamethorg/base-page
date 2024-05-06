'use server'

import NotFound from '../not-found'
import { Metadata, ResolvingMetadata } from 'next'
import { fetchOrganization } from '@/lib/services/organizationService'
import { ChannelPageParams, Page } from '@/lib/types'
import { fetchOrganizationStages } from '@/lib/services/stageService'
import Player from '@/components/Player/Player'
import PlayerWithControls from '@/components/ui/Player'
import Image from 'next/image'
import { fetchAllSessions } from '@/lib/data'
import { organizationSlug } from '@/lib/utils'
import Footer from './components/Footer'
import HomePageNavbar from '@/components/Layout/HomePageNavbar'
import { IExtendedSession } from '@/lib/types'
import { fetchSession } from '@/lib/services/sessionService'

const pages: Page[] = [
  {
    name: 'MAIN',
    href: 'main',
    bgColor: 'bg-muted',
  },
  {
    name: 'COLLECTIONS',
    href: 'collections',
    bgColor: 'bg-muted',
  },
  {
    name: 'ALL VIDEOS',
    href: 'videos',
    bgColor: 'bg-muted',
  },
]

const loadSessions = async ({
  session,
  organizationSlug,
}: {
  session?: string
  organizationSlug?: string
}) => {
  let sessions: IExtendedSession[] = []

  if (session) {
    const newSession = await fetchSession({ session })

    if (newSession) {
      sessions.push(newSession)
      return sessions
    }
  }

  const fetchedSessions = await fetchAllSessions({
    organizationSlug: organizationSlug || '',
    onlyVideos: true,
    limit: 1,
  })

  return fetchedSessions.sessions
}

const Home = async ({ params, searchParams }: ChannelPageParams) => {
  const organization = await fetchOrganization({
    organizationSlug: organizationSlug,
  })

  if (!organization) {
    return NotFound()
  }

  const getVideoUrl = () => {
    let playbackId = ''

    if (!sessions) {
      return ''
    }

    playbackId = sessions[0]?.playbackId ?? ''

    return playbackId
      ? `https://vod-cdn.lp-playback.studio/raw/jxf4iblf6wlsyor6526t4tcmtmqa/catalyst-vod-com/hls/${playbackId}/index.m3u8`
      : 'No playback ID available'
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

  const sessions = await loadSessions({
    session: searchParams.session,
    organizationSlug: organizationSlug,
  })

  return (
    <div className="flex flex-col mx-auto w-full min-h-[100vh]">
      <HomePageNavbar
        searchParams={searchParams}
        pages={pages}
        showSearchBar
      />

      <div className="flex-grow w-full h-full">
        <div className="flex flex-col justify-center items-center mx-auto w-screen h-screen bg-base-blue">
          {/* w-max should be change */}
          <div className="relative w-full w-max-[1300px]">
            <div className="flex flex-col px-4 w-full h-full md:p-4">
              <div className="z-10">
                {playerActive ? (
                  <Player stage={stage} />
                ) : (
                  <PlayerWithControls
                    src={[
                      {
                        src: getVideoUrl() as `${string}m3u8`,
                        width: 1920,
                        height: 1080,
                        mime: 'application/vnd.apple.mpegurl',
                        type: 'hls',
                      },
                    ]}
                  />
                )}
              </div>
            </div>
          </div>

          <Footer session={sessions[0]} />

          <div className="overflow-hidden fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-2xl w-[110vw] h-[110vh]">
            <Image
              src={sessions[0].coverImage || ''}
              quality={10}
              priority
              alt="Video thumbnail"
              layout="fill"
              objectFit="objectFit"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export async function generateMetadata(
  { params }: ChannelPageParams,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const organizationInfo = await fetchOrganization({
    organizationSlug: organizationSlug,
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

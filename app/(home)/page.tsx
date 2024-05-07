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
import { organizationSlug, pages } from '@/lib/utils'
import Footer from './components/Footer'
import HomePageNavbar from '@/components/Layout/HomePageNavbar'
import { IExtendedSession } from '@/lib/types'
import { fetchSession } from '@/lib/services/sessionService'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Play } from 'lucide-react'

const getVideoUrl = (session: IExtendedSession) => {
  let playbackId = ''

  if (!session) {
    return ''
  }

  playbackId = session.playbackId ?? ''

  return playbackId
    ? `https://vod-cdn.lp-playback.studio/raw/jxf4iblf6wlsyor6526t4tcmtmqa/catalyst-vod-com/hls/${playbackId}/index.m3u8`
    : 'No playback ID available'
}

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

  const playerActive =
    !!activeStream[0] ||
    (!!nextStreamNotToday[0] && !searchParams.session)
  const stage = activeStream[0]
    ? activeStream[0]
    : nextStreamNotToday[0]

  const sessions = await loadSessions({
    session: searchParams.session,
    organizationSlug: organizationSlug,
  })

  return (
    <div className="flex flex-col mx-auto w-full">
      <HomePageNavbar searchParams={searchParams} pages={pages} />

      <div className="flex absolute top-0 flex-col justify-center items-center mx-auto w-screen h-screen bg-black">
        <Dialog>
          <DialogTrigger className="absolute h-full w-full z-50">
            <div className="flex items-center justify-center w-fit mx-auto h-full  cursor-pointer">
              <Play
                fill="#fff"
                className="bg-base-blue text-white w-14 h-14 p-2 rounded-full"
              />
            </div>
          </DialogTrigger>

          <DialogContent className="!p-0 aspect-video !rounded-xl w-full max-w-[1300px]">
            {playerActive ? (
              <Player stage={stage} />
            ) : (
              <PlayerWithControls
                src={[
                  {
                    src: getVideoUrl(sessions[0]) as `${string}m3u8`,
                    width: 1920,
                    height: 1080,
                    mime: 'application/vnd.apple.mpegurl',
                    type: 'hls',
                  },
                ]}
              />
            )}
          </DialogContent>
        </Dialog>

        {/* <Footer
          videoId={playerActive ? stage._id! : sessions[0]._id!}
          videoName={playerActive ? stage.name : sessions[0].name}
        /> */}

        <div className="overflow-hidden absolute top-0 blur-sm w-full h-full">
          <Image
            src={
              playerActive
                ? stage.thumbnail!
                : sessions[0].coverImage!
            }
            priority
            alt="Video thumbnail"
            layout="fill"
            style={{ objectFit: 'cover' }}
          />
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

'use server'

import { Metadata, ResolvingMetadata } from 'next'
import { fetchOrganization } from '@/lib/services/organizationService'
import { ChannelPageParams } from '@/lib/types'
import { organizationSlug, organizationId } from '@/lib/utils'
import { pages } from '@/lib/utils'
import Navbar from '@/components/layout/Navbar'
import PlayerArea from './components/PlayerArea'
import { notFound } from 'next/navigation'
import { fetchVideoDetails, getStreamAndPlaybackInfo } from '@/lib/utils/utils'

const Home = async ({ searchParams }: ChannelPageParams) => {
  if (!organizationSlug || !organizationId) return notFound()
    //await sdk.actions.ready();

  return (
    <div className="flex flex-col mx-auto w-full">
      <Navbar searchParams={searchParams} pages={pages} />
      <PlayerArea />
    </div>
  )
}

export async function generateMetadata(
  { params }: ChannelPageParams,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // Get stream and playback information
  const { stream, session, timeLeft } =
    await getStreamAndPlaybackInfo(organizationId)

  const videoDetails = await fetchVideoDetails(
    stream?._id ? 'livestream' : 'recording',
    stream?._id,
    session?._id
  )

  const thumbnail = stream?.thumbnail 
  const title = stream?.name 
  
  try {
    return {
      title: "UFO Farcaster mini app",
      description: "organizationInfo.description",
      openGraph: {
        images: ['/og?thumbnail=' + thumbnail + '&title=' + title + '&timeLeft=' + timeLeft],
      },
    }
  } catch (e) {
    console.log(e)
    return {
      title: "organizationInfo.name",
      description: "organizationInfo.description",
    }
  }
}

export default Home

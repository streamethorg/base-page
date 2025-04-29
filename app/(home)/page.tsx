'use server'

import { Metadata, ResolvingMetadata } from 'next'
import { ChannelPageParams } from '@/lib/types'
import { organizationSlug, organizationId } from '@/lib/utils'
import { pages } from '@/lib/utils'
import Navbar from '@/components/layout/Navbar'
import PlayerArea from './components/PlayerArea'
import { notFound } from 'next/navigation'
import {
  getStreamAndPlaybackInfo,
} from '@/lib/utils/utils'
import {
  StreamMetadata,
  SessionMetadata,
  generalMetadata,
} from '@/lib/utils/metadata'
const Home = async ({ searchParams }: ChannelPageParams) => {
  if (!organizationSlug || !organizationId) return notFound()

  return (
    <div className="flex flex-col mx-auto w-full">
      <Navbar searchParams={searchParams} pages={pages} />
      <PlayerArea />
    </div>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const { stream, session, timeLeft } =
    await getStreamAndPlaybackInfo(organizationId)
  if (stream) return StreamMetadata({ stage: stream, timeLeft })
  if (session) return SessionMetadata({ session: session })
  return generalMetadata
}

export default Home

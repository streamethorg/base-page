import Navbar from '@/components/layout/Navbar'
import PlayerWithControls from '@/components/ui/Player'
import { fetchSession } from '@/lib/services/sessionService'
import { cn, pages } from '@/lib/utils'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { WatchPageParams } from '@/lib/types'
import { Metadata } from 'next'
import {
  SessionMetadata,
  farcasterSessionMetadata,
  generalMetadata,
} from '@/lib/utils/metadata'
import { fetchVideoDetails } from '@/lib/utils/utils'
import { Play } from 'lucide-react'
import { DialogTrigger } from '@/components/ui/dialog'
import { DialogContent } from '@/components/ui/dialog'
import { Dialog } from '@/components/ui/dialog'
import Head from 'next/head'

const Watch = async ({ params, searchParams }: WatchPageParams) => {
  if (!params.session) return notFound()

  const video = await fetchSession({
    session: params.session,
  })

  const videoDetails = await fetchVideoDetails(
    'recording',
    undefined,
    video?._id
  )

  if (!video || !videoDetails) return notFound()

  return (
    <div className="flex flex-col mx-auto w-full h-screen">
      <Navbar searchParams={searchParams} pages={pages} currentSessionId={video._id} />
      <div className="flex absolute top-0 flex-col justify-center items-center mx-auto w-screen h-screen bg-black">
        <Dialog>
          <DialogTrigger className="absolute z-50 w-full h-full">
            <div className="flex justify-center items-center mx-auto h-full cursor-pointer w-fit">
              <Play
                fill="#fff"
                className="p-2 w-14 h-14 text-white rounded-full bg-base-blue"
              />
            </div>
          </DialogTrigger>
          <DialogContent className="!p-0 aspect-video !rounded-xl w-full max-w-[1300px]">
            <PlayerWithControls
              src={[
                {
                  src: videoDetails.videoSrc as `${string}m3u8`,
                  width: 1920,
                  height: 1080,
                  mime: 'application/vnd.apple.mpegurl',
                  type: 'hls',
                },
              ]}
            />
          </DialogContent>
        </Dialog>
      </div>
      <div
        className={cn(
          'overflow-hidden absolute top-0 w-full h-full'
        )}>
        <Image
          src={video.coverImage || ''}
          priority
          alt="Video thumbnail"
          layout="fill"
          style={{ objectFit: 'cover' }}
        />
      </div>
    </div>
  )
}

export async function generateMetadata({
  params,
}: WatchPageParams): Promise<Metadata> {
  if (!params.session) return generalMetadata
  const session = await fetchSession({ session: params.session })

  if (!session) return generalMetadata

  return SessionMetadata({ session: session })
}

export default Watch

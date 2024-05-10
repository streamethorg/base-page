import HomePageNavbar from '@/app/(home)/components/Navbar'
import PlayerWithControls from '@/components/ui/Player'
import { getVideoUrlAction } from '@/lib/actions/livepeer'
import { fetchSession } from '@/lib/services/sessionService'
import { organizationSlug, pages } from '@/lib/utils'
import { notFound } from 'next/navigation'
import React, { Suspense } from 'react'
import Image from 'next/image'
import { Play } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog'
import { WatchPageParams } from '@/lib/types'
import { fetchAllSessions } from '@/lib/data'
import { Metadata, ResolvingMetadata } from 'next'
import { generalMetadata, watchMetadata } from '@/lib/utils/metadata'

const Loading = () => {
  return (
    <div className="flex flex-col gap-4 mx-auto w-full h-screen bg-gray-500">
      <div className="flex flex-col w-full h-full animate-pulse md:p-4">
        <div className="w-full bg-secondary-foreground aspect-video"></div>
        <div className="px-4 mt-4 space-y-2 w-full md:px-0">
          <div className="w-3/4 h-6 rounded bg-secondary-foreground"></div>
          <div className="w-full h-4 rounded bg-secondary-foreground"></div>
          <div className="w-1/4 h-4 rounded bg-secondary-foreground"></div>
        </div>
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  const sessions = (
    await fetchAllSessions({
      organizationSlug: organizationSlug,
    })
  ).sessions
  const paths = sessions.map((session) => ({
    session: session._id.toString(),
  }))

  return paths
}

const Watch = async ({ params, searchParams }: WatchPageParams) => {
  if (!params.session) return notFound()

  const video = await fetchSession({
    session: params.session,
  })

  const videoUrl = await getVideoUrlAction(
    video?.assetId,
    video?.playbackId
  )
  if (!video || !videoUrl) return notFound()

  return (
    <Suspense key={video._id} fallback={<Loading />}>
      <div className="flex flex-col mx-auto w-full">
        <HomePageNavbar searchParams={searchParams} pages={pages} />

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
                    src: videoUrl as `${string}m3u8`,
                    width: 1920,
                    height: 1080,
                    mime: 'application/vnd.apple.mpegurl',
                    type: 'hls',
                  },
                ]}
              />
            </DialogContent>
          </Dialog>

          <div className="overflow-hidden absolute top-0 w-full h-full blur-sm">
            <Image
              src={video?.coverImage!}
              priority
              alt="Video thumbnail"
              layout="fill"
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      </div>
    </Suspense>
  )
}

export async function generateMetadata({
  params,
}: WatchPageParams): Promise<Metadata> {
  if (!params.session) return generalMetadata
  const session = await fetchSession({ session: params.session })

  if (!session) return generalMetadata

  return watchMetadata({ session: session })
}

export default Watch

import Navbar from '@/components/layout/Navbar'
import PlayerWithControls from '@/components/ui/Player'
import { fetchSession } from '@/lib/services/sessionService'
import { pages } from '@/lib/utils'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { WatchPageParams } from '@/lib/types'
import { Metadata } from 'next'
import { generalMetadata, watchMetadata } from '@/lib/utils/metadata'
import { fetchVideoDetails } from '@/lib/utils/utils'

const Watch = async ({ params, searchParams }: WatchPageParams) => {
  if (!params.session) return notFound()

  const video = await fetchSession({
    session: params.session,
  })

  const videoDetails = await fetchVideoDetails(
    "recording",
    undefined,
    video?._id
  )

  if (!video || !videoDetails) return notFound()

  return (
    <div className="flex flex-col mx-auto w-full h-screen">
      <Navbar searchParams={searchParams} pages={pages} />

      <div className="flex  top-0 flex-col justify-center items-center mx-auto w-screen h-full bg-black">
        <div className="z-50 aspect-video my-auto w-full">
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
        </div>
        <div className="overflow-hidden absolute top-0 w-full h-full blur-sm bg-opacity-10">
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

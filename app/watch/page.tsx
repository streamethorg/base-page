import HomePageNavbar from '@/components/Layout/HomePageNavbar'
import SessionInfoBox from '@/components/sessions/SessionInfoBox'
import PlayerWithControls from '@/components/ui/Player'
import { getVideoUrlAction } from '@/lib/actions/livepeer'
import { fetchSession } from '@/lib/services/sessionService'
import { organizationSlug, pages } from '@/lib/utils'
import { notFound } from 'next/navigation'
import React, { Suspense } from 'react'
import Footer from '../(home)/components/Footer'
import Image from 'next/image'
import { Play } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ChannelPageParams } from '@/lib/types'

const Loading = () => {
  return (
    <div className="flex flex-col gap-4 mx-auto w-full max-w-7xl h-full animate-pulse">
      <div className="flex flex-col w-full h-full md:p-4">
        <div className="w-full bg-gray-300 aspect-video"></div>
        <div className="px-4 mt-4 space-y-2 w-full md:px-0">
          <div className="w-3/4 h-6 bg-gray-200 rounded"></div>
          <div className="w-full h-4 bg-gray-200 rounded"></div>
          <div className="w-1/4 h-4 bg-gray-200 rounded"></div>
        </div>
      </div>
      <div className="px-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="w-full h-32 bg-gray-300 rounded md:h-60"></div>
          <div className="w-full h-32 bg-gray-300 rounded md:h-60"></div>
          <div className="w-full h-32 bg-gray-300 rounded md:h-60"></div>
          <div className="w-full h-32 bg-gray-300 rounded md:h-60"></div>
        </div>
      </div>
    </div>
  )
}

const Watch = async ({ searchParams }: ChannelPageParams) => {
  if (!searchParams.session) return notFound()
  const video = await fetchSession({
    session: searchParams.session,
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
            <DialogTrigger className="absolute h-full w-full z-50">
              <div className="flex items-center justify-center w-fit mx-auto h-full  cursor-pointer">
                <Play
                  fill="#fff"
                  className="bg-base-blue text-white w-14 h-14 p-2 rounded-full"
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

          {/* <Footer videoId={video._id!} videoName={video.name} /> */}

          <div className="overflow-hidden absolute top-0  w-full h-full">
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

export default Watch

'use server'

import { LivestreamPageParams } from '@/lib/types'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog'
import { fetchStage, fetchStages } from '@/lib/services/stageService'
import { notFound } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import { organizationSlug, pages } from '@/lib/utils'
import { Play } from 'lucide-react'
import Image from 'next/image'
import Counter from '@/components/ui/Counter'
import { fetchVideoDetails } from '@/lib/utils/utils'
import { Metadata } from 'next'
import {
  generalMetadata,
  stageMetadata,
  watchMetadata,
} from '@/lib/utils/metadata'
import { getPlaybackInfo } from '@/lib/actions/livepeer'
import { PlayerWithControls } from '@/components/ui/Player'

const Livestream = async ({
  params,
  searchParams,
}: LivestreamPageParams) => {
  if (!params.stage) return notFound()

  const stage = await fetchStage({
    stage: params.stage,
  })

  const timeLeft =
    new Date(stage?.streamDate as string).getTime() - Date.now()
  const video = await fetchVideoDetails(
    'livestream',
    stage?._id,
    undefined
  )
  
  if (!video) return notFound()

  return (
    <div className="flex flex-col mx-auto w-full">
      <Navbar searchParams={searchParams} pages={pages} />

      <div className="flex absolute top-0 flex-col justify-center items-center mx-auto w-screen h-screen bg-black">
        {timeLeft > 0 ? (
          <Counter timeToStart={timeLeft} />
        ) : (
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
                    src: video.videoSrc as `${string}m3u8`,
                    width: 1920,
                    height: 1080,
                    mime: 'application/vnd.apple.mpegurl',
                    type: 'hls',
                  },
                ]}
              />
            </DialogContent>
          </Dialog>
        )}

        {/* <Footer videoId={video._id!} videoName={video.name} /> */}

        <div className="overflow-hidden absolute top-0 w-full h-full blur-sm">
          <Image
            src={stage?.thumbnail!}
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
}: LivestreamPageParams): Promise<Metadata> {
  if (!params.stage) return generalMetadata

  const stage = await fetchStage({ stage: params.stage })

  if (!stage) return generalMetadata
  return stageMetadata({ stage: stage })
}

export default Livestream

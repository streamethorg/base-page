import { fetchOrganization } from '@/lib/services/organizationService'
import { ChannelPageParams, OrganizationPageProps } from '@/lib/types'
import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog'
import { fetchStage } from '@/lib/services/stageService'
import { notFound } from 'next/navigation'
import HomePageNavbar from '@/components/Layout/HomePageNavbar'
import { pages } from '@/lib/utils'
import { Play } from 'lucide-react'
import Image from 'next/image'
import Player from '@/components/Player/Player'
import Counter from '@/components/misc/Counter'

const Livestream = async ({
  params,
  searchParams,
}: ChannelPageParams) => {
  if (!searchParams.stage) return notFound()

  const stage = await fetchStage({
    stage: searchParams.stage,
  })

  if (!stage?._id || !stage.streamSettings?.streamId)
    return notFound()

  const timeLeft =
    new Date(stage?.streamDate as string).getTime() - Date.now()

  return (
    <div className="flex flex-col mx-auto w-full">
      <HomePageNavbar searchParams={searchParams} pages={pages} />

      <div className="flex absolute top-0 flex-col justify-center items-center mx-auto w-screen h-screen bg-black">
        {timeLeft > 0 ? (
          <Counter timeToStart={timeLeft} />
        ) : (
          <Dialog>
            {' '}
            <DialogTrigger className="absolute z-50 w-full h-full">
              <div className="flex justify-center items-center mx-auto h-full cursor-pointer w-fit">
                <Play
                  fill="#fff"
                  className="p-2 w-14 h-14 text-white rounded-full bg-base-blue"
                />
              </div>
            </DialogTrigger>
            <DialogContent className="!p-0 aspect-video !rounded-xl w-full max-w-[1300px]">
              <Player stage={stage} />
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

export default Livestream

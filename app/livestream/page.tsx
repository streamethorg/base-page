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

          <DialogContent className="!p-0 aspect-video !rounded-xl w-full max-w-[1500px]">
            <Player stage={stage} />
          </DialogContent>
        </Dialog>

        {/* <Footer videoId={video._id!} videoName={video.name} /> */}

        <div className="overflow-hidden absolute top-0  w-full h-full">
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

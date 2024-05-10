'use server'

import { LivestreamPageParams } from '@/lib/types'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog'
import { fetchStage, fetchStages } from '@/lib/services/stageService'
import { notFound } from 'next/navigation'
import HomePageNavbar from '@/app/(home)/components/Navbar'
import { organizationSlug, pages } from '@/lib/utils'
import { Play } from 'lucide-react'
import Image from 'next/image'
import Player from '@/components/ui/Player'
import Counter from '@/components/ui/Counter'
import { fetchOrganization } from '@/lib/services/organizationService'
import { Metadata } from 'next'
import {
  generalMetadata,
  stageMetadata,
  watchMetadata,
} from '@/lib/utils/metadata'

export async function generateStaticParams() {
  const organization = await fetchOrganization({
    organizationSlug: organizationSlug,
  })

  if (!organization) {
    return []
  }

  const stages = await fetchStages({
    organizationId: organization._id.toString(),
  })
  const paths = stages.map((stage) => ({
    stage: stage._id!.toString(),
  }))

  return paths
}

const Livestream = async ({
  params,
  searchParams,
}: LivestreamPageParams) => {
  if (!params.stage) return notFound()

  const stage = await fetchStage({
    stage: params.stage,
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

export async function generateMetadata({
  params,
}: LivestreamPageParams): Promise<Metadata> {
  if (!params.stage) return generalMetadata

  const stage = await fetchStage({ stage: params.stage })

  if (!stage) return generalMetadata
  return stageMetadata({ stage: stage })
}

export default Livestream

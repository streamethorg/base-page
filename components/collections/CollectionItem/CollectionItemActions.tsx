import CollectVideButton from './CollectVideButton'
import { Button } from '@/components/ui/button'
import { fetchSession } from '@/lib/services/sessionService'
import { fetchStage } from '@/lib/services/stageService'
import {
  IExtendedNftCollections,
  IExtendedSession,
} from '@/lib/types'
import Link from 'next/link'
import React from 'react'

import Thumbnail from '@/components/video-ui/thumbnail'

const CollectionItem = async ({
  video,
  nftCollection,
}: {
  nftCollection: IExtendedNftCollections
  video: { type?: string; sessionId?: string; stageId?: string }
}) => {
  let session
  let stage
  if (video.type === 'video') {
    session = await fetchSession({
      session: video.sessionId as string,
    })
  } else {
    stage = await fetchStage({
      stage: video.stageId as string,
    })
  }
  const collection = session || stage
  const collectionImage = session?.coverImage || stage?.thumbnail

  if (!collection) return null

  const watchLink =
    video.type === 'video'
      ? `/ watch / ${session?._id?.toString()}`
      : `/ livestream / ${stage?._id?.toString()} `

  const link = `/ ${
    video.type === 'video' ? '?tab=about&session' : 'livestream?stage'
  }=${session?._id?.toString()} `
  return (
    <div className="flex relative flex-col w-full">
      <Link href={link} className="flex z-10 flex-col w-full">
        <Thumbnail imageUrl={collectionImage!} />
        <h2 className="absolute p-3 w-full h-full text-lg font-bold uppercase bg-black bg-opacity-50 line-clamp-2">
          {collection?.name}
        </h2>
      </Link>
      <Link
        href={watchLink}
        className="absolute bottom-0 z-50 p-4 transition-opacity duration-300 cursor-pointer h-fit">
        <Button
          className="transition-colors hover:text-black hover:bg-gray-300"
          variant="primary">
          WATCH NOW
        </Button>
      </Link>
      <div className="absolute right-0 bottom-0 z-10 m-4 mt-3 backdrop-blur-sm">
        <CollectVideButton
          variant="primary"
          video={collection as IExtendedSession}
          nftCollection={nftCollection}
        />
      </div>
    </div>
  )
}

export default CollectionItem

import Thumbnail from '@/components/misc/VideoCard/thumbnail'
import CollectVideButton from '@/components/sessions/CollectVideButton'

import { fetchSession } from '@/lib/services/sessionService'
import { fetchStage } from '@/lib/services/stageService'
import {
  IExtendedNftCollections,
  IExtendedSession,
  IExtendedStage,
} from '@/lib/types'
import { formatDate } from '@/lib/utils/time'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

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

  const link = `/${
    video.type === 'video'
      ? 'watch?tabs=none&session'
      : 'livestream?tabs=none&stage'
  }=${session?._id?.toString()}`
  return (
    <div className="w-full   relative flex flex-col">
      <Link href={link} className="flex z-10 flex-col w-full">
        <Thumbnail imageUrl={collectionImage!} />
        <h2 className="text-lg h-full w-full bg-black  bg-opacity-50  line-clamp-2 absolute p-3 font-bold uppercase">
          {collection?.name}
        </h2>
      </Link>

      <div className="mt-3 absolute bottom-0 backdrop-blur-sm right-0 m-4 z-10">
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

import Thumbnail from '@/components/misc/VideoCard/thumbnail'
import CollectVideButton from '@/components/sessions/CollectVideButton'
import {
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { fetchSession } from '@/lib/services/sessionService'
import { fetchStage } from '@/lib/services/stageService'
import DefaultThumbnail from '@/lib/svg/DefaultThumbnail'
import {
  IExtendedNftCollections,
  IExtendedSession,
  IExtendedStage,
} from '@/lib/types'
import { formatDate } from '@/lib/utils/time'
import { Link } from 'lucide-react'
import Image from 'next/image'
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
    video.type === 'video' ? 'watch?session' : 'livestream?stage'
  }=${session?._id?.toString()}`
  return (
    <div className="w-full relative flex flex-col">
      <div className="flex z-10 flex-col w-full">
        <Thumbnail imageUrl={collectionImage!} />
        <h2 className="text-lg line-clamp-2 absolute p-3 font-bold uppercase">
          {collection?.name}
        </h2>
      </div>

      <div className="mt-3">
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

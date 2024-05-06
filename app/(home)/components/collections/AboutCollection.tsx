import { fetchNFTCollection } from '@/lib/services/nftCollectionService'
import { formatDate } from '@/lib/utils/time'
import { Dot } from 'lucide-react'
import Image from 'next/image'

import React from 'react'
import CollectionItem from './CollectionItem'
import DefaultThumbnail from '@/lib/svg/DefaultThumbnail'
import ShareButton from '@/components/misc/interact/ShareButton'
import InnerNav from '@/components/misc/interact/InnerNav'

const menuItems = [
  { key: 'about', label: 'ABOUT' },
  { key: 'items', label: 'ITEMS' },
  { key: 'share', label: 'SHARE' },
]

const AboutCollection = async ({
  searchParams,
}: {
  searchParams: any
}) => {
  const selectedItem = searchParams.m
  const collectionId = searchParams.collectionId
  if (!collectionId) return
  const collection = await fetchNFTCollection({ collectionId })
  if (!collection) return
  return (
    <div className="m-6 space-y-4 text-white">
      <div className="relative w-full aspect-video">
        <div className="flex absolute top-0 left-0 z-10 flex-col p-3 w-full h-full">
          <h2 className="text-2xl font-bold">{collection?.name}</h2>
          <div className="flex">
            <Dot />
            <p>
              {formatDate(
                new Date(collection?.createdAt as string),
                'YYYY-MM-DD'
              )}
            </p>
          </div>
        </div>

        {collection?.thumbnail ? (
          <Image
            src={collection?.thumbnail}
            alt="'"
            layout="fill"
            objectFit="cover"
          />
        ) : (
          <DefaultThumbnail />
        )}
      </div>
      <InnerNav menuItems={menuItems} />

      {selectedItem === 'about' && <p>{collection.description}</p>}

      {selectedItem === 'items' && (
        <div className="grid grid-cols-1 gap-x-4 gap-8 md:grid-cols-2">
          {collection?.videos?.map((video) => (
            <CollectionItem
              nftCollection={collection}
              key={video?.index}
              video={video}
            />
          ))}
        </div>
      )}

      {selectedItem === 'share' && (
        <div className="">
          <ShareButton variant="primary" shareFor="collection" />
        </div>
      )}
    </div>
  )
}

export default AboutCollection

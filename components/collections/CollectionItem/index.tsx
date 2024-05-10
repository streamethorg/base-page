import { fetchNFTCollection } from '@/lib/services/nftCollectionService'
import { formatDate } from '@/lib/utils/time'
import { Dot } from 'lucide-react'
import Image from 'next/image'
import CollectionItem from './CollectionItemActions'
import AboutCollectionInfo from './CollectionItemInfo'
import DefaultThumbnail from '@/lib/svg/DefaultThumbnail'
import BackButton from '@/components/ui/back-button'
import { ChannelPageParams } from '@/lib/types'
const menuItems = [
  { key: 'about', label: 'ABOUT' },
  { key: 'items', label: 'ITEMS' },
]

const AboutCollection = async ({
  searchParams,
}: {
  searchParams: ChannelPageParams['searchParams']
}) => {
  const { m: selectedItem, collectionId } = searchParams
  if (!collectionId) return
  const collection = await fetchNFTCollection({ collectionId })
  if (!collection) return
  return (
    <div className="mt-4 md:px-2 space-y-4 text-white">
      <div className="flex justify-start">
        <BackButton />
      </div>
      <div className="relative w-full aspect-video">
        <div className="flex absolute backdrop-blur-sm top-0 left-0 z-10 flex-col p-3 w-full h-full">
          <h2 className="text-2xl font-bold">{collection?.name}</h2>
          <div className="flex">
            <Dot />
            <p className="uppercase">
              {formatDate(
                new Date(collection?.createdAt as string),
                'MMMM, YYYY'
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
      <AboutCollectionInfo menuItems={menuItems} />

      {selectedItem === 'about' && <p>{collection.description}</p>}

      {selectedItem === 'items' && (
        <div className=" grid grid-cols-1 gap-8 gap-x-4">
          {collection?.videos?.map((video) => (
            <CollectionItem
              nftCollection={collection}
              key={video?.index}
              video={video}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default AboutCollection

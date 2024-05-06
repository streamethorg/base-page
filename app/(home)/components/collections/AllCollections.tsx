import Thumbnail from '@/components/misc/VideoCard/thumbnail'

import { fetchOrganizationNFTCollections } from '@/lib/services/nftCollectionService'
import { fetchOrganization } from '@/lib/services/organizationService'

import { organizationSlug } from '@/lib/utils'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'

const AllCollections = async () => {
  const organization = await fetchOrganization({
    organizationSlug: organizationSlug,
  })

  const collections = await fetchOrganizationNFTCollections({
    organizationId: organization?._id,
  })
  if (!organization || !collections) {
    return notFound()
  }

  return (
    <div className="grid-cols-1 xl:grid-cols-2 gap-4 px-6 md:mt-8 grid">
      {collections.map((collection) => (
        <Link
          href={`/?tab=collection&collectionId=${collection._id}`}
          key={collection._id}
          className="w-full relative min-h-full uppercase rounded-xl flex flex-col">
          <Thumbnail imageUrl={collection.thumbnail} />

          <div className="absolute h-full w-full bg-black bg-opacity-35  flex justify-between items-start">
            <div
              className={`rounded p-1 mt-1 lg:p-2 shadow-none lg:shadow-none `}>
              <p
                className={`uppercase line-clamp-2 overflow-hidden text-white font-bold  hover:underline text-2xl`}>
                {collection?.name}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default AllCollections

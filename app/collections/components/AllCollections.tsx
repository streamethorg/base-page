import Thumbnail from '@/components/misc/VideoCard/thumbnail'
import CollectVideButton from '@/components/sessions/CollectVideButton'
import {
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { fetchOrganizationNFTCollections } from '@/lib/services/nftCollectionService'
import { fetchOrganization } from '@/lib/services/organizationService'
import { IExtendedSession } from '@/lib/types'
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
    <div>
      <div className="hidden grid-cols-1 gap-4 px-6 mt-8 md:grid">
        {collections.map((collection) => (
          <Link
            href={`/?tab=collection&collectionId=${collection._id}`}
            key={collection._id}
            className="w-full min-h-full uppercase rounded-xl flex flex-col">
            <Thumbnail imageUrl={collection.thumbnail} />

            <div className="absolute flex justify-between items-start">
              <CardHeader
                className={`rounded p-1 mt-1 lg:p-2 shadow-none lg:shadow-none `}>
                <CardTitle
                  className={`uppercase line-clamp-2 overflow-hidden text-white  hover:underline `}>
                  {collection?.name}
                </CardTitle>
              </CardHeader>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default AllCollections

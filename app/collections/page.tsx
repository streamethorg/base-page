import { fetchOrganizationNFTCollections } from '@/lib/services/nftCollectionService'
import { fetchOrganization } from '@/lib/services/organizationService'
import { organizationSlug } from '@/lib/utils'
import { notFound } from 'next/navigation'
import React from 'react'

const Collections = async () => {
  const organization = await fetchOrganization({
    organizationSlug: organizationSlug,
  })

  const collections = await fetchOrganizationNFTCollections({
    organizationId: organization?._id,
  })
  if (!organization || !collections) {
    return notFound()
  }

  return <div>Collections</div>
}

export default Collections

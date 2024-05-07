'use server'

import NotFound from '@/app/not-found'
import { fetchOrganization } from '@/lib/services/organizationService'
import { organizationSlug } from '@/lib/utils'
import WatchGrid, { WatchGridLoading } from './WatchGrid'
import { Suspense } from 'react'
import UpcomingStreams, {
  UpcomingStreamsLoading,
} from './UpcomingStreams'

const MainContent = async () => {
  const organization = await fetchOrganization({
    organizationSlug: organizationSlug,
  })

  if (!organization) {
    return NotFound()
  }

  return (
    <div className="flex flex-col mt-4 space-y-2 text-white md:px-2">
      <Suspense fallback={<UpcomingStreamsLoading />}>
        <UpcomingStreams organizationId={organization._id} />
      </Suspense>
      <Suspense fallback={<WatchGridLoading />}>
        <WatchGrid />
      </Suspense>
    </div>
  )
}

export default MainContent

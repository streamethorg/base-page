'use server'

import NotFound from '@/app/not-found'
import { fetchAllSessions } from '@/lib/data'
import { fetchOrganization } from '@/lib/services/organizationService'
import { fetchStages } from '@/lib/services/stageService'
import { organizationSlug } from '@/lib/utils'
import WatchGrid, { WatchGridLoading } from '../WatchGrid'
import { Suspense } from 'react'
import UpcomingStreams, {
  UpcomingStreamsLoading,
} from '../UpcomingStreams'

const MainContent = async () => {
  const organization = await fetchOrganization({
    organizationSlug: organizationSlug,
  })

  if (!organization) {
    return NotFound()
  }

  const stages = (
    await fetchStages({
      organizationId: organization._id.toString(),
    })
  ).slice(0, 3)

  const sessions = (
    await fetchAllSessions({
      organizationSlug: organizationSlug,
    })
  ).sessions.slice(0, 6)

  return (
    <div className="flex flex-col mt-4 space-y-2 text-white">
      <Suspense fallback={<UpcomingStreamsLoading />}>
        <UpcomingStreams
          organizationId={organization._id}
          organizationSlug={organizationSlug}
        />
      </Suspense>
      <Suspense fallback={<WatchGridLoading />}>
        <WatchGrid
          organizationSlug={organizationSlug}
          gridLength={4}
        />
      </Suspense>
    </div>
  )
}

export default MainContent

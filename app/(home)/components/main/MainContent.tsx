'use server'

import NotFound from '@/app/not-found'
import { fetchAllSessions } from '@/lib/data'
import { fetchOrganization } from '@/lib/services/organizationService'
import { fetchStages } from '@/lib/services/stageService'
import { organizationSlug } from '@/lib/utils'

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
      <span className="font-bold">Upcoming Streams</span>
      <div className="grid grid-cols-3 gap-4">
        {stages.map((stage) => (
          <div className="p-4 bg-gray-800 rounded-lg">
            {stage.name}
          </div>
        ))}
      </div>
      <span className="font-bold">Watch now</span>
      <div className="grid grid-cols-3 gap-4">
        {sessions.map((session) => (
          <div className="p-4 bg-gray-800 rounded-lg">
            {session.name}
          </div>
        ))}
      </div>
    </div>
  )
}

export default MainContent

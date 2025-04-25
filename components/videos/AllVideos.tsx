import { fetchAllSessions } from '@/lib/services/sessionService'
import React from 'react'
import { organizationId } from '@/lib/utils'
import Pagination from '../ui/Pagination'
import VideoCardWithMenu from '@/components/video-ui/VideoCardWithMenu'

const AllVideos = async ({ page }: { page?: string }) => {
  const videos = await fetchAllSessions({
    organizationId,
    onlyVideos: true,
    page: Number(page || 1),
    limit: 6,
  })

  return (
    <>
      <div className="mt-4 md:px-2">
        <Pagination {...videos.pagination} />
      </div>
      <div className="grid relative grid-cols-1 gap-4 md:mt-2 xl:grid-cols-2">
        {videos.sessions.map((session) => (
          <VideoCardWithMenu
            link={`?tab=about&session=${session._id}`}
            key={session._id}
            session={session}
          />
        ))}
      </div>
      <div className="py-4">
        <Pagination {...videos.pagination} />
      </div>
    </>
  )
}

export default AllVideos

import { fetchAllSessions } from '@/lib/data'
import React from 'react'
import { organizationSlug } from '@/lib/utils'
import Thumbnail from '@/components/misc/VideoCard/thumbnail'

import Link from 'next/link'
import Pagination from '../Pagination'

import VideoCardWithMenu from '@/components/misc/VideoCard/VideoCardWithMenu'

const AllVideos = async ({ page }: { page?: string }) => {
  const videos = await fetchAllSessions({
    organizationSlug,
    onlyVideos: true,
    page: Number(page || 1),
    limit: 6,
  })

  return (
    <>
      <div className="mt-2">
        <Pagination {...videos.pagination} />
      </div>
      <div className="grid-cols-1 xl:grid-cols-2 gap-4 md:mt-8 grid relative">
        {videos.sessions.map((session) => (
          <VideoCardWithMenu
            link={`/?tab=about&session=${session._id}`}
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

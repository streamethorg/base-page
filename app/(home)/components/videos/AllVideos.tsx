import { fetchAllSessions } from '@/lib/data'
import React from 'react'
import { organizationSlug } from '@/lib/utils'
import Thumbnail from '@/components/misc/VideoCard/thumbnail'

import Link from 'next/link'
import Pagination from '../Pagination'

const AllVideos = async ({ page }: { page?: string }) => {
  const videos = await fetchAllSessions({
    organizationSlug,
    onlyVideos: true,
    page: Number(page || 1),
    limit: 12,
  })

  return (
    <>
      <div className="mt-2">
        <Pagination {...videos.pagination} />
      </div>
      <div className="grid-cols-1 xl:grid-cols-2 gap-4 px-6 md:mt-8 grid relative">
        {videos.sessions.map((sessions) => (
          <Link
            href={`/?tab=about&session=${sessions._id}`}
            key={sessions._id}
            className="flex relative flex-col w-full min-h-full uppercase rounded-xl">
            <Thumbnail imageUrl={sessions.coverImage} />

            <div className="absolute h-full w-full bg-black bg-opacity-35  flex justify-between items-start">
              <div
                className={`rounded p-1 mt-1 backdrop-blur-md lg:p-2 shadow-none lg:shadow-none `}>
                <p
                  className={`uppercase line-clamp-2 overflow-hidden text-white font-bold  hover:underline text-2xl`}>
                  {sessions?.name}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="py-4">
        <Pagination {...videos.pagination} />
      </div>
    </>
  )
}

export default AllVideos

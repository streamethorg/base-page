import { fetchAllSessions } from '@/lib/data'
import React from 'react'
import { organizationSlug } from '@/lib/utils'
import Thumbnail from '@/components/misc/VideoCard/thumbnail'

import Link from 'next/link'

const AllVideos = async () => {
  const sessions = (
    await fetchAllSessions({
      organizationSlug,
      onlyVideos: true,
      page: 1,
      limit: 4,
    })
  ).sessions

  return (
    <div className="grid relative grid-cols-1 gap-4 md:px-2 md:mt-8 xl:grid-cols-2">
      {sessions.map((sessions) => (
        <Link
          href={`/?tab=collection&collectionId=${sessions._id}`}
          key={sessions._id}
          className="flex relative flex-col w-full min-h-full uppercase rounded-xl">
          <Thumbnail imageUrl={sessions.coverImage} />

          <div className="flex absolute justify-between items-start backdrop-blur-sm">
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
  )
}

export default AllVideos

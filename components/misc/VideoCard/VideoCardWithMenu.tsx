import Thumbnail from '@/components/misc/VideoCard/thumbnail'
import { IExtendedSession } from '@/lib/types'
import { formatDate } from '@/lib/utils/time'
import { Dot } from 'lucide-react'
import Link from 'next/link'
import React, { ReactNode } from 'react'
import WatchButton from './WatchButton'
import { Button } from '@/components/ui/button'

const VideoCardWithMenu = async ({
  session,
  showDate = true,
  showPlayButton = true,
  DropdownMenuItems,
  link,
}: {
  session: IExtendedSession
  showDate?: boolean
  showPlayButton?: boolean
  DropdownMenuItems?: ReactNode
  link: string
}) => {
  return (
    <div className="flex relative flex-col w-full min-h-full uppercase rounded-xl">
      <Link href={link} key={session._id} className="">
        <Thumbnail imageUrl={session.coverImage} />

        <div className="flex absolute top-0 justify-between items-start w-full h-full bg-black bg-opacity-55">
          <div className="relative z-20 p-1 mt-1 lg:p-2 h-full">
            <p className="overflow-hidden px-2 text-xl font-bold text-white uppercase sm:text-2xl md:text-lg xl:text-xl line-clamp-2">
              {session?.name}
            </p>
            <p className="flex items-center text-white">
              <Dot className="w-10 h-10" />
              {formatDate(
                new Date(session.createdAt as string),
                'MMM, YYYY'
              )}
            </p>
          </div>
        </div>
      </Link>
      <Link
        href={`/watch?session=${session._id}`}
        className="absolute z-50 w-full bottom-0 p-4 transition-opacity duration-300 md:opacity-0 hover:opacity-100">
        <Button
          className="transition-colors hover:text-black hover:bg-gray-300"
          variant="primary">
          WATCH NOW
        </Button>
      </Link>
    </div>
  )
}

export default VideoCardWithMenu

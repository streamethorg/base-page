import Thumbnail from '@/components/misc/VideoCard/thumbnail'
import {
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import DefaultThumbnail from '@/lib/svg/DefaultThumbnail'
import { IExtendedSession } from '@/lib/types'
import { formatDate } from '@/lib/utils/time'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Dot, EllipsisVertical } from 'lucide-react'
import Link from 'next/link'
import React, { ReactNode } from 'react'
import { generateThumbnail } from '@/lib/actions/livepeer'
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
    <Link
      href={link}
      key={session._id}
      className="flex relative flex-col w-full min-h-full uppercase rounded-xl">
      <Thumbnail imageUrl={session.coverImage} />

      <div className="flex absolute justify-between items-start w-full h-full bg-black bg-opacity-50">
        <div className="absolute inset-0 bg-black bg-opacity-50 transition-all duration-300 hover:backdrop-blur-sm"></div>

        <div className="relative z-20 p-1 mt-1 lg:p-2">
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

        <div className="flex absolute inset-0 justify-start items-end p-4 transition-opacity duration-300 md:opacity-0 hover:opacity-100">
          <Button
            className="transition-colors hover:text-black hover:bg-gray-300"
            variant="primary">
            WATCH NOW
          </Button>
        </div>
      </div>

      {DropdownMenuItems && (
        <DropdownMenu>
          <DropdownMenuTrigger className="z-10">
            <EllipsisVertical className="mt-2" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {DropdownMenuItems}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </Link>
  )
}

export default VideoCardWithMenu

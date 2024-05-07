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
        <div
          className={`rounded p-1 mt-1 lg:p-2 shadow-none lg:shadow-none `}>
          <p
            className={`px-2 uppercase line-clamp-2 overflow-hidden text-white font-bold  hover:underline text-xl sm:text-2xl md:text-lg xl:text-xl`}>
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

      <div className="flex absolute justify-start items-end p-4 w-full h-full transition-all md:opacity-0 hover:opacity-100 visibility-hidden z-[999999] hover:visibility-visible hover:backdrop-blur-sm">
        <Button
          className="transition-all hover:text-black hover:bg-gray-300"
          variant="primary">
          WATCH NOW
        </Button>
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

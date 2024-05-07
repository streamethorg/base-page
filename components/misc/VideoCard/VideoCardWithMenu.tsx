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

const VideoCardWithMenu = async ({
  session,
  showDate = true,
  DropdownMenuItems,
  link,
}: {
  session: IExtendedSession
  showDate?: boolean
  DropdownMenuItems?: ReactNode
  link: string
}) => {
  const thumbnail = await generateThumbnail(session)

  return (
    <Link
      href={link}
      key={session._id}
      className="flex relative flex-col w-full min-h-full uppercase rounded-xl">
      <Thumbnail imageUrl={session.coverImage} />

      <div className="absolute h-full w-full bg-black bg-opacity-50  flex justify-between items-start">
        <div
          className={`rounded p-1 mt-1 lg:p-2 shadow-none lg:shadow-none `}>
          <p
            className={`px-2 uppercase line-clamp-2 overflow-hidden text-white font-bold  hover:underline text-2xl`}>
            {session?.name}
          </p>
          <p className="text-white flex items-center">
            <Dot className="w-10 h-10" />
            {formatDate(
              new Date(session.createdAt as string),
              'MMM, YYYY'
            )}
          </p>
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

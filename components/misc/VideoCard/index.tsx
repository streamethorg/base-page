'use client'
import { useEffect, useState } from 'react'
import {
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Thumbnail from './thumbnail'
import Image from 'next/image'
import { IExtendedSession, IExtendedEvent } from '@/lib/types'
import { generateThumbnail } from '@/lib/actions/livepeer'

const VideoCard = ({
  session,
  invertedColors,
  event,
}: {
  session: IExtendedSession
  invertedColors?: boolean
  event?: IExtendedEvent
}) => {
  const headerClass = invertedColors ? ' ' : ''
  const descriptionClass = invertedColors ? '' : ''
  const [imageUrl, setImageUrl] = useState<string | undefined>(
    undefined
  )

  useEffect(() => {
    generateThumbnail(session).then((url) => url && setImageUrl(url))
  }, [session])
  return (
    <div className="w-full min-h-full uppercase rounded-xl">
      <Thumbnail imageUrl={session.coverImage} fallBack={imageUrl} />
      <CardHeader
        className={`rounded p-1 mt-1 lg:p-2 shadow-none lg:shadow-none ${headerClass}`}>
        <CardTitle className={`text-sm truncate ${descriptionClass}`}>
          {session.name}
        </CardTitle>
        {event && (
          <div className="flex flex-row justify-start items-center">
            <Image
              className="mr-2 rounded-md"
              alt="logo"
              quality={80}
              src={event.logo!}
              height={24}
              width={24}
            />
            <CardDescription
              className={`text-xs truncate ${descriptionClass}`}>
              {event?.name}
            </CardDescription>
          </div>
        )}
      </CardHeader>
    </div>
  )
}

export default VideoCard

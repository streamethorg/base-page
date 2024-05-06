'use server'

import Link from 'next/link'
import { formatDate } from '@/lib/utils/time'
import Image from 'next/image'
import { Dot } from 'lucide-react'
import AboutInfo from './AboutInfo'
import { fetchSession } from '@/lib/services/sessionService'
import VideoName from './VideoName'

const AboutVideo = async ({ sessionId }: { sessionId?: string }) => {
  const session = await fetchSession({ session: sessionId || '' })

  if (!session) return null

  return (
    <div className="mt-2 space-y-4 text-white md:m-6">
      <div className="relative w-full aspect-video">
        <div className="flex absolute top-0 left-0 z-10 flex-col p-3 w-full h-full bg-black bg-opacity-50">
          <VideoName session={session} />
          <div className="flex">
            <Dot />
            <p>
              {formatDate(
                new Date(session?.createdAt || ''),
                'YYYY-MM-DD'
              )}
            </p>
          </div>
        </div>
        <Image
          src={session?.coverImage || ''}
          alt="Thumbnail video"
          layout="fill"
          objectFit="cover"
          className="blur-sm"
        />
      </div>
      <AboutInfo session={session} />
    </div>
  )
}

export default AboutVideo

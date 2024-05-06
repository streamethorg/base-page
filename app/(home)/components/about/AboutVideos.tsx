'use server'

import { formatDate } from '@/lib/utils/time'
import Image from 'next/image'
import { ArrowLeftFromLine, Dot } from 'lucide-react'
import Link from 'next/link'
import AboutInfo from './AboutInfo'
import { fetchSession } from '@/lib/services/sessionService'
import VideoName from './VideoName'
import BackButton from './BackButton'

const AboutVideo = async ({ sessionId }: { sessionId?: string }) => {
  const session = await fetchSession({ session: sessionId || '' })

  if (!session) return null

  return (
    <div className="mt-2 space-y-4 text-white md:m-2 md:mt-4">
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
          <Link href={`/?tab=none&session=${sessionId}`}>
            <button className="absolute bottom-0 left-0 z-10 p-2 m-3 border border-white transition-all hover:text-black hover:bg-gray-100">
              Watch Video
            </button>
          </Link>
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

      <BackButton />
    </div>
  )
}

export default AboutVideo

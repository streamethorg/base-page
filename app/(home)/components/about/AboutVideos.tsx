'use server'

import { formatDate } from '@/lib/utils/time'
import Image from 'next/image'
import { ArrowLeftFromLine, Dot } from 'lucide-react'
import AboutInfo from './AboutInfo'
import { fetchSession } from '@/lib/services/sessionService'

import BackButton from './BackButton'
import Link from 'next/link'

const AboutVideo = async ({ sessionId }: { sessionId?: string }) => {
  const session = await fetchSession({ session: sessionId || '' })

  if (!session) return null

  return (
    <div className="mt-2 space-y-4 text-white md:m-2 md:mt-4">
      <div className="relative w-full aspect-video">
        <div className="flex absolute top-0 left-0 z-10 flex-col p-3 w-full h-full bg-black bg-opacity-50">
          <Link href={`/watch?tab=none&session=${session._id}`}>
            <h2 className="text-xl font-bold cursor-pointer md:text-2xl hover:underline">
              {session.name}
            </h2>
          </Link>
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

      <BackButton />
    </div>
  )
}

export default AboutVideo

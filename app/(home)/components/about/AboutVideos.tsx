'use server'

import { formatDate } from '@/lib/utils/time'
import Image from 'next/image'
import { apiUrl } from '@/lib/utils/utils'
import { Dot } from 'lucide-react'
import AboutInfo from './AboutInfo'

const AboutVideo = async ({ sessionId }: { sessionId?: string }) => {
  const response = await fetch(`${apiUrl()}/sessions/${sessionId}`)
  const data = await response.json()
  const session = data.data
  return (
    <div className="mr-4 space-y-4 mt-[50%] text-white md:m-6">
      <div className="relative w-full aspect-video">
        <div className="flex absolute top-0 left-0 z-10 flex-col p-3 w-full h-full bg-black bg-opacity-50">
          <h2 className="text-xl font-bold md:text-2xl">
            {session.name}
          </h2>
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

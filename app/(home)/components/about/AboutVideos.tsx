'use server'

import { formatDate } from '@/lib/utils/time'
import Image from 'next/image'
import { apiUrl } from '@/lib/utils/utils'
import React from 'react'

import { Dot } from 'lucide-react'
import InnerNav from '@/components/misc/interact/InnerNav'

const menuItems = [
  { key: 'about', label: 'ABOUT' },
  // { key: 'credits', label: 'CREDITS' },
  { key: 'share', label: 'SHARE' },
]

const AboutVideo = async ({
  sessionId,
  searchParams,
}: {
  sessionId?: string
  searchParams: any
}) => {
  const response = await fetch(`${apiUrl()}/sessions/${sessionId}`)
  const data = await response.json()
  const session = data.data
  const selectedItem = searchParams.m
  if (!session) return <div>Loading...</div>

  return (
    <div className="m-6 space-y-4 text-white">
      <div className="relative w-full aspect-video">
        <div className="flex absolute top-0 left-0 z-10 flex-col p-3 w-full h-full bg-black bg-opacity-50">
          <h2 className="text-2xl font-bold">{session.name || ''}</h2>
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
        />
      </div>
      <InnerNav menuItems={menuItems} />
      {selectedItem === 'about' && <p>{session.description}</p>}
    </div>
  )
}

export default AboutVideo

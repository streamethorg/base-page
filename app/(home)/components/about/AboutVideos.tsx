'use server'

import { formatDate } from '@/lib/utils/time'
import Image from 'next/image'
import { apiUrl } from '@/lib/utils/utils'
import React from 'react'
import {
  NavigationMenu,
  NavigationMenuItem,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'

import { Separator } from '@/components/ui/separator'
import { Dot } from 'lucide-react'

const menuItems = [
  { key: 'about', label: 'ABOUT' },
  // { key: 'credits', label: 'CREDITS' },
  { key: 'share', label: 'SHARE' },
]

const AboutVideo = async ({ sessionId }: { sessionId: string }) => {
  const response = await fetch(`${apiUrl()}/sessions/${sessionId}`)
  const data = await response.json()
  const session = data.data

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
      <NavigationMenu>
        <ul className="flex flex-col justify-start items-start space-y-2 w-full text-gray-300">
          {menuItems.map((item) => (
            <React.Fragment key={item.key}>
              <NavigationMenuItem className="border-none transition-all cursor-pointer hover:text-white">
                {item.label}
              </NavigationMenuItem>
              <Separator className="bg-gray-300 transition-all hover:text-white" />
            </React.Fragment>
          ))}
        </ul>
      </NavigationMenu>
      <p>{session.description}</p>
    </div>
  )
}

export default AboutVideo

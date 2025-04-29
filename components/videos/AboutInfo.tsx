'use client'

import React, { useState } from 'react'
import { IExtendedSession } from '@/lib/types'
import {
  NavigationMenu,
  NavigationMenuItem,
} from '@/components/ui/navigation-menu'
import { Separator } from '@/components/ui/separator'
import { ShareButton } from '@/components/ui/share-button'
import SpeakerIcon from '@/components/videos/speakers/speakerIcon'
import sdk from '@farcaster/frame-sdk'

const menuItems = [{ key: 'about', label: 'ABOUT' }]

const AboutInfo = ({ session }: { session: IExtendedSession }) => {
  const [currentSection, setCurrentSection] = useState('about')

  // There may be added more keys in the future
  const handleClick = (key: string) => {
    setCurrentSection(key)
  }

  const handleShare = async () => {
    await sdk.actions.composeCast({
      text: 'Im listening to this song on the @ufo mini app!',
    })
  }
  return (
    <>
      <NavigationMenu className="flex flex-col justify-start items-start space-y-2">
        <div
          key={'share'}
          className={`w-full hover:text-white space-y-2  text-white`}
          onClick={() => handleShare()}>
          <NavigationMenuItem className="text-left border-none transition-all cursor-pointer">
            SHARE
          </NavigationMenuItem>
          <Separator className="bg-gray-300 transition-all" />
        </div>
        {menuItems.map((item) => (
          <div
            key={item.key}
            className={`w-full hover:text-white space-y-2 ${currentSection === item.key ? 'text-white' : 'text-gray-300'}`}
            onClick={() => handleClick(item.key)}>
            <NavigationMenuItem className="text-left border-none transition-all cursor-pointer">
              {item.label}
            </NavigationMenuItem>
            <Separator className="bg-gray-300 transition-all" />
          </div>
        ))}
      </NavigationMenu>
      {currentSection === 'about' && (
        <>
          <p>{session.description}</p>
          <div className="space-y-2 space-x-2">
            {session.speakers?.map((speaker) => (
              <SpeakerIcon
                key={speaker._id?.toString()}
                speaker={speaker}
              />
            ))}
          </div>
        </>
      )}
    </>
  )
}

export default AboutInfo

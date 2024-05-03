'use client'

import React, { useState } from 'react'
import { IExtendedSession } from '@/lib/types'
import {
  NavigationMenu,
  NavigationMenuItem,
} from '@/components/ui/navigation-menu'
import { Separator } from '@/components/ui/separator'
import { ShareModalContent } from '@/components/misc/interact/ShareButton'
import { DialogTrigger, Dialog } from '@/components/ui/dialog'
import SpeakerIcon from '@/components/speakers/speakerIcon'

const menuItems = [{ key: 'about', label: 'ABOUT' }]

const AboutInfo = ({ session }: { session: IExtendedSession }) => {
  const [currentSection, setCurrentSection] = useState('about')

  // There may be added more keys in the future
  const handleClick = (key: string) => {
    setCurrentSection(key)
  }

  return (
    <>
      <NavigationMenu>
        <ul className="flex flex-col justify-start items-start space-y-2 w-full text-gray-300">
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
          <Dialog>
            <DialogTrigger className="space-y-2 w-full text-left border-none transition-all cursor-pointer hover:text-white">
              <span>SHARE</span>
              <Separator className="bg-gray-300 transition-all hover:bg-white" />
            </DialogTrigger>
            <ShareModalContent />
          </Dialog>
        </ul>
      </NavigationMenu>
      {currentSection === 'about' && (
        <>
          <p>{session.description}</p>
          <div className="space-x-2">
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

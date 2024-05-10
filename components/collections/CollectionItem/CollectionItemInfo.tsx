'use client'
import React, { useState } from 'react'

import {
  NavigationMenu,
  NavigationMenuItem,
} from '@/components/ui/navigation-menu'
import { Separator } from '@/components/ui/separator'
import { ShareModalContent } from '@/components/ui/share-button'
import { DialogTrigger, Dialog } from '@/components/ui/dialog'

import useSearchParams from '@/lib/hooks/useSearchParams'

const AboutCollectionInfo = ({
  menuItems,
}: {
  menuItems: { key: string; label: string }[]
}) => {
  const [currentSection, setCurrentSection] = useState('about')
  const { handleTermChange } = useSearchParams()
  return (
    <NavigationMenu>
      <ul className="flex flex-col justify-start items-start space-y-2 w-full text-gray-300">
        {menuItems.map((item) => (
          <div
            className={`w-full hover:text-white space-y-2 ${currentSection === item.key ? 'text-white' : 'text-gray-300'}`}
            onClick={() =>
              handleTermChange([{ key: 'm', value: item.key }])
            }
            key={item.key}>
            <NavigationMenuItem
              className={
                'border-none transition-all cursor-pointer hover:text-white'
              }>
              {item.label}
            </NavigationMenuItem>
            <Separator className="bg-gray-300 transition-all w-full hover:text-white" />
          </div>
        ))}
        <Dialog>
          <DialogTrigger className="space-y-2 w-full text-left border-none transition-all cursor-pointer hover:text-white">
            <span>SHARE</span>
            <Separator className="bg-gray-300 transition-all hover:bg-white" />
          </DialogTrigger>
          <ShareModalContent shareFor="collection" />
        </Dialog>
      </ul>
    </NavigationMenu>
  )
}

export default AboutCollectionInfo

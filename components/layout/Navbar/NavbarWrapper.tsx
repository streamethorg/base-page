'use client'
import { Page } from '@/lib/types'
import BaseLogo from '@/lib/svg/BaseLogo'
import Image from 'next/image'
import Link from 'next/link'
import { NavigationMenu } from '@/components/ui/navigation-menu'
import ConnectButtonNav from './ConnectButtonNav'
import CloseNavigation from './XButton'
import MenuVisibleButton from './MenuVisibleButton'
import NavbarNavigation from './NavbarNavigation'
import { ConnectWalletButton } from '@/components/ui/ConnectWalletButton'
import { useState } from 'react'

const NavbarbarWrapper = ({
  pages,
  children,
}: {
  pages: Page[]
  children: React.ReactNode
}) => {
  const [showSidebar, setShowSidebar] = useState(false)

  return (
    <NavigationMenu
      className={`relative z-[9999] flex flex-col items-center backdrop-blur-md
        ${showSidebar && 'h-screen'}
      `}>
      <div
        className={`flex relative flex-col items-center p-0 w-full
          ${
            showSidebar &&
            'items-start bg-base-blue md:bg-transparent h-screen'
          }
        `}>
        {!showSidebar && (
          <div className="hidden md:flex w-full justify-between items-center p-2">
            <Link href={'/'}>
              <Image
                src={'/ufo.svg'}
                alt="Logo"
                height={60}
                width={60}
                className="h-full aspect-square"
              />
            </Link>
            <MenuVisibleButton
              showSidebar={showSidebar}
              setShowSidebar={setShowSidebar}
            />
          </div>
        )}
        <div className="md:hidden flex w-full p-2 justify-between items-center">
          <Link href={'/'}>
            <Image
              src={'/ufo.svg'}
              alt="Logo"
              height={60}
              width={60}
              className="h-full aspect-square"
            />
          </Link>
          <MenuVisibleButton
            showSidebar={showSidebar}
            setShowSidebar={setShowSidebar}
          />
        </div>
        {showSidebar && (
          <div className="flex w-full h-[calc(100%-46px)] md:h-full">
            <aside className="w-full md:w-[50%] bg-base-blue h-full z-20">
              <NavbarNavigation pages={pages} />
              <div className="h-[calc(100%-161px)] md:h-[calc(100%-57px)] w-full p-2 overflow-auto">
                {children}
              </div>
            </aside>
            <div className="hidden md:flex z-30 flex-col justify-between items-start p-2 pb-4 w-1/2 h-full backdrop-blur-sm">
              <div className="flex justify-between items-center w-full">
                <CloseNavigation setShowSidebar={setShowSidebar} />
              </div>
              <div />
              <Image
                src={'/ufo.svg'}
                alt="Logo"
                height={60}
                width={60}
                className=" aspect-square"
              />
            </div>
          </div>
        )}
      </div>
    </NavigationMenu>
  )
}

export default NavbarbarWrapper

'use client'

import { cn } from '@/lib/utils/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { NavBarProps } from '@/lib/types'
import { ConnectWalletButton } from '../misc/ConnectWalletButton'
import useSearchParams from '@/lib/hooks/useSearchParams'

export default function NavbarLayout({
  setIsNavVisible,
  isMobile,
  pages,
}: {
  isMobile?: boolean
  setIsNavVisible?: React.Dispatch<React.SetStateAction<boolean>>
  pages?: NavBarProps['pages']
}) {
  const { searchParams, handleTermChange } = useSearchParams()
  const pathname = usePathname()
  const tab = searchParams.get('tab')
  if (!pages || pages?.length === 0) {
    return null
  }

  return (
    <div className="flex absolute right-0 z-50 flex-grow items-center w-screen text-center text-gray-300 border-gray-100 md:relative md:h-full top-[62px] lg:w-[unset] lg:top-[unset]">
      <ul
        onClick={() => isMobile && setIsNavVisible?.(false)}
        className="flex flex-col mx-4 w-full md:flex-row md:justify-between md:space-x-2 lg:px-2">
        {pages?.map((item, index) => (
          <>
            <NavigationMenuItem key={index}>
              <div
                onClick={() =>
                  handleTermChange([
                    {
                      key: 'tab',
                      value: item.name.toLowerCase(),
                    },
                  ])
                }>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    tab === item.href && 'text-white border-white'
                  )}>
                  {item.name}
                </NavigationMenuLink>
              </div>
            </NavigationMenuItem>
          </>
        ))}
        <NavigationMenuItem key={'connect'} className="md:hidden">
          <ConnectWalletButton className="flex justify-start w-full p-0 text-gray-300 bg-[#0052FF] rounded-none" />
        </NavigationMenuItem>
        <NavigationMenuItem
          key={'connect'}
          className="hidden md:block">
          <ConnectWalletButton
            className={
              (navigationMenuTriggerStyle(),
              'bg-[#0052FF] rounded-none border-b px-0 hover:border-white border-gray-300 hover:text-white text-gray-300')
            }
          />
        </NavigationMenuItem>

        {/* Placeholder... */}
        <div className="grid grid-cols-1 gap-4 mt-8 md:hidden">
          <div className="bg-blue-500 animate-pulse w-[350px] aspect-video" />
          <div className="bg-red-500 animate-pulse aspect-video w-[350px]" />
        </div>
      </ul>
    </div>
  )
}

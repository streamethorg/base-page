'use client'

import { cn } from '@/lib/utils/utils'
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
  const tab = searchParams.get('tab')
  if (!pages || pages?.length === 0) {
    return null
  }

  return (
    <div className="flex z-50 items-center text-center text-gray-300 border-gray-100 md:relative md:h-full">
      <ul
        onClick={() => isMobile && setIsNavVisible?.(false)}
        className="flex flex-col w-full uppercase cursor-pointer md:flex-row md:justify-between md:px-2 md:space-x-2">
        {pages?.map((item, index) => (
          <>
            <NavigationMenuItem key={index}>
              <div
                onClick={() =>
                  handleTermChange([
                    {
                      key: 'tab',
                      value: item.href.toLowerCase(),
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
        <NavigationMenuItem
          key={'connect-mobile'}
          className="md:hidden">
          <ConnectWalletButton className="flex justify-start p-0 w-full text-gray-300 rounded-none border-none" />
        </NavigationMenuItem>
      </ul>
    </div>
  )
}

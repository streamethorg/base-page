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

export default function NavbarLayout({
  setIsNavVisible,
  isMobile,
  pages,
}: {
  isMobile?: boolean
  setIsNavVisible?: React.Dispatch<React.SetStateAction<boolean>>
  pages?: NavBarProps['pages']
}) {
  const pathname = usePathname()

  if (!pages || pages?.length === 0) {
    return null
  }

  return (
    <div className="flex absolute right-0 z-50 items-center w-screen text-center text-gray-300 border-gray-100 lg:relative lg:items-center lg:h-full top-[62px] lg:w-[unset] lg:top-[unset]">
      <ul
        onClick={() => isMobile && setIsNavVisible?.(false)}
        className="flex flex-col mx-4 w-full lg:flex-row lg:px-2 lg:space-x-2">
        {pages?.map((item) => (
          <>
            <NavigationMenuItem key={item.name}>
              <Link href={item.href} legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    pathname === item.href &&
                    'text-white border-white'
                  )}>
                  {item.name}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </>
        ))}
        <NavigationMenuItem key={'connect'} className="md:hidden">
          <ConnectWalletButton className="flex justify-start w-full p-0 text-gray-300 bg-[#0052FF] rounded-none" />
        </NavigationMenuItem>
      </ul>
    </div>
  )
}

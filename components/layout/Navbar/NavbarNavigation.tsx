'use client'

import { cn } from '@/lib/utils/utils'
import {
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { NavBarProps } from '@/lib/types'
import { ConnectWalletButton } from '../../ui/ConnectWalletButton'
import useSearchParams from '@/lib/hooks/useSearchParams'
import { Separator } from '../../ui/separator'

export default function NavbarNavigation({
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
    <div className="flex z-50 items-center text-center text-gray-300 border-gray-100 md:relative md:flex-col">
      <ul
        onClick={() => isMobile && setIsNavVisible?.(false)}
        className="flex flex-col w-full uppercase cursor-pointer md:flex-row md:justify-between md:p-2 md:space-x-2 md:h-[56px]">
        {pages?.map((item, index) => (
          <>
            <NavigationMenuItem key={index}>
              <div
                className='flex justify-center items-center h-full w-full'
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
                    'border-b border-white md:border-none flex p-0 ',
                    navigationMenuTriggerStyle(),
                    tab === item.href && 'text-white'
                  )}>
                  <span className='px-2 md:px-0 my-auto' >{item.name}</span>
                </NavigationMenuLink>
              </div>
            </NavigationMenuItem>
          </>
        ))}
        <NavigationMenuItem
          key={'connect-mobile'}
          className="md:hidden border-b border-white md:border-none">
          <ConnectWalletButton
            btnText="LOGIN"
            className="flex justify-start p-0 w-full hover:text-white hover:bg-transparent text-gray-300 rounded-none border-none"
          />
        </NavigationMenuItem>
      </ul>
      <Separator className="hidden md:block" />
    </div>
  )
}

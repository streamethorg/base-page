'use client'

import useSearchParams from '@/lib/hooks/useSearchParams'
import { ConnectWalletButton } from '@/components/misc/ConnectWalletButton'
import { Menu } from 'lucide-react'
import { eTab } from '@/lib/types'

const ConnectButtonNav = ({
  showSidebar,
}: {
  showSidebar: boolean
}) => {
  const { handleTermChange } = useSearchParams()

  return (
    <>
      <button
        onClick={() =>
          handleTermChange([{ key: 'tab', value: eTab.main }])
        }
        className={`absolute top-4 z-[999999999999999] left-4 ${showSidebar ? 'hidden' : 'block'}`}>
        <Menu strokeWidth={1} size={40} className="text-white" />
      </button>
      <ConnectWalletButton className="absolute right-0 top-4 z-30 mr-4 uppercase bg-transparent rounded-none border border-white end-0" />
    </>
  )
}

export default ConnectButtonNav

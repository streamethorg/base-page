'use client'
import { ConnectWalletButton } from '@/components/ui/ConnectWalletButton'
import { Menu } from 'lucide-react'

const ConnectButtonNav = ({
  showSidebar,
  setShowSidebar,
}: {
  showSidebar: boolean
  setShowSidebar: (showSidebar: boolean) => void
}) => {
  return (
    <>
      <button
        onClick={() => setShowSidebar(!showSidebar)}
        className={`absolute top-4 z-[999999999999999] left-4 ${showSidebar ? 'hidden' : 'block'}`}>
        <Menu strokeWidth={1} size={40} className="text-white" />
      </button>
      <ConnectWalletButton className="absolute right-0 top-4 z-30 mr-4 uppercase bg-transparent rounded-none border border-white end-0" />
    </>
  )
}

export default ConnectButtonNav

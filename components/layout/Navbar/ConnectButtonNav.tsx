import { ConnectWalletButton } from '@/components/ui/ConnectWalletButton'
import { Menu } from 'lucide-react'
import { eTab } from '@/lib/types'
import Link from 'next/link'
const ConnectButtonNav = ({
  showSidebar,
}: {
  showSidebar: boolean
}) => {
  const url = new URL('http://localhost:3000/')
  url.searchParams.set('tab', eTab.main)

  return (
    <>
      <Link
        href={url.toString()}
        passHref
        scroll={false}
        className={`absolute top-4 z-[999999999999999] left-4 ${showSidebar ? 'hidden' : 'block'}`}>
        <Menu strokeWidth={1} size={40} className="text-white" />
      </Link>
      <ConnectWalletButton className="absolute right-0 top-4 z-30 mr-4 uppercase bg-transparent rounded-none border border-white end-0" />
    </>
  )
}

export default ConnectButtonNav

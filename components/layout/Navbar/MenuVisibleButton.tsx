import { eTab } from '@/lib/types'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
const MenuVisibleButton = ({ tab }: { tab: eTab }) => {
  const menuVisible = tab !== eTab.none && !!tab

  const url = new URL('http://localhost:3000/')
  url.searchParams.set('tab', tab === eTab.main ? eTab.none : eTab.main)

  return (
    <Link
      href={url.toString()}
      passHref
      scroll={false}
      className="z-30">
      {!menuVisible ? (
        <Menu
          size={30}
          strokeWidth={2}
          className="text-white text-muted-foreground"
        />
      ) : (
        <X size={30} strokeWidth={1} className="text-white" />
      )}
    </Link>
  )
}

export default MenuVisibleButton

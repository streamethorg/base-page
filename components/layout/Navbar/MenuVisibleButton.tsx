'use client'

import useSearchParams from '@/lib/hooks/useSearchParams'
import { eTab } from '@/lib/types'
import { Menu, X } from 'lucide-react'

const MenuVisibleButton = () => {
  const { searchParams, handleTermChange } = useSearchParams()
  const menuVisible = searchParams.get('tab') !== eTab.none && !!searchParams.get('tab')

  const toggleMenu = () => {
    if (!menuVisible) {
      handleTermChange([{ key: 'tab', value: eTab.main }])
      return
    }

    handleTermChange([{ key: 'tab', value: eTab.none }])
  }

  return (
    <button onClick={toggleMenu} className="z-50">
      {!menuVisible ? (
        <Menu
          size={30}
          strokeWidth={2}
          className="text-white text-muted-foreground"
        />
      ) : (
        <X size={30} strokeWidth={1} className="text-white" />
      )}
    </button>
  )
}

export default MenuVisibleButton

'use client'
import { Menu, X } from 'lucide-react'

const MenuVisibleButton = ({
  showSidebar,
  setShowSidebar,
}: {
  showSidebar: boolean
  setShowSidebar: (showSidebar: boolean) => void
}) => {
  return (
    <button
      onClick={() => setShowSidebar(!showSidebar)}
      className="z-30">
      {!showSidebar ? (
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

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
        <div className="text-white px-4 py-1 rounded-full border-2 border-white hover:bg-white hover:text-black transition-all duration-300 uppercase font-bold">
          Explore
        </div>
      ) : (
        <X size={30} strokeWidth={1} className="text-white" />
      )}
    </button>
  )
}

export default MenuVisibleButton

'use client'

import { X } from 'lucide-react'
import { eTab } from '@/lib/types'
import useSearchParams from '@/lib/hooks/useSearchParams'

const CloseNavigation = ({
  setShowSidebar,
}: {
  setShowSidebar: (showSidebar: boolean) => void
}) => {
  const { handleTermChange } = useSearchParams()

  return (
    <button
      onClick={() =>
        setShowSidebar(false) 
      }
      className="z-30">
      <X size={45} strokeWidth={1} className="text-white" />
    </button>
  )
}

export default CloseNavigation

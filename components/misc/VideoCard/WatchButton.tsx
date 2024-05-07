'use client'

import { Button } from '@/components/ui/button'

const WatchButton = () => {
  const handleClick = () => {
    // Route
  }

  return (
    <div className="flex absolute inset-0 justify-start items-end p-4 transition-opacity duration-300 md:opacity-0 hover:opacity-100">
      <Button
        onClick={() => handleClick()}
        className="transition-colors hover:text-black hover:bg-gray-300"
        variant="primary">
        WATCH NOW
      </Button>
    </div>
  )
}

export default WatchButton

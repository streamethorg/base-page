'use client'

import { ArrowLeftFromLine } from 'lucide-react'
import { useRouter } from 'next/navigation'

const BackButton = () => {
  const router = useRouter()

  const handleClick = () => {
    router.back()
  }

  return (
    <div
      onClick={() => handleClick()}
      className="flex items-center p-2 space-x-2 rounded-md cursor-pointer hover:bg-secondary-foreground">
      <ArrowLeftFromLine />
      <span>Go back</span>
    </div>
  )
}

export default BackButton

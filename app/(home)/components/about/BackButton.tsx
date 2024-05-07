'use client'

import { ArrowLeftFromLine } from 'lucide-react'
import { useRouter } from 'next/navigation'

const BackButton = () => {
  const router = useRouter()

  const handleClick = () => {
    router.back()
  }

  return (
    <div className="p-2 rounded-md cursor-pointer hover:bg-secondary-foreground">
      <ArrowLeftFromLine onClick={() => handleClick()} />
    </div>
  )
}

export default BackButton

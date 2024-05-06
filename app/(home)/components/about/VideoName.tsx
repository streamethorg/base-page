'use client'

import { IExtendedSession, eTab } from '@/lib/types'
import { useRouter } from 'next/navigation'

const VideoName = ({ session }: { session: IExtendedSession }) => {
  const router = useRouter()
  const handleClick = () => {
    router.replace(`/?tab=none&session=${session._id}`)
    setTimeout(() => {
      window.location.reload()
    }, 3000)
  }

  return (
    <h2
      onClick={handleClick}
      className="text-xl font-bold cursor-pointer md:text-2xl hover:underline">
      {session.name}
    </h2>
  )
}

export default VideoName

'use client'

import { IExtendedSession, eTab } from '@/lib/types'
import useSearchParams from '@/lib/hooks/useSearchParams'

const VideoName = ({ session }: { session: IExtendedSession }) => {
  const { handleTermChange } = useSearchParams()

  const handleClick = () => {
    handleTermChange([
      {
        key: 'session',
        value: session._id,
      },
      { key: 'tab', value: eTab.none },
    ])

    location.reload()
  }

  return (
    <h2
      onClick={() => handleClick()}
      className="text-xl font-bold cursor-pointer md:text-2xl hover:underline">
      {session.name}
    </h2>
  )
}

export default VideoName

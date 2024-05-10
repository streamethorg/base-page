'use client'

import useSearchParams from '@/lib/hooks/useSearchParams'
import BaseLogo from '@/lib/svg/BaseLogo'
import { IExtendedSession, eTab } from '@/lib/types'

const Footer = ({
  videoId,
  videoName,
}: {
  videoId: string
  videoName: string
}) => {
  const { searchParams, handleTermChange } = useSearchParams()

  const handleClick = () => {
    handleTermChange([
      {
        key: 'tab',
        value: eTab.about,
      },
      {
        key: 'session',
        value: videoId,
      },
    ])
  }

  return (
    <footer className="flex absolute bottom-0 z-10 justify-between items-center px-4 m-4 mb-8 w-full text-white">
      <div className="hidden flex-grow w-full md:block">
        <BaseLogo width={'40px'} />
      </div>
      <div className="flex justify-between w-full md:min-w-[500px]">
        <span className="font-bold">{videoName}</span>
        <button
          onClick={() => handleClick()}
          className="p-2 text-gray-300 border border-white transition-all hover:text-gray-500 hover:bg-white w-min-[60px]">
          About
        </button>
      </div>
    </footer>
  )
}

export default Footer

'use client'

import BaseLogo from '@/lib/svg/BaseLogo'
import { IExtendedSession } from '@/lib/types'

const Footer = ({ session }: { session: IExtendedSession }) => {
  const handleClick = () => {
    console.log('click')
  }

  return (
    <footer className="flex absolute bottom-0 z-10 justify-between items-center px-4 m-4 mb-8 w-full text-white">
      <div className="hidden flex-grow w-full md:block">
        <BaseLogo width={'40px'} />
      </div>
      <div className="flex justify-between w-full md:min-w-[500px]">
        <span className="font-bold">{session.name}</span>
        <button
          onClick={() => handleClick()}
          className="p-2 hover:bg-white border border-white text-gray-300 transition-all hover:text-gray-500 w-[15%] md:w-min">
          About
        </button>
      </div>
    </footer>
  )
}

export default Footer

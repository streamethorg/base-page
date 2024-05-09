import Thumbnail from '@/components/misc/VideoCard/thumbnail'
import { Dot } from 'lucide-react'
import { formatDate } from '@/lib/utils/time'
import Link from 'next/link'
import { IExtendedStage } from '@/lib/types'

const LivestreamCard = ({
  livestream,
  link,
}: {
  livestream: IExtendedStage
  link: string
}) => {
  return (
    <Link
      href={link}
      key={livestream.name}
      className="flex relative flex-col w-full min-h-full uppercase rounded-xl">
      <Thumbnail imageUrl={livestream.thumbnail} />

      <div className="flex absolute justify-between items-start w-full h-full bg-black bg-opacity-50">
        <div
          className={`rounded p-1 mt-1 lg:p-2 shadow-none lg:shadow-none `}>
          <p
            className={`px-2 uppercase line-clamp-2 overflow-hidden text-white font-bold  hover:underline sm:text-2xl md:text-lg xl:text-xl`}>
            {livestream.name}
          </p>
          <p className="flex items-center text-white">
            <Dot className="w-10 h-10" />
            {formatDate(
              new Date(livestream.streamDate as string),
              'MMM, YYYY'
            )}
          </p>
        </div>
      </div>
    </Link>
  )
}

export default LivestreamCard

import { fetchStages } from '@/lib/services/stageService'
import LivestreamCard from '@/components/misc/VideoCard/LivestreamCard'
import React from 'react'
import { VideoCardSkeletonMobile } from '@/components/misc/VideoCard/VideoCardSkeleton'
import { Podcast } from 'lucide-react'

const UpcomingStreams = async ({
  organizationId,
  currentStreamId,
}: {
  organizationId: string
  currentStreamId?: string
}) => {
  let livestreams = await fetchStages({
    organizationId,
  })

  livestreams = livestreams.filter((livestream) => {
    // filter by streams in the future or happening today
    return livestream._id !== currentStreamId
  })

  livestreams = livestreams.filter((livestream) => {
    return livestream.published
  })

  return (
    <>
      <h1 className="text-xl font-bold">Upcoming Streams</h1>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {livestreams.map((livestream) => (
          <React.Fragment key={livestream?._id?.toString()}>
            <div>
              <LivestreamCard
                name={livestream.name}
                date={livestream.streamDate as string}
                thumbnail={''}
                link={`/livestream?stage=${livestream?._id?.toString()}`}
              />
            </div>
          </React.Fragment>
        ))}
      </div>
      {livestreams.length === 0 && (
        <div className="flex flex-row justify-center items-center p-4 space-x-4 text-white rounded-xl">
          <Podcast size={20} />
          <p>No scheduled livestreams</p>
        </div>
      )}
    </>
  )
}

export const UpcomingStreamsLoading = () => (
  <>
    <div className="w-1/4 h-6 rounded animate-pulse md:hidden bg-secondary-foreground"></div>
    <div className="grid grid-rows-3 gap-4 md:hidden md:grid-cols-3 md:m-0">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="block md:hidden">
          <VideoCardSkeletonMobile />
        </div>
      ))}
    </div>
  </>
)

export default UpcomingStreams

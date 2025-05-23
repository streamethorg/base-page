import { fetchStages } from '@/lib/services/stageService'
import LivestreamCard from '@/components/video-ui/LivestreamCard'
import React from 'react'
import VideoCardSkeleton, {
  VideoCardSkeletonMobile,
} from '@/components/video-ui/VideoCardSkeleton'
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
    const now = new Date()
    const startDate = new Date(livestream?.streamDate || '')
    return startDate >= now
  })

  return (
    <div className="flex flex-col">
      <p className="text-xl font-bold my-2">Upcoming Streams</p>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {livestreams.map((livestream) => (
          <React.Fragment key={livestream?._id?.toString()}>
            <div>
              <LivestreamCard
                livestream={livestream}
                link={`/livestream/${livestream?._id?.toString()}`}
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
    </div>
  )
}

export const UpcomingStreamsLoading = () => (
  <>
    <div className="w-1/4 h-6 rounded animate-pulse md:hidden bg-secondary-foreground"></div>
    <div className="grid grid-rows-3 gap-4 md:grid-rows-1 md:m-0">
      {Array.from({ length: 2 }).map((_, index) => (
        <>
          <div key={index} className="md:hidden">
            <VideoCardSkeletonMobile />
          </div>
          <div key={index} className="hidden md:block">
            <VideoCardSkeleton />
          </div>
        </>
      ))}
    </div>
  </>
)

export default UpcomingStreams

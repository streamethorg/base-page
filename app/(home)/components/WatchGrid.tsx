import { fetchAllSessions } from '@/lib/data'
import Link from 'next/link'
import VideoCardSkeleton from '@/components/misc/VideoCard/VideoCardSkeleton'
import Videos from '@/components/misc/Videos'
import { Video } from 'lucide-react'
import { organizationSlug } from '@/lib/utils'

const WatchGrid = async () => {
  const videos = (
    await fetchAllSessions({
      organizationSlug: organizationSlug,
      onlyVideos: true,
      // published: true,
      limit: 6,
    })
  ).sessions
  if (!videos) return null
  return (
    <div className="w-full">
      <div className="flex justify-between items-center pb-4">
        <h1 className="text-xl font-bold">Watch More</h1>
      </div>
      <Videos videos={videos} maxVideos={6} />
      {videos.length === 0 && (
        <div className="flex flex-row justify-center items-center p-4 space-x-4 rounded-xl bg-secondary">
          <Video size={20} />
          <p>No videos uploaded</p>
        </div>
      )}
    </div>
  )
}

export const WatchGridLoading = () => (
  <>
    <div className="flex justify-between items-center">
      <div className="w-1/4 h-6 rounded bg-secondary-foreground"></div>
      <div className="w-1/5 h-4 rounded bg-secondary-foreground"></div>
    </div>
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <VideoCardSkeleton key={index} />
      ))}
    </div>
  </>
)

export default WatchGrid

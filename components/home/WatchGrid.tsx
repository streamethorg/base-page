import { fetchAllSessions } from '@/lib/data'
import { Video } from 'lucide-react'
import { organizationSlug } from '@/lib/utils'
import VideoCardWithMenu from '@/components/video-ui/VideoCardWithMenu'
import VideoCardSkeleton from '@/components/video-ui/VideoCardSkeleton'

const WatchGrid = async () => {
  const maxVideos = 6

  const videos = (
    await fetchAllSessions({
      organizationSlug: organizationSlug,
      onlyVideos: true,
      // published: true,
      limit: maxVideos,
    })
  ).sessions
  if (!videos) return null

  return (
    <div className="w-full">
      <div className="flex justify-between items-center pb-4">
        <h1 className="text-xl font-bold">Watch More</h1>
      </div>
      <div className="bg-transparent border-none lg:w-full max-w-screen">
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-8 gap-x-4`}>
          {videos.map((video, index) =>
            ({ maxVideos }) &&
            maxVideos &&
            index > maxVideos ? null : (
              <div
                key={video._id}
                className={`w-full h-full border-none flex-initial`}>
                <VideoCardWithMenu
                  session={video}
                  link={`/?tab=about&session=${video._id.toString()}`}
                />
              </div>
            )
          )}
        </div>
      </div>
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

import { IExtendedSession } from '@/lib/types'
import VideoCardWithMenu from './VideoCard/VideoCardWithMenu'
import { Suspense } from 'react'
import {
  Card,
  CardHeader,
  CardDescription,
} from '@/components/ui/card'
import { headers } from 'next/headers'
export default async function VideoGrid({
  videos,
  maxVideos,
}: {
  videos: IExtendedSession[]

  maxVideos?: number
}) {
  if (!videos) return null
  const headerList = headers()
  const pathname = headerList.get('x-current-path')

  return (
    <div className="bg-transparent border-none lg:w-full max-w-screen">
      <div
        className={`grid grid-cols-1 lg:grid-cols-2 gap-8 gap-x-4`}>
        {videos.map((video, index) =>
          ({ maxVideos }) && maxVideos && index > maxVideos ? null : (
            <div
              key={video._id}
              className={`w-full h-full border-none flex-initial`}>
              <Suspense fallback={<Loading index={index} />}>
                <VideoCardWithMenu
                  session={video}
                  link={`${pathname}?tab=about&session=${video._id.toString()}`}
                />
              </Suspense>
            </div>
          )
        )}
      </div>
    </div>
  )
}

const Loading = ({ index }: { index: number }) => {
  return (
    <Card key={index} className="border-none shadow-none">
      <div className="min-h-full uppercase rounded-xl">
        <div className="w-full animate-pulse bg-secondary aspect-video"></div>
        <CardHeader className="px-2 mt-1 bg-opacity-10 rounded lg:p-0 lg:py-2 bg-secondary-foreground">
          <CardDescription className="flex flex-col space-y-2">
            <div className="w-full h-5 animate-pulse bg-secondary" />
            <div className="w-1/2 h-5 animate-pulse bg-secondary" />
          </CardDescription>
        </CardHeader>
      </div>
    </Card>
  )
}

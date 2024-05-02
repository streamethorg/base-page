import PlayerWithControls from '@/components/ui/Player'
import { getVideoUrlAction } from '@/lib/actions/livepeer'
import { IExtendedSession } from '@/lib/types'
import { notFound } from 'next/navigation'
import React from 'react'

const VideoPlayer = async ({
  video,
}: {
  video: IExtendedSession
}) => {
  const videoUrl = await getVideoUrlAction(
    video?.assetId,
    video?.playbackId
  )
  if (!video || !videoUrl) return notFound()
  return (
    <PlayerWithControls
      src={[
        {
          src: videoUrl as `${string}m3u8`,
          width: 1920,
          height: 1080,
          mime: 'application/vnd.apple.mpegurl',
          type: 'hls',
        },
      ]}
    />
  )
}

export default VideoPlayer

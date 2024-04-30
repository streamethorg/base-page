'use server'

import { Livepeer } from 'livepeer'
import { IExtendedStage } from '@/lib/types'
import { PlayerWithControls } from '@/components/ui/Player'
import { buildPlaybackUrl } from '@/lib/utils/utils'
import { notFound } from 'next/navigation'
import { Stream } from 'livepeer/dist/models/components'

const Player = async ({
  stage,
  streamId,
}: {
  stage?: IExtendedStage
  streamId?: string
}) => {
  const livepeer = new Livepeer({
    apiKey: process.env.LIVEPEER_API_KEY,
  })

  let stream: Stream | undefined = undefined
  stream = (
    await livepeer.stream.get(
      stage?.streamSettings?.streamId || streamId || ''
    )
  ).stream

  if (stage) {
    const timeLeft =
      new Date(stage.streamDate as string).getTime() - Date.now()
  }

  if (!stream || !stream.playbackId) {
    return notFound()
  }

  return (
    <div className="flex flex-col w-full h-full">
      <div className="relative w-full h-full">
        <PlayerWithControls
          src={[
            {
              src: buildPlaybackUrl(
                stream!.playbackId!
              ) as `${string}m3u8`,
              width: 1920,
              height: 1080,
              mime: 'application/vnd.apple.mpegurl',
              type: 'hls',
            },
          ]}
        />
      </div>
    </div>
  )
}

export default Player

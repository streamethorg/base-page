import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Play } from 'lucide-react'
import Image from 'next/image'
import Counter from '@/components/ui/Counter'
import { cn } from '@/lib/utils'
import { fetchOrganizationStages } from '@/lib/services/stageService'
import { fetchSession } from '@/lib/services/sessionService'
import { fetchAllSessions } from '@/lib/data'
import { getPlaybackInfo } from '@/lib/actions/livepeer'
import { organizationId, organizationSlug } from '@/lib/utils'
import { IExtendedSession } from '@/lib/types'
import PlayerWithControls from '@/components/ui/Player'

const PlayerArea = async ({ sessionId }: { sessionId?: string }) => {
  const allStreams = await fetchOrganizationStages({ organizationId })
  const now = Date.now()
  let stream = allStreams.find(
    (stream) => stream.published && stream.streamSettings?.isActive
  )
  let session

  if (!stream) {
    stream = allStreams.find(
      (stream) =>
        stream.published &&
        stream.streamDate &&
        new Date(stream.streamDate).getTime() > now
    )
  }
  let playbackInfo = null
  let timeLeft = 0
  if (
    stream &&
    stream?.streamSettings?.playbackId &&
    stream.streamDate
  ) {
    timeLeft = new Date(stream.streamDate).getTime() - now
    playbackInfo = await getPlaybackInfo(
      stream.streamSettings.playbackId
    )
  } else {
    session = (
      await fetchAllSessions({
        organizationSlug,
        onlyVideos: true,
        limit: 1,
      })
    ).sessions[0]

    if (session && session.playbackId) {
      playbackInfo = await getPlaybackInfo(session.playbackId)
    }
  }
  if (!playbackInfo) return null

  return (
    <div className="flex absolute top-0 flex-col justify-center items-center mx-auto w-screen h-screen bg-black">
      {timeLeft > 0 ? (
        <Counter timeToStart={timeLeft} />
      ) : (
        <Dialog>
          <DialogTrigger className="absolute z-50 w-full h-full">
            <div className="flex justify-center items-center mx-auto h-full cursor-pointer w-fit">
              <Play
                fill="#fff"
                className="p-2 w-14 h-14 text-white rounded-full bg-base-blue"
              />
            </div>
          </DialogTrigger>
          <DialogContent className="!p-0 aspect-video !rounded-xl w-full max-w-[1300px]">
            <PlayerWithControls
              src={[
                {
                  src: playbackInfo.meta.source[0]
                    .url as `${string}m3u8`,
                  width: 1920,
                  height: 1080,
                  mime: 'application/vnd.apple.mpegurl',
                  type: 'hls',
                },
              ]}
            />
          </DialogContent>
        </Dialog>
      )}
      <div
        className={cn(
          'overflow-hidden absolute top-0 w-full h-full',
          timeLeft > 0 && 'blur'
        )}>
        <Image
          src={stream ? stream?.thumbnail : session?.coverImage}
          priority
          alt="Video thumbnail"
          layout="fill"
          style={{ objectFit: 'cover' }}
        />
      </div>
    </div>
  )
}

export default PlayerArea

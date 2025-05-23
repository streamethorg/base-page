import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Play } from 'lucide-react'
import Image from 'next/image'
import Counter from '@/components/ui/Counter'
import { cn, organizationId } from '@/lib/utils'
import PlayerWithControls from '@/components/ui/Player'
import { fetchVideoDetails, getStreamAndPlaybackInfo } from '@/lib/utils/utils'

const PlayerArea = async ({ sessionId }: { sessionId?: string }) => {
  // Get stream and playback information
  const { stream, session, timeLeft } =
    await getStreamAndPlaybackInfo(organizationId)

  const videoDetails = await fetchVideoDetails(
    stream?._id ? 'livestream' : 'recording',
    stream?._id,
    session?._id
  )

  if (!videoDetails) return null

  const thumbnail = session?.coverImage || stream?.thumbnail || ''

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
                  src: videoDetails.videoSrc as `${string}m3u8`,
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
          src={thumbnail}
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

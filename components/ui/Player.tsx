'use client'
import { cn } from '@/lib/utils/utils'
import {
  ClipIcon,
  EnterFullscreenIcon,
  ExitFullscreenIcon,
  LoadingIcon,
  MuteIcon,
  PauseIcon,
  PictureInPictureIcon,
  PlayIcon,
  SettingsIcon,
  UnmuteIcon,
} from '@livepeer/react/assets'
import * as Player from '@livepeer/react/player'
import * as Popover from '@radix-ui/react-popover'
import { ClipPayload } from 'livepeer/dist/models/components'
import { CheckIcon, ChevronDownIcon, XIcon } from 'lucide-react'
import React, { useCallback, useEffect, useTransition } from 'react'
import { toast } from 'sonner'

import { Src } from '@livepeer/react'

export function PlayerWithControls(props: { src: Src[] | null }) {
  if (!props.src || !props.src?.[0].src) {
    return (
      <PlayerLoading
        title="Invalid source"
        description="We could not fetch valid playback information for the playback ID you provided. Please check and try again."
      />
    )
  }

  return (
    <Player.Root src={props.src}>
      <Player.Container className="md:rounded-xl bg-gradient-to-b from-black to-[#6426EF]  h-full w-full overflow-hidden  outline-none transition">
        <Player.Video
          title="Live stream"
          className={cn('h-full w-full transition')}
        />

        <Player.LoadingIndicator className="w-full relative h-full bg-black/50 backdrop-blur data-[visible=true]:animate-in data-[visible=false]:animate-out data-[visible=false]:fade-out-0 data-[visible=true]:fade-in-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <LoadingIcon className="w-8 h-8 animate-spin" />
          </div>
          <PlayerLoading />
        </Player.LoadingIndicator>

        <Player.ErrorIndicator
          matcher="all"
          className="absolute select-none inset-0 text-center bg-black/40 backdrop-blur-lg flex flex-col items-center justify-center gap-4 duration-1000 data-[visible=true]:animate-in data-[visible=false]:animate-out data-[visible=false]:fade-out-0 data-[visible=true]:fade-in-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <LoadingIcon className="w-8 h-8 animate-spin" />
          </div>
          <PlayerLoading />
        </Player.ErrorIndicator>

        <Player.ErrorIndicator
          matcher="offline"
          className="absolute select-none animate-in fade-in-0 inset-0 text-center bg-black/40 backdrop-blur-lg flex flex-col items-center justify-center gap-4 duration-1000 data-[visible=true]:animate-in data-[visible=false]:animate-out data-[visible=false]:fade-out-0 data-[visible=true]:fade-in-0">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <div className="text-lg font-bold sm:text-2xl">
                Stream is offline
              </div>
              <div className="text-xs text-gray-100 sm:text-sm">
                Playback will start automatically once the stream has
                started
              </div>
            </div>
            <LoadingIcon className="mx-auto w-6 h-6 animate-spin md:w-8 md:h-8" />
          </div>
        </Player.ErrorIndicator>

        <Player.ErrorIndicator
          matcher="access-control"
          className="absolute select-none inset-0 text-center bg-black/40 backdrop-blur-lg flex flex-col items-center justify-center gap-4 duration-1000 data-[visible=true]:animate-in data-[visible=false]:animate-out data-[visible=false]:fade-out-0 data-[visible=true]:fade-in-0">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <div className="text-lg font-bold sm:text-2xl">
                Stream is private
              </div>
              <div className="text-xs text-gray-100 sm:text-sm">
                It looks like you do not have permission to view this
                content
              </div>
            </div>
            <LoadingIcon className="mx-auto w-6 h-6 animate-spin md:w-8 md:h-8" />
          </div>
        </Player.ErrorIndicator>

        <Player.Controls className="bg-gradient-to-b gap-1 px-3 md:px-3 py-2 flex-col-reverse flex from-black/5 via-80% via-black/30 duration-1000 to-black/60 data-[visible=true]:animate-in data-[visible=false]:animate-out data-[visible=false]:fade-out-0 data-[visible=true]:fade-in-0">
          <div className="flex gap-4 justify-between">
            <div className="flex flex-1 gap-3 items-center">
              <Player.PlayPauseTrigger className="flex-shrink-0 w-6 h-6 transition hover:scale-110">
                <Player.PlayingIndicator asChild matcher={false}>
                  <PlayIcon className="w-full h-full text-white" />
                </Player.PlayingIndicator>
                <Player.PlayingIndicator asChild>
                  <PauseIcon className="w-full h-full text-white" />
                </Player.PlayingIndicator>
              </Player.PlayPauseTrigger>

              <Player.LiveIndicator className="flex gap-2 items-center">
                <div className="w-1.5 h-1.5 text-white bg-red-600 rounded-full" />
                <span className="text-sm text-white select-none">
                  LIVE
                </span>
              </Player.LiveIndicator>
              <Player.LiveIndicator
                matcher={false}
                className="flex gap-2 items-center">
                <Player.Time className="text-sm tabular-nums text-white select-none" />
              </Player.LiveIndicator>

              <Player.MuteTrigger className="flex-shrink-0 w-6 h-6 transition hover:scale-110">
                <Player.VolumeIndicator asChild matcher={false}>
                  <MuteIcon className="w-full h-full text-white" />
                </Player.VolumeIndicator>
                <Player.VolumeIndicator asChild matcher={true}>
                  <UnmuteIcon className="w-full h-full text-white" />
                </Player.VolumeIndicator>
              </Player.MuteTrigger>
              <Player.Volume className="flex relative flex-1 items-center mr-1 h-5 cursor-pointer select-none group touch-none max-w-[120px]">
                <Player.Track className="relative rounded-full transition bg-white/30 grow h-[2px] md:h-[3px] group-hover:h-[3px] group-hover:md:h-[4px]">
                  <Player.Range className="absolute h-full text-white bg-white rounded-full" />
                </Player.Track>
                <Player.Thumb className="block w-3 h-3 text-white bg-white rounded-full transition group-hover:scale-110" />
              </Player.Volume>
            </div>
            <div className="flex gap-2.5 justify-end items-center sm:flex-1 md:flex-[1.5]">
              <Player.FullscreenIndicator matcher={false} asChild>
                <Settings className="flex-shrink-0 w-6 h-6 text-white transition" />
              </Player.FullscreenIndicator>
              {/* <Clip className="flex justify-center items-center w-6 h-6" /> */}

              <Player.PictureInPictureTrigger className="flex-shrink-0 w-6 h-6 transition hover:scale-110">
                <PictureInPictureIcon className="w-full h-full text-white" />
              </Player.PictureInPictureTrigger>

              <Player.FullscreenTrigger className="flex-shrink-0 w-6 h-6 transition hover:scale-110">
                <Player.FullscreenIndicator asChild>
                  <ExitFullscreenIcon className="w-full h-full text-white" />
                </Player.FullscreenIndicator>

                <Player.FullscreenIndicator matcher={false} asChild>
                  <EnterFullscreenIcon className="w-full h-full text-white" />
                </Player.FullscreenIndicator>
              </Player.FullscreenTrigger>
            </div>
          </div>
          <Player.Seek className="flex relative items-center w-full h-5 cursor-pointer select-none group touch-none">
            <Player.Track className="relative rounded-full transition bg-white/30 grow h-[2px] md:h-[3px] group-hover:h-[3px] group-hover:md:h-[4px]">
              <Player.SeekBuffer className="absolute h-full rounded-full transition duration-1000 bg-black/30" />
              <Player.Range className="absolute h-full bg-white rounded-full" />
            </Player.Track>
            <Player.Thumb className="block w-3 h-3 bg-white rounded-full transition group-hover:scale-110" />
          </Player.Seek>
        </Player.Controls>
      </Player.Container>
    </Player.Root>
  )
}

export default PlayerWithControls

export const PlayerLoading = ({
  title,
  description,
}: {
  title?: React.ReactNode
  description?: React.ReactNode
}) => (
  <div className="flex overflow-hidden relative flex-col-reverse gap-3 py-2 px-3 w-full rounded-sm aspect-video bg-white/10">
    <div className="flex justify-between">
      <div className="flex gap-2 items-center">
        <div className="overflow-hidden w-6 h-6 rounded-lg animate-pulse bg-white/5" />
        <div className="overflow-hidden w-16 h-6 rounded-lg animate-pulse md:w-20 md:h-7 bg-white/5" />
      </div>

      <div className="flex gap-2 items-center">
        <div className="overflow-hidden w-6 h-6 rounded-lg animate-pulse bg-white/5" />
        <div className="overflow-hidden w-6 h-6 rounded-lg animate-pulse bg-white/5" />
      </div>
    </div>
    <div className="overflow-hidden w-full h-2 rounded-lg animate-pulse bg-white/5" />

    {title && (
      <div className="flex absolute inset-10 flex-col gap-1 justify-center items-center text-center">
        <span className="text-lg font-medium text-white">
          {title}
        </span>
        {description && (
          <span className="text-sm text-white/80">{description}</span>
        )}
      </div>
    )}
  </div>
)

// function Clip({ className }: { className?: string }) {
//   const [isPending, startTransition] = useTransition()

//   const createClipComposed = useCallback((opts: ClipPayload) => {
//     startTransition(async () => {
//       const result = await createClip(opts)

//       if (result.success) {
//         toast.success(
//           <span>
//             {
//               'You have created a new clip - in a few minutes, you will be able to view it at '
//             }
//             <a
//               href={`/?v=${result.playbackId}`}
//               target="_blank"
//               rel="noreferrer"
//               className="font-semibold">
//               this link
//             </a>
//             {'.'}
//           </span>
//         )
//       } else {
//         toast.error(
//           'Failed to create a clip. Please try again in a few seconds.'
//         )
//       }
//     })
//   }, [])

//   return (
//     <Player.LiveIndicator className={className} asChild>
//       <Player.ClipTrigger
//         onClip={createClipComposed}
//         disabled={isPending}
//         className="flex-shrink-0 transition hover:scale-110">
//         {isPending ? (
//           <LoadingIcon className="w-full h-full animate-spin" />
//         ) : (
//           <ClipIcon className="w-full h-full" />
//         )}
//       </Player.ClipTrigger>
//     </Player.LiveIndicator>
//   )
// }

export const Settings = React.forwardRef(function Search(
  { className }: { className?: string },
  ref: React.Ref<HTMLButtonElement> | undefined
) {
  return (
    <Popover.Root>
      <Popover.Trigger ref={ref} asChild>
        <button
          type="button"
          className={className}
          aria-label="Playback settings"
          onClick={(e) => {
            console.log(e)
            e.stopPropagation()
          }}>
          <SettingsIcon />
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className=" w-60 rounded-md text-white bg-black/50 border border-white/50 backdrop-blur-md p-3 shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
          side="top"
          alignOffset={-70}
          align="end"
          onClick={(e) => e.stopPropagation()}>
          <div className="flex flex-col gap-2">
            <p className="mb-1 text-sm font-medium text-white/90">
              Settings
            </p>
            <Player.LiveIndicator
              matcher={false}
              className="flex flex-col gap-2">
              <label
                className="text-xs font-medium text-white/90"
                htmlFor="speedSelect">
                Playback speed
              </label>
              <Player.RateSelect name="speedSelect">
                <Player.SelectTrigger
                  className="inline-flex gap-1 justify-between items-center px-1 h-7 text-xs leading-none rounded-sm outline-none outline-1 outline-white/50"
                  aria-label="Playback speed">
                  <Player.SelectValue placeholder="Select a speed..." />
                  <Player.SelectIcon>
                    <ChevronDownIcon className="w-4 h-4" />
                  </Player.SelectIcon>
                </Player.SelectTrigger>
                <Player.SelectPortal>
                  <Player.SelectContent className="overflow-hidden bg-white rounded-sm border border-white/50">
                    <Player.SelectViewport className="p-1">
                      <Player.SelectGroup>
                        <RateSelectItem value={0.5}>
                          0.5x
                        </RateSelectItem>
                        <RateSelectItem value={0.75}>
                          0.75x
                        </RateSelectItem>
                        <RateSelectItem value={1}>
                          1x (normal)
                        </RateSelectItem>
                        <RateSelectItem value={1.25}>
                          1.25x
                        </RateSelectItem>
                        <RateSelectItem value={1.5}>
                          1.5x
                        </RateSelectItem>
                        <RateSelectItem value={1.75}>
                          1.75x
                        </RateSelectItem>
                        <RateSelectItem value={2}>2x</RateSelectItem>
                      </Player.SelectGroup>
                    </Player.SelectViewport>
                  </Player.SelectContent>
                </Player.SelectPortal>
              </Player.RateSelect>
            </Player.LiveIndicator>
            <div className="flex flex-col gap-2">
              <label
                className="text-xs font-medium text-white/90"
                htmlFor="qualitySelect">
                Quality
              </label>
              <Player.VideoQualitySelect
                name="qualitySelect"
                defaultValue="1.0">
                <Player.SelectTrigger
                  className="inline-flex gap-1 justify-between items-center px-1 h-7 text-xs leading-none rounded-sm outline-none outline-1 outline-white/50"
                  aria-label="Playback quality">
                  <Player.SelectValue placeholder="Select a quality..." />
                  <Player.SelectIcon>
                    <ChevronDownIcon className="w-4 h-4" />
                  </Player.SelectIcon>
                </Player.SelectTrigger>
                <Player.SelectPortal>
                  <Player.SelectContent className="overflow-hidden bg-white rounded-sm">
                    <Player.SelectViewport className="p-[5px]">
                      <Player.SelectGroup>
                        <VideoQualitySelectItem value="auto">
                          Auto (HD+)
                        </VideoQualitySelectItem>
                        <VideoQualitySelectItem value="1080p">
                          1080p (HD)
                        </VideoQualitySelectItem>
                        <VideoQualitySelectItem value="720p">
                          720p
                        </VideoQualitySelectItem>
                        <VideoQualitySelectItem value="480p">
                          480p
                        </VideoQualitySelectItem>
                        <VideoQualitySelectItem value="360p">
                          360p
                        </VideoQualitySelectItem>
                      </Player.SelectGroup>
                    </Player.SelectViewport>
                  </Player.SelectContent>
                </Player.SelectPortal>
              </Player.VideoQualitySelect>
            </div>
          </div>
          <Popover.Close
            className="inline-flex absolute top-2.5 right-2.5 justify-center items-center w-5 h-5 rounded-full outline-none"
            aria-label="Close">
            <XIcon />
          </Popover.Close>
          <Popover.Arrow className="fill-white/50" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
})

export const RateSelectItem = React.forwardRef<
  HTMLDivElement,
  Player.RateSelectItemProps
>(function RateSelectItem(
  { children, className, ...props },
  forwardedRef
) {
  return (
    <Player.RateSelectItem
      className={cn(
        'text-xs leading-none rounded-sm flex items-center h-7 pr-[35px] pl-[25px] relative select-none data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-white/20',
        className
      )}
      {...props}
      ref={forwardedRef}>
      <Player.SelectItemText>{children}</Player.SelectItemText>
      <Player.SelectItemIndicator className="inline-flex absolute left-0 justify-center items-center w-[25px]">
        <CheckIcon className="w-4 h-4" />
      </Player.SelectItemIndicator>
    </Player.RateSelectItem>
  )
})

export const VideoQualitySelectItem = React.forwardRef<
  HTMLDivElement,
  Player.VideoQualitySelectItemProps
>(function VideoQualitySelectItem(
  { children, className, ...props },
  forwardedRef
) {
  return (
    <Player.VideoQualitySelectItem
      className={cn(
        'text-xs leading-none rounded-sm flex items-center h-7 pr-[35px] pl-[25px] relative select-none data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-white/20',
        className
      )}
      {...props}
      ref={forwardedRef}>
      <Player.SelectItemText>{children}</Player.SelectItemText>
      <Player.SelectItemIndicator className="inline-flex absolute left-0 justify-center items-center w-[25px]">
        <CheckIcon className="w-4 h-4" />
      </Player.SelectItemIndicator>
    </Player.VideoQualitySelectItem>
  )
})

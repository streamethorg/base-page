import Counter from '@/components/ui/Counter'
import { Play } from 'lucide-react'
import { ImageResponse } from 'next/og'

// Image metadata
export const size = {
  width: 1200,
  height: 630,
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get('title') || 'Default Title'
  const thumbnail = searchParams.get('thumbnail') || ''
  const timeLeft = searchParams.get('timeLeft') || ''
  const number = Math.floor(Number(timeLeft) / 1000)
  const lable = 'days'
  return new ImageResponse(
    (
      <div
        style={{
          backgroundImage: `url(${thumbnail})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: size.width,
          height: size.height,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'black',
          color: 'white',
          fontSize: 60,
          fontWeight: 'bold',
          padding: '20px',
          textAlign: 'center',
        }}>
        <div tw="flex z-50 flex-row justify-between items-center md:p-0">
          {timeLeft === '0' ? (
            <div tw="flex flex-col justify-center items-center w-full backdrop-blur-sm bg-black/70 md:rounded-xl aspect-video md:w-[500px]">
              <div tw="text-2xl text-white uppercase mt-4">
                Stream will start in
              </div>
              <div tw="flex flex-row justify-center items-center m-8 space-x-2 w-full ">
                <div tw="flex flex-col justify-between items-center p-2 text-black bg-white bg-opacity-70 rounded-lg h-full">
                  <span tw="text-xl font-black md:text-6xl">
                    {Math.floor(number / 86400)}
                  </span>
                  <span tw="md:text-xl text">{lable}</span>
                </div>
                <span tw="text-4xl text-white">:</span>
                <div tw="flex flex-col justify-between items-center p-2 text-black bg-white bg-opacity-70 rounded-lg">
                  <span tw="text-xl font-black md:text-6xl">
                    {Math.floor((number % 86400) / 3600)}
                  </span>
                  <span tw="md:text-xl text">{lable}</span>
                </div>
                <span tw="text-4xl text-white">:</span>
                <div tw="flex flex-col justify-between items-center p-2 text-black bg-white bg-opacity-70 rounded-lg">
                  <span tw="text-xl font-black md:text-6xl">
                    {Math.floor((number % 3600) / 60)}
                  </span>
                  <span tw="md:text-xl text">{lable}</span>
                </div>
                <span tw="text-4xl text-white">:</span>
                <div tw="flex flex-col justify-between items-center p-2 text-black bg-white bg-opacity-70 rounded-lg">
                  <span tw="text-xl font-black md:text-6xl">
                    {number % 60}
                  </span>
                  <span tw="md:text-xl text">{lable}</span>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <Play
                fill="#fff"
                className="p-2 w-14 h-14 text-white rounded-full bg-base-blue"
              />
            </div>
          )}
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}

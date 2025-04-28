'use client'

import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/react'
import SiweContext from './SiweContext'
import { sdk } from '@farcaster/frame-sdk'
import { useEffect, useState } from 'react'
const GeneralContext = ({ children }: { children: any }) => {

  const [isReady, setIsReady] = useState(false)
  useEffect(() => {
    sdk.actions.ready().then(() => {
      setIsReady(true)
    })
  }, [])
  return (
    <SiweContext>
      <Analytics />
      <SpeedInsights />
      {isReady ? children : <div>Loading...</div>}
    </SiweContext>
  )
}

export default GeneralContext

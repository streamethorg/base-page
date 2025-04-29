'use client'
import { Button } from '@/components/ui/button'
import { sdk } from '@farcaster/frame-sdk'
import { useEffect } from 'react'
import { useState } from 'react'

const AddFrameButton = () => {
  const [isFirstTimeLoad, setIsFirstTimeLoad] = useState(true)

  useEffect(() => {
    if (isFirstTimeLoad) {
      sdk.actions.addFrame().finally(() => {
        setIsFirstTimeLoad(false)
      })
    }
  }, [])

  const handleAddFrame = async () => {
    const frame = await sdk.actions.addFrame()
    console.log(frame)
  }

  return <Button onClick={handleAddFrame}>Add Frame</Button>
}

export default AddFrameButton

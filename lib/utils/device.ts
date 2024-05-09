import { headers } from 'next/headers'

const Device = (): boolean => {
  const device = headers().get('user-agent')
  const isMobile = device?.match(
    /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
  )

  return !!isMobile
}

export default Device

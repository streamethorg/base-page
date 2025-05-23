'use server'
import WatchGrid, { WatchGridLoading } from './WatchGrid'
import { Suspense } from 'react'
import UpcomingStreams, {
  UpcomingStreamsLoading,
} from './UpcomingStreams'
import { organizationId } from '@/lib/utils'
const MainContent = () => {
  return (
    <div className="flex flex-col text-white space-y-4 md:px-2">
      <Suspense fallback={<UpcomingStreamsLoading />}>
        <UpcomingStreams organizationId={organizationId} />
      </Suspense>
      <Suspense fallback={<WatchGridLoading />}>
        <WatchGrid />
      </Suspense>
    </div>
  )
}

export default MainContent

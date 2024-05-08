import { Button } from '@/components/ui/button'
import Link from 'next/link'

const WatchButton = ({ sessionId }: { sessionId: string }) => {
  return (
    <Link
      href={`/watch?session=${sessionId}`}
      className="absolute z-50 h-fit bottom-0 p-4 transition-opacity duration-300 md:opacity-0 hover:opacity-100">
      <Button
        className="transition-colors hover:text-black hover:bg-gray-300"
        variant="primary">
        WATCH NOW
      </Button>
    </Link>
  )
}

export default WatchButton

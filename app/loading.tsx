export default function Loading() {
  return (
    <div className="flex flex-col gap-4 mx-auto w-full h-screen bg-gray-500">
      <div className="flex flex-col w-full h-full animate-pulse md:p-4">
        <div className="w-full bg-secondary-foreground aspect-video"></div>
        <div className="px-4 mt-4 space-y-2 w-full md:px-0">
          <div className="w-3/4 h-6 rounded bg-secondary-foreground"></div>
          <div className="w-full h-4 rounded bg-secondary-foreground"></div>
          <div className="w-1/4 h-4 rounded bg-secondary-foreground"></div>
        </div>
      </div>
    </div>
  )
}

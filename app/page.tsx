import Slides from "@/app/components/slides"
import * as React from "react"

const Page = () => {
  return (
    <div className="h-full w-full p-6">
      <React.Suspense>
        <Slides />
      </React.Suspense>
    </div>
  )
}

export default Page

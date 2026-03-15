import Slides from "@/app/slides"
import * as React from "react"

const Page = () => {
  return (
    <div className="h-full w-full p-10">
      <React.Suspense>
        <Slides />
      </React.Suspense>
    </div>
  )
}

export default Page

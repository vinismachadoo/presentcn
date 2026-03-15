"use client"

import {
  Presentation,
  PresentationContent,
  PresentationControls,
  PresentationProvider,
  PresentationSlide,
} from "@/registry/presentation"

const SlideSlide1 = () => {
  return (
    <PresentationSlide>
      <h1 className="text-5xl font-bold">Slide 1</h1>
    </PresentationSlide>
  )
}

const SlideSlide2 = () => {
  return (
    <PresentationSlide>
      <h1 className="text-5xl font-bold">Slide 2</h1>
    </PresentationSlide>
  )
}

const SlideSlide3 = () => {
  return (
    <PresentationSlide>
      <h1 className="text-5xl font-bold">Slide 3</h1>
    </PresentationSlide>
  )
}

const Slides = () => {
  return (
    <PresentationProvider>
      <Presentation>
        <PresentationContent>
          <SlideSlide1 />
          <SlideSlide2 />
          <SlideSlide3 />
        </PresentationContent>
        <PresentationControls />
      </Presentation>
    </PresentationProvider>
  )
}

export default Slides

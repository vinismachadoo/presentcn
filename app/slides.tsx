"use client"

import * as React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Presentation,
  PresentationContent,
  PresentationControls,
  PresentationProvider,
  PresentationSlide,
} from "@/registry/default/ui/presentation"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldLabel } from "@/components/ui/field"

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

const SlidesShowcase = () => {
  const [controlAlignment, setControlAlignment] = React.useState<
    "top" | "bottom"
  >("bottom")

  const [presentationOrientation, setPresentationOrientation] = React.useState<
    "vertical" | "horizontal"
  >("horizontal")

  const [disableShortcuts, setDisableShortcuts] = React.useState<
    Array<"fullscreen" | "restart" | "theme" | "previous" | "next">
  >([])

  return (
    <Tabs className="size-full">
      <TabsList>
        <TabsTrigger value="default">Default</TabsTrigger>
        <TabsTrigger value="controls">Controls</TabsTrigger>
        <TabsTrigger value="orientation">Orientation</TabsTrigger>
        <TabsTrigger value="shortcuts">Shortcuts</TabsTrigger>
        <TabsTrigger value="slide-preview" disabled>
          Slide preview
        </TabsTrigger>
        <TabsTrigger value="watermak" disabled>
          Watermak
        </TabsTrigger>
        <TabsTrigger value="password-protection" disabled>
          Password protection
        </TabsTrigger>
        <TabsTrigger value="progress-bar" disabled>
          Progress bar
        </TabsTrigger>
      </TabsList>

      <TabsContent value="default">
        <PresentationProvider>
          <Presentation>
            <PresentationContent>
              <SlideSlide1 />
              <SlideSlide2 />
              <SlideSlide3 />
            </PresentationContent>
          </Presentation>
        </PresentationProvider>
      </TabsContent>

      <TabsContent value="controls" className="flex gap-x-4">
        <div className="flex flex-col gap-y-2">
          {["top", "bottom"].map((alignment) => (
            <Button
              key={alignment}
              variant={alignment === controlAlignment ? "default" : "outline"}
              size="sm"
              onClick={() => setControlAlignment(alignment as "top" | "bottom")}
              className="capitalize"
            >
              {alignment}
            </Button>
          ))}
        </div>
        <PresentationProvider>
          <Presentation>
            <PresentationContent>
              <SlideSlide1 />
              <SlideSlide2 />
              <SlideSlide3 />
            </PresentationContent>
            <PresentationControls align={controlAlignment} />
          </Presentation>
        </PresentationProvider>
      </TabsContent>

      <TabsContent value="orientation" className="flex gap-x-4">
        <div className="flex flex-col gap-y-2">
          {["vertical", "horizontal"].map((orientation) => (
            <Button
              key={orientation}
              variant={
                orientation === presentationOrientation ? "default" : "outline"
              }
              size="sm"
              onClick={() =>
                setPresentationOrientation(
                  orientation as "vertical" | "horizontal"
                )
              }
              className="capitalize"
            >
              {orientation}
            </Button>
          ))}
        </div>
        <PresentationProvider>
          <Presentation orientation={presentationOrientation}>
            <PresentationContent>
              <SlideSlide1 />
              <SlideSlide2 />
              <SlideSlide3 />
            </PresentationContent>
            <PresentationControls />
          </Presentation>
        </PresentationProvider>
      </TabsContent>

      <TabsContent value="shortcuts" className="flex gap-x-4">
        <div className="flex flex-col gap-y-2">
          {["theme", "fullscreen", "restart", "previous", "next"].map(
            (shortcut) => (
              <Field orientation="horizontal" key={shortcut}>
                <Checkbox
                  id={`${shortcut}-checkbox`}
                  name={`${shortcut}-checkbox`}
                  checked={
                    !disableShortcuts.includes(
                      shortcut as
                        | "fullscreen"
                        | "restart"
                        | "theme"
                        | "previous"
                        | "next"
                    )
                  }
                  onCheckedChange={() => {
                    if (
                      !disableShortcuts.includes(
                        shortcut as
                          | "fullscreen"
                          | "restart"
                          | "theme"
                          | "previous"
                          | "next"
                      )
                    ) {
                      setDisableShortcuts((prev) => [
                        ...prev,
                        shortcut as
                          | "fullscreen"
                          | "restart"
                          | "theme"
                          | "previous"
                          | "next",
                      ])
                    } else {
                      setDisableShortcuts((prev) =>
                        prev.filter((s) => s !== shortcut)
                      )
                    }
                  }}
                />
                <FieldLabel
                  htmlFor={`${shortcut}-checkbox`}
                  className="font-normal"
                >
                  {shortcut}
                </FieldLabel>
              </Field>
            )
          )}
        </div>
        <PresentationProvider disableShortcuts={disableShortcuts}>
          <Presentation>
            <PresentationContent>
              <SlideSlide1 />
              <SlideSlide2 />
              <SlideSlide3 />
            </PresentationContent>
            <PresentationControls />
          </Presentation>
        </PresentationProvider>
      </TabsContent>
    </Tabs>
  )
}

export default SlidesShowcase

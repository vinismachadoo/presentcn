"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldLabel } from "@/components/ui/field"
import { Kbd } from "@/components/ui/kbd"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Presentation,
  PresentationContent,
  PresentationControls,
  PresentationSlide,
} from "@/registry/default/ui/presentation"
import { parseAsString, useQueryState } from "nuqs"
import * as React from "react"

const TABS = [
  "default",
  "controls",
  "orientation",
  "shortcuts",
  "watermark",
] as const

const SlidesShowcase = () => {
  const [activeTab, setActiveTab] = useQueryState(
    "tab",
    parseAsString.withDefault(TABS[0])
  )

  const [controlAlignment, setControlAlignment] = React.useState<
    "top" | "bottom"
  >("bottom")

  const [presentationOrientation, setPresentationOrientation] = React.useState<
    "vertical" | "horizontal"
  >("horizontal")

  const [disableShortcuts, setDisableShortcuts] = React.useState<
    Array<"fullscreen" | "restart" | "theme" | "previous" | "next">
  >([])

  const [watermarkPreset, setWatermarkPreset] = React.useState<number>(1)
  const [presentationWatermark, setPresentationWatermark] = React.useState<
    React.ReactNode | undefined
  >(undefined)

  return (
    <Tabs
      className="size-full [--presentation-width:calc(var(--spacing)*52)]"
      value={activeTab}
      onValueChange={(value) => setActiveTab(value as (typeof TABS)[number])}
    >
      <TabsList>
        {TABS.map((tab) => (
          <TabsTrigger key={tab} value={tab} className="capitalize">
            {tab}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent
        value="default"
        className="grid grid-cols-[var(--presentation-width)_minmax(0,1fr)] gap-x-2"
      >
        <OptionsPanel />

        <Presentation>
          <PresentationContent>
            <PresentationSlide>
              <p>Default slide 1</p>
            </PresentationSlide>
            <PresentationSlide>
              <p>Default slide 2</p>
            </PresentationSlide>
            <PresentationSlide>
              <p>Default slide 3</p>
            </PresentationSlide>
          </PresentationContent>
        </Presentation>
      </TabsContent>

      <TabsContent
        value="controls"
        className="grid grid-cols-[var(--presentation-width)_minmax(0,1fr)] gap-x-2"
      >
        <OptionsPanel>
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
        </OptionsPanel>

        <Presentation>
          <PresentationContent>
            <PresentationSlide>
              <p>Default slide 1</p>
            </PresentationSlide>
            <PresentationSlide>
              <p>Default slide 2</p>
            </PresentationSlide>
            <PresentationSlide>
              <p>Default slide 3</p>
            </PresentationSlide>
          </PresentationContent>
          <PresentationControls align={controlAlignment} />
        </Presentation>
      </TabsContent>

      <TabsContent
        value="orientation"
        className="grid grid-cols-[var(--presentation-width)_minmax(0,1fr)] gap-x-2"
      >
        <OptionsPanel>
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
        </OptionsPanel>

        <Presentation orientation={presentationOrientation}>
          <PresentationContent>
            <PresentationSlide>
              <p>This slide will scroll {`${presentationOrientation}`}ly</p>
            </PresentationSlide>
            <PresentationSlide>
              <p>This slide will scroll {`${presentationOrientation}`}ly</p>
            </PresentationSlide>
            <PresentationSlide>
              <p>This slide will scroll {`${presentationOrientation}`}ly</p>
            </PresentationSlide>
          </PresentationContent>
          <PresentationControls />
        </Presentation>
      </TabsContent>

      <TabsContent
        value="shortcuts"
        className="grid grid-cols-[var(--presentation-width)_minmax(0,1fr)] gap-x-2"
      >
        <OptionsPanel>
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
        </OptionsPanel>

        <Presentation config={{ disableShortcuts }}>
          <PresentationContent>
            <PresentationSlide>
              {disableShortcuts.length > 0 ? (
                <p>
                  Hover over{" "}
                  {disableShortcuts.map((shortcut) => (
                    <Kbd key={shortcut} className="capitalize">
                      {shortcut}
                    </Kbd>
                  ))}{" "}
                  control(s) and check shortcut has been disabled
                </p>
              ) : (
                <p>All shortcuts are enabled</p>
              )}
            </PresentationSlide>
            <PresentationSlide>
              {disableShortcuts.length > 0 ? (
                <p>
                  Hover over{" "}
                  {disableShortcuts.map((shortcut) => (
                    <Kbd key={shortcut} className="capitalize">
                      {shortcut}
                    </Kbd>
                  ))}{" "}
                  control(s) and check shortcut has been disabled
                </p>
              ) : (
                <p>All shortcuts are enabled</p>
              )}
            </PresentationSlide>
            <PresentationSlide>
              {disableShortcuts.length > 0 ? (
                <p>
                  Hover over{" "}
                  {disableShortcuts.map((shortcut) => (
                    <Kbd key={shortcut} className="capitalize">
                      {shortcut}
                    </Kbd>
                  ))}{" "}
                  control(s) and check shortcut has been disabled
                </p>
              ) : (
                <p>All shortcuts are enabled</p>
              )}
            </PresentationSlide>
          </PresentationContent>
          <PresentationControls />
        </Presentation>
      </TabsContent>

      <TabsContent
        value="watermark"
        className="grid grid-cols-[var(--presentation-width)_minmax(0,1fr)] gap-x-2"
      >
        <OptionsPanel>
          <Button
            variant={watermarkPreset === 1 ? "default" : "outline"}
            onClick={() => {
              setPresentationWatermark(undefined)
              setWatermarkPreset(1)
            }}
          >
            No watermark
          </Button>
          <Button
            variant={watermarkPreset === 2 ? "default" : "outline"}
            onClick={() => {
              setPresentationWatermark("String watermark")
              setWatermarkPreset(2)
            }}
          >
            String watermark
          </Button>
          <Button
            variant={watermarkPreset === 3 ? "default" : "outline"}
            onClick={() => {
              setPresentationWatermark(
                <div className="flex items-center gap-x-2">
                  <Avatar className="size-4">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  React node watermark
                </div>
              )
              setWatermarkPreset(3)
            }}
          >
            React node watermark
          </Button>
        </OptionsPanel>

        <Presentation config={{ watermark: presentationWatermark }}>
          <PresentationContent>
            <PresentationSlide>
              <p>
                <Kbd>showWatermark</Kbd> prop has default value of{" "}
                <Kbd>true</Kbd>
              </p>
            </PresentationSlide>
            <PresentationSlide showWatermark={true}>
              <p>
                This slide has prop <Kbd>showWatermark</Kbd> set to{" "}
                <Kbd>true</Kbd>
              </p>
            </PresentationSlide>
            <PresentationSlide showWatermark={false}>
              <p>
                This slide has prop <Kbd>showWatermark</Kbd> set to{" "}
                <Kbd>false</Kbd>
              </p>
            </PresentationSlide>
          </PresentationContent>
          <PresentationControls />
        </Presentation>
      </TabsContent>
    </Tabs>
  )
}

const OptionsPanel = ({ children }: React.ComponentProps<"div">) => {
  return (
    <div className="flex flex-col gap-y-2 rounded-md bg-muted p-4">
      <Label className="mb-2">Options</Label>
      {children}
    </div>
  )
}

export default SlidesShowcase

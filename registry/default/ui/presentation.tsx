"use client"

import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"
import { Kbd } from "@/components/ui/kbd"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { useFullscreen } from "@/registry/default/hooks/use-fullscreen"
import {
  ChevronLeft,
  ChevronRight,
  Expand,
  Moon,
  Shrink,
  Sun,
  Undo2,
} from "lucide-react"
import { useTheme } from "next-themes"
import { parseAsInteger, useQueryState } from "nuqs"
import React from "react"
import { useHotkeys } from "react-hotkeys-hook"

const PresentationContext = React.createContext<
  | {
      api: CarouselApi | undefined
      setApi: React.Dispatch<React.SetStateAction<CarouselApi | undefined>>
      current: number
      setCurrent: React.Dispatch<React.SetStateAction<number>>
      fullscreen: boolean
      fullscreenRef: React.RefObject<HTMLDivElement | null>
      toggleFullscreen: () => void
      disableShortcuts: Array<
        "fullscreen" | "restart" | "theme" | "previous" | "next"
      >
    }
  | undefined
>(undefined)

const PresentationProvider = ({
  children,
  disableShortcuts = [],
}: React.PropsWithChildren<{
  disableShortcuts?: Array<
    "fullscreen" | "restart" | "theme" | "previous" | "next"
  >
}>) => {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = useQueryState(
    "slide",
    parseAsInteger.withDefault(1)
  )

  React.useEffect(() => {
    if (!api) {
      return
    }

    if (current < 1) {
      api.scrollTo(0)
      setCurrent(1)
      return
    }

    if (current > api.scrollSnapList()?.length) {
      api.scrollTo(api.scrollSnapList()?.length ?? 0)
      setCurrent(api.scrollSnapList()?.length ?? 0)
      return
    }

    api.scrollTo(current - 1)
  }, [api, current, setCurrent])

  const { ref: fullscreenRef, fullscreen, toggleFullscreen } = useFullscreen()

  const { resolvedTheme, setTheme } = useTheme()
  useHotkeys("d", () => setTheme(resolvedTheme === "dark" ? "light" : "dark"), {
    enabled: !disableShortcuts?.includes("theme"),
  })

  useHotkeys("r", () => setCurrent(1), {
    enabled: !disableShortcuts?.includes("restart"),
  })

  useHotkeys("left", () => setCurrent(Math.max(1, current - 1)), {
    enabled: !disableShortcuts?.includes("previous"),
  })

  useHotkeys(
    "right",
    () => setCurrent(Math.min(api?.scrollSnapList()?.length ?? 0, current + 1)),
    { enabled: !disableShortcuts?.includes("next") }
  )

  useHotkeys("f", () => toggleFullscreen(), {
    enabled: !disableShortcuts?.includes("fullscreen"),
  })

  return (
    <PresentationContext.Provider
      data-slot="presentation-provider"
      value={{
        api,
        setApi,
        current,
        setCurrent,
        fullscreen,
        fullscreenRef,
        toggleFullscreen,
        disableShortcuts,
      }}
    >
      {children}
    </PresentationContext.Provider>
  )
}

const usePresentation = () => {
  const context = React.useContext(PresentationContext)
  if (context === undefined) {
    throw new Error(
      "usePresentation must be used within a PresentationProvider"
    )
  }
  return context
}

const Presentation = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Carousel> & { children: React.ReactNode }) => {
  const { setApi, fullscreen, fullscreenRef } = usePresentation()

  return (
    <div
      data-slot="presentation"
      className={cn(
        "relative size-full overscroll-none [--controls-height:calc(var(--spacing)*16)]"
      )}
      ref={fullscreenRef}
    >
      <Carousel
        opts={{
          align: "center",
        }}
        className={cn(
          "flex size-full flex-col text-foreground *:data-[slot=carousel-content]:bg-background",
          "*:data-[slot=carousel-content]:rounded-lg",
          "*:data-[slot=carousel-content]:h-full",
          "*:data-[slot=carousel-content]:border",
          !fullscreen &&
            cn(
              "has-[[data-slot=presentation-controls][data-align=bottom]]:*:data-[slot=carousel-content]:rounded-b-none has-[[data-slot=presentation-controls][data-align=top]]:*:data-[slot=carousel-content]:rounded-t-none",
              "has-[[data-slot=presentation-controls][data-align=bottom]]:*:data-[slot=carousel-content]:h-[calc(100%-var(--controls-height))]",
              "has-[[data-slot=presentation-controls][data-align=bottom]]:*:data-[slot=carousel-content]:border-b-0 has-[[data-slot=presentation-controls][data-align=top]]:*:data-[slot=carousel-content]:border-t-0"
            ),
          className
        )}
        setApi={setApi}
        {...props}
      >
        {children}
      </Carousel>
    </div>
  )
}

const PresentationContent = ({
  children,
  className,
  ...props
}: React.ComponentProps<typeof CarouselContent>) => {
  return (
    <CarouselContent
      data-slot="presentation-content"
      className={cn("ml-0 h-full", className)}
      {...props}
    >
      {children}
    </CarouselContent>
  )
}

const PresentationSlide = ({
  children,
  className,
  showWatermark = true,
  ...props
}: React.ComponentProps<"div"> & { showWatermark?: boolean }) => {
  const id = React.useId()
  return (
    <CarouselItem
      data-slot="presentation-slide"
      id={`slide-${id}`}
      className={cn("relative flex items-center justify-center p-4")}
    >
      <div
        className={cn("flex size-full items-center justify-center", className)}
        {...props}
      >
        {children}
      </div>
    </CarouselItem>
  )
}

const PresentationWatermark = ({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) => {
  return (
    <div
      data-slot="presentation-watermark"
      className={cn(
        "absolute bottom-6 left-1/2 -translate-x-1/2 text-muted-foreground",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

const PresentationControls = ({
  children,
  className,
  align = "bottom",
  ...props
}: React.ComponentProps<"div"> & {
  align?: "top" | "bottom"
}) => {
  const {
    api,
    current,
    setCurrent,
    fullscreen,
    toggleFullscreen,
    disableShortcuts,
  } = usePresentation()
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <div
      data-slot="presentation-controls"
      data-align={align}
      className={cn(
        "flex items-center justify-between p-4 data-[align=bottom]:order-last data-[align=top]:order-first",
        fullscreen
          ? "absolute inset-x-0 w-full pb-4 opacity-0 transition-opacity duration-300 ease-in-out hover:opacity-100 data-[align=bottom]:bottom-0 data-[align=top]:top-0"
          : "w-full border bg-background data-[align=bottom]:rounded-b-lg data-[align=top]:rounded-t-lg",
        className
      )}
      {...props}
    >
      <ButtonGroup>
        <Tooltip>
          <TooltipTrigger
            render={
              <Button
                variant="outline"
                size="icon-sm"
                onClick={() => setCurrent(Math.max(0, current - 1))}
                className={cn(
                  current === 1 && "pointer-events-none [&_svg]:opacity-50"
                )}
              />
            }
          >
            <ChevronLeft />
          </TooltipTrigger>
          <TooltipContent>
            Previous {!disableShortcuts?.includes("previous") && <Kbd>←</Kbd>}
          </TooltipContent>
        </Tooltip>

        <Button
          variant="outline"
          size="sm"
          className="pointer-events-none tabular-nums"
        >
          {api?.scrollSnapList()?.length ? (
            <span>
              {current} / {api?.scrollSnapList()?.length}
            </span>
          ) : (
            <span>...</span>
          )}
        </Button>

        <Tooltip>
          <TooltipTrigger
            render={
              <Button
                variant="outline"
                size="icon-sm"
                onClick={() =>
                  setCurrent(
                    Math.min(api?.scrollSnapList()?.length ?? 0, current + 1)
                  )
                }
                className={cn(
                  current === api?.scrollSnapList()?.length &&
                    "pointer-events-none [&_svg]:opacity-50"
                )}
              />
            }
          >
            <ChevronRight />
          </TooltipTrigger>
          <TooltipContent>
            Next {!disableShortcuts?.includes("next") && <Kbd>→</Kbd>}
          </TooltipContent>
        </Tooltip>
      </ButtonGroup>

      <ButtonGroup orientation="horizontal" aria-label="slides navigation">
        <ButtonGroup>
          <Tooltip>
            <TooltipTrigger
              render={
                <Button
                  variant="outline"
                  size="icon-sm"
                  onClick={() => setCurrent(0)}
                  className={cn(
                    current === 0 && "pointer-events-none [&_svg]:opacity-50"
                  )}
                />
              }
            >
              <Undo2 />
            </TooltipTrigger>
            <TooltipContent className="pe-2">
              Restart {!disableShortcuts?.includes("restart") && <Kbd>R</Kbd>}
            </TooltipContent>
          </Tooltip>
        </ButtonGroup>

        <ButtonGroup>
          <Tooltip>
            <TooltipTrigger
              render={
                <Button
                  variant="outline"
                  size="icon-sm"
                  onClick={toggleFullscreen}
                />
              }
            >
              <Expand className={cn(fullscreen && "hidden")} />
              <Shrink className={cn(!fullscreen && "hidden")} />
            </TooltipTrigger>
            <TooltipContent className="pe-2">
              Fullscreen Mode{" "}
              {!disableShortcuts?.includes("fullscreen") && <Kbd>F</Kbd>}
            </TooltipContent>
          </Tooltip>
        </ButtonGroup>

        <ButtonGroup>
          <Tooltip>
            <TooltipTrigger
              render={
                <Button
                  variant="outline"
                  size="icon-sm"
                  onClick={() =>
                    setTheme(resolvedTheme === "dark" ? "light" : "dark")
                  }
                />
              }
            >
              <Sun className={cn("hidden dark:block")} />
              <Moon className={cn("block dark:hidden")} />
            </TooltipTrigger>
            <TooltipContent className="pe-2">
              Dark Mode {!disableShortcuts?.includes("theme") && <Kbd>D</Kbd>}
            </TooltipContent>
          </Tooltip>
        </ButtonGroup>
      </ButtonGroup>

      {children}
    </div>
  )
}

export {
  Presentation,
  PresentationContent,
  PresentationControls,
  PresentationProvider,
  PresentationSlide,
  PresentationWatermark,
  usePresentation,
}

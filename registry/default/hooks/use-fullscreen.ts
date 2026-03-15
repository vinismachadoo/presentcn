import * as React from "react"

// Custom hook to handle fullscreen state
export function useFullscreen() {
  const ref = React.useRef<HTMLDivElement>(null)
  const [isFullscreen, setIsFullscreen] = React.useState(false)

  const onFullscreenChange = React.useCallback(() => {
    setIsFullscreen(Boolean(document.fullscreenElement === ref.current))
  }, [ref])

  React.useEffect(() => {
    document.addEventListener("fullscreenchange", onFullscreenChange)
    return () =>
      document.removeEventListener("fullscreenchange", onFullscreenChange)
  }, [onFullscreenChange])

  const toggleFullscreen = React.useCallback(() => {
    if (!isFullscreen) {
      ref.current?.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
  }, [isFullscreen])

  return { ref, fullscreen: isFullscreen, toggleFullscreen }
}

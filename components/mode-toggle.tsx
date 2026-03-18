import { useTheme } from "next-themes"
import React from "react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { SunIcon, Moon } from "lucide-react"
import { Kbd } from "@/components/ui/kbd"
import { cn } from "@/lib/utils"

const ModeToggle = ({
  className,
  variant = "ghost",
  size = "icon",
  shortcut = null,
  ...props
}: React.ComponentProps<typeof Button> & { shortcut?: string | null }) => {
  const { setTheme, resolvedTheme } = useTheme()

  const toggleTheme = React.useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }, [resolvedTheme, setTheme])

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            onClick={toggleTheme}
            variant={variant}
            size={size}
            {...props}
            className={className}
          />
        }
      >
        <SunIcon className="hidden size-4 dark:block" />
        <Moon className="block size-4 dark:hidden" />
        <span className="sr-only">Toggle theme</span>
      </TooltipTrigger>
      <TooltipContent
        className={cn("flex items-center gap-2", shortcut && "pe-2")}
      >
        Toggle Mode
        {shortcut && <Kbd className="uppercase">{shortcut}</Kbd>}
      </TooltipContent>
    </Tooltip>
  )
}

export default ModeToggle

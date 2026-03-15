"use client"

import ModeToggle from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { Projector } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const MainNav = () => {
  const pathname = usePathname()

  return (
    <nav className="flex h-full w-full items-center justify-between gap-x-2 border-b px-20 **:data-active:bg-muted">
      <div className="flex items-center gap-x-2">
        <Link href="/">
          <div className="hit-area-2 extend-touch-target mr-2 flex size-6 items-center justify-center rounded-sm bg-sky-300 dark:bg-sky-800">
            <Projector className="size-4" />
          </div>
        </Link>

        <Button
          disabled
          variant="ghost"
          size="sm"
          data-active={pathname === "/docs"}
        >
          <Link href="/docs">Docs</Link>
        </Button>
      </div>

      <div className="flex items-center gap-x-2">
        <ModeToggle />
      </div>
    </nav>
  )
}

export default MainNav

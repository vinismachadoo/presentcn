import { Button } from "@/registry/default/ui/button"
import Link from "next/link"

const NotFoundPage = () => {
  return (
    <div className="flex h-svh w-full flex-col items-center justify-center gap-2">
      <p className="text-4xl font-bold">Page not found</p>
      <p className="font-medium text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or may have been
        moved.
      </p>
      <Button className="mt-4">
        <Link href="/">Back to home</Link>
      </Button>
    </div>
  )
}

export default NotFoundPage

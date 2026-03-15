import ogImage from "@/app/opengraph-image.png"
import { ThemeProvider } from "@/components/providers/theme-provider"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { TooltipProvider } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import type { Metadata } from "next"
import { Geist, Geist_Mono, Inter } from "next/font/google"
import { NuqsAdapter } from "nuqs/adapters/next/app"
import "./globals.css"
import MainNav from "@/components/main-nav"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "presentcn",
  description: "presentcn",
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL!),
  icons: {
    icon: [
      {
        rel: "icon",
        url: "data:image/svg+xml,%3Csvg width='36' height='36' viewBox='0 0 36 36' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='36' height='36' rx='8' fill='%237DD3FC'/%3E%3Cpath d='M11 13L9 11' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M15 12V9' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M19 13L21 11' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M15 22C16.6569 22 18 20.6569 18 19C18 17.3431 16.6569 16 15 16C13.3431 16 12 17.3431 12 19C12 20.6569 13.3431 22 15 22Z' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M17.83 18H26C26.5304 18 27.0391 18.2107 27.4142 18.5858C27.7893 18.9609 28 19.4696 28 20V24C28 24.5304 27.7893 25.0391 27.4142 25.4142C27.0391 25.7893 26.5304 26 26 26H10C9.46957 26 8.96086 25.7893 8.58579 25.4142C8.21071 25.0391 8 24.5304 8 24V20C8 19.4696 8.21071 18.9609 8.58579 18.5858C8.96086 18.2107 9.46957 18 10 18H12.17' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M22 22H24' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A",
        media: "(prefers-color-scheme: light)",
      },
      {
        rel: "icon",
        url: "data:image/svg+xml,%3Csvg width='36' height='36' viewBox='0 0 36 36' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='36' height='36' rx='8' fill='%23075985'/%3E%3Cpath d='M11 13L9 11' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M15 12V9' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M19 13L21 11' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M15 22C16.6569 22 18 20.6569 18 19C18 17.3431 16.6569 16 15 16C13.3431 16 12 17.3431 12 19C12 20.6569 13.3431 22 15 22Z' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M17.83 18H26C26.5304 18 27.0391 18.2107 27.4142 18.5858C27.7893 18.9609 28 19.4696 28 20V24C28 24.5304 27.7893 25.0391 27.4142 25.4142C27.0391 25.7893 26.5304 26 26 26H10C9.46957 26 8.96086 25.7893 8.58579 25.4142C8.21071 25.0391 8 24.5304 8 24V20C8 19.4696 8.21071 18.9609 8.58579 18.5858C8.96086 18.2107 9.46957 18 10 18H12.17' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M22 22H24' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A",
        media: "(prefers-color-scheme: dark)",
      },
    ],
  },
  // openGraph: {
  //   type: "website",
  //   locale: "en_US",
  //   url: `${process.env.NEXT_PUBLIC_URL}`,
  //   title: "ovini/labs",
  //   description: "ovini/labs",
  //   siteName: "ovini/labs",
  //   images: [
  //     {
  //       url: ogImage.src,
  //       width: ogImage.width,
  //       height: ogImage.height,
  //       alt: "ovini/labs",
  //     },
  //   ],
  // },
  // twitter: {
  //   card: "summary_large_image",
  //   title: "ovini/labs",
  //   description: "ovini/labs",
  //   images: [
  //     {
  //       url: ogImage.src,
  //       width: ogImage.width,
  //       height: ogImage.height,
  //       alt: "ovini/labs",
  //     },
  //   ],
  //   creator: "@ovinisanches",
  // },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={cn(inter.variable, geistSans.variable, geistMono.variable)}
      suppressHydrationWarning
    >
      <body
        className={cn(
          "group/body overscroll-none antialiased [--main-nav-height:calc(var(--spacing)*14)]"
        )}
      >
        <ThemeProvider>
          <NuqsAdapter>
            <TooltipProvider>
              <div data-slot="layout" className="flex flex-col">
                <header className="sticky top-0 z-50 w-full bg-background">
                  <div className="3xl:fixed:px-0">
                    <div className="3xl:fixed:container flex h-(--main-nav-height) items-center">
                      <MainNav />
                    </div>
                  </div>
                </header>

                <main className="flex h-[calc(100svh-var(--main-nav-height))] w-screen flex-col">
                  {children}
                </main>
              </div>
            </TooltipProvider>
            <TailwindIndicator />
          </NuqsAdapter>
        </ThemeProvider>
      </body>
    </html>
  )
}

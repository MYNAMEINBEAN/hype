import type React from "react"
import "@/app/globals.css"

export const metadata = {
  title: "Hyperbeam Browser - Example.com",
  description: "Full-screen Hyperbeam browser session",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="overflow-hidden">{children}</body>
    </html>
  )
}

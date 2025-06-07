"use client"

import { useState, useEffect } from "react"
import { createHyperbeamSession } from "@/app/actions"
import { Loader2 } from "lucide-react"

export default function FullScreenHyperbeamBrowser() {
  const [embedUrl, setEmbedUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Automatically create a session for example.com when the component mounts
  useEffect(() => {
    const initializeSession = async () => {
      try {
        const result = await createHyperbeamSession("https://example.com")

        if (result.error) {
          setError(result.error)
          return
        }

        setEmbedUrl(result.embedUrl)
      } catch (err) {
        setError("Failed to create Hyperbeam session.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    initializeSession()
  }, [])

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4" />
          <p className="text-lg text-gray-600">Loading browser session...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-red-50">
        <div className="text-center">
          <p className="text-lg text-red-600 mb-2">Error loading browser session</p>
          <p className="text-sm text-red-500">{error}</p>
        </div>
      </div>
    )
  }

  if (!embedUrl) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-100">
        <p className="text-lg text-gray-600">No browser session available</p>
      </div>
    )
  }

  return (
    <div className="fixed inset-0">
      <iframe
        src={embedUrl}
        className="w-full h-full border-0"
        allow="camera; microphone; display-capture; fullscreen"
        title="Hyperbeam Browser - Example.com"
      />
    </div>
  )
}

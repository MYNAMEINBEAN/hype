"use server"

interface HyperbeamResponse {
  embed_url: string
  stream_id: string
  session_id: string
}

interface SessionResult {
  embedUrl?: string
  streamId?: string
  sessionId?: string
  error?: string
}

export async function createHyperbeamSession(url: string): Promise<SessionResult> {
  try {
    // Get API key from environment variable
    const apiKey = process.env.HYPERBEAM_API_KEY

    if (!apiKey) {
      return {
        error: "Hyperbeam API key is not configured. Please add HYPERBEAM_API_KEY to your environment variables.",
      }
    }

    // Prepare request data
    const data = { url }

    // Make request to Hyperbeam API
    const response = await fetch("https://engine.hyperbeam.com/v0/vm", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Hyperbeam API error:", response.status, errorText)
      return {
        error: `Hyperbeam API error (${response.status}): ${errorText}`,
      }
    }

    const result = (await response.json()) as HyperbeamResponse

    return {
      embedUrl: result.embed_url,
      streamId: result.stream_id,
      sessionId: result.session_id,
    }
  } catch (error) {
    console.error("Error creating Hyperbeam session:", error)
    return {
      error: "Failed to create Hyperbeam session. Please check your API key and try again.",
    }
  }
}

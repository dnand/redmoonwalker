"use client"

import { StepBlockType } from "@prisma/client"
import Image from "next/image"
import { CheckCircle2, Download, Lightbulb, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface StepBlockPayload {
  text?: string
  imageUrl?: string
  videoUrl?: string
  videoProvider?: "youtube" | "vimeo"
  items?: string[]
  downloadUrl?: string
  fileName?: string
  title?: string
  [key: string]: any
}

interface StepBlockRendererProps {
  type: StepBlockType | string
  payload: StepBlockPayload
  isAuthenticated?: boolean
  hasAccess?: boolean
}

export function StepBlockRenderer({
  type,
  payload,
  isAuthenticated = false,
  hasAccess = false,
}: StepBlockRendererProps) {
  // Use string comparison for flexibility with mock data
  const blockType = type as string
  switch (blockType) {
    case "TEXT":
      const textContent = payload.content || payload.text || ""
      return (
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <div className="text-foreground whitespace-pre-wrap leading-relaxed">
            {textContent.split('\n').map((line: string, idx: number) => {
              // Simple markdown-like rendering
              if (line.startsWith('# ')) {
                return <h1 key={idx} className="text-2xl font-bold mt-6 mb-3">{line.slice(2)}</h1>
              }
              if (line.startsWith('## ')) {
                return <h2 key={idx} className="text-xl font-semibold mt-5 mb-2">{line.slice(3)}</h2>
              }
              if (line.startsWith('### ')) {
                return <h3 key={idx} className="text-lg font-semibold mt-4 mb-2">{line.slice(4)}</h3>
              }
              if (line.startsWith('- **')) {
                const boldMatch = line.match(/^- \*\*(.+?)\*\* - (.+)$/)
                if (boldMatch) {
                  return (
                    <div key={idx} className="flex items-start gap-2 my-1">
                      <span className="text-primary">•</span>
                      <span><strong>{boldMatch[1]}</strong> - {boldMatch[2]}</span>
                    </div>
                  )
                }
              }
              if (line.startsWith('- ')) {
                return (
                  <div key={idx} className="flex items-start gap-2 my-1">
                    <span className="text-primary">•</span>
                    <span>{line.slice(2)}</span>
                  </div>
                )
              }
              if (line.startsWith('| ') || line.startsWith('|---')) {
                // Skip table formatting for now, just show text
                return <p key={idx} className="font-mono text-sm">{line}</p>
              }
              if (line.trim() === '') {
                return <div key={idx} className="h-3" />
              }
              return <p key={idx} className="my-2">{line}</p>
            })}
          </div>
        </div>
      )

    case "IMAGE":
      const imageUrl = payload.url || payload.imageUrl
      if (!imageUrl) return null
      return (
        <div className="my-6 rounded-lg overflow-hidden shadow-md">
          <Image
            src={imageUrl}
            alt={payload.alt || "Step image"}
            width={800}
            height={600}
            className="w-full h-auto"
          />
          {payload.caption && (
            <p className="text-sm text-muted-foreground mt-2 text-center italic">
              {payload.caption}
            </p>
          )}
        </div>
      )

    case "CALLOUT":
      const calloutStyles: Record<string, { bg: string; border: string; icon: string }> = {
        info: { bg: "bg-blue-50 dark:bg-blue-950", border: "border-l-blue-500", icon: "💡" },
        tip: { bg: "bg-green-50 dark:bg-green-950", border: "border-l-green-500", icon: "✅" },
        warning: { bg: "bg-amber-50 dark:bg-amber-950", border: "border-l-amber-500", icon: "⚠️" },
        success: { bg: "bg-emerald-50 dark:bg-emerald-950", border: "border-l-emerald-500", icon: "🎉" },
      }
      const style = calloutStyles[payload.type as string] || calloutStyles.info
      return (
        <Card className={`my-6 border-l-4 ${style.border} ${style.bg}`}>
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <span className="text-lg">{style.icon}</span>
              <div className="flex-1">
                <p className="text-sm font-semibold">
                  {payload.title || "Note"}
                </p>
                {payload.content && (
                  <p className="text-sm mt-1 opacity-90">
                    {payload.content}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )

    case "VIDEO_EMBED":
      if (!payload.videoUrl) return null
      const videoId = extractVideoId(payload.videoUrl, payload.videoProvider)
      if (!videoId) return null

      const embedUrl =
        payload.videoProvider === "vimeo"
          ? `https://player.vimeo.com/video/${videoId}`
          : `https://www.youtube.com/embed/${videoId}`

      return (
        <div className="my-6 aspect-video rounded-lg overflow-hidden">
          <iframe
            src={embedUrl}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )

    case "CHECKLIST":
      return (
        <div className="my-6 space-y-3">
          {payload.items?.map((item, index) => (
            <label
              key={index}
              className="flex items-start space-x-3 cursor-pointer group"
            >
              <input
                type="checkbox"
                className="mt-1 rounded border-gray-300"
                onChange={(e) => {
                  // Store in localStorage for persistence
                  const key = `checklist-${payload.id || "default"}-${index}`
                  if (e.target.checked) {
                    localStorage.setItem(key, "true")
                  } else {
                    localStorage.removeItem(key)
                  }
                }}
                defaultChecked={
                  typeof window !== "undefined"
                    ? localStorage.getItem(
                        `checklist-${payload.id || "default"}-${index}`
                      ) === "true"
                    : false
                }
              />
              <span className="flex-1 text-sm">{item}</span>
            </label>
          ))}
        </div>
      )

    case "DOWNLOAD":
      if (!hasAccess && !isAuthenticated) {
        return (
          <Card className="my-6 border-dashed">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">
                Sign in and purchase to download this file
              </p>
            </CardContent>
          </Card>
        )
      }

      if (!hasAccess) {
        return (
          <Card className="my-6 border-dashed">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">
                Purchase this course to download this file
              </p>
            </CardContent>
          </Card>
        )
      }

      return (
        <Card className="my-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Download className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">
                    {payload.fileName || "Download"}
                  </p>
                  {payload.fileSize && (
                    <p className="text-xs text-muted-foreground">
                      {(payload.fileSize / 1024 / 1024).toFixed(2)} MB
                    </p>
                  )}
                </div>
              </div>
              {payload.downloadUrl && (
                <Button
                  size="sm"
                  onClick={() => {
                    window.open(payload.downloadUrl, "_blank")
                  }}
                >
                  Download
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )

    case "TIP":
      return (
        <Card className="my-6 border-l-4 border-l-blue-500 bg-blue-50 dark:bg-blue-950">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <Lightbulb className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                  {payload.title || "Tip"}
                </p>
                {payload.text && (
                  <p className="text-sm text-blue-800 dark:text-blue-200 mt-1">
                    {payload.text}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )

    case "WARNING":
      return (
        <Card className="my-6 border-l-4 border-l-amber-500 bg-amber-50 dark:bg-amber-950">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-amber-900 dark:text-amber-100">
                  {payload.title || "Warning"}
                </p>
                {payload.text && (
                  <p className="text-sm text-amber-800 dark:text-amber-200 mt-1">
                    {payload.text}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )

    case "DIVIDER":
      return <Separator className="my-6" />

    default:
      return null
  }
}

function extractVideoId(url: string, provider?: string): string | null {
  if (!url) return null

  if (provider === "vimeo") {
    const match = url.match(/vimeo\.com\/(?:video\/)?(\d+)/)
    return match ? match[1] : null
  }

  // YouTube
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
  ]

  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) return match[1]
  }

  return null
}


"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Settings } from "lucide-react"
import { Card } from "@/components/ui/card"
import { WebhookSettings } from "@/components/webhook-settings"
import { botTypes } from "@/components/chatbot-selector"
import { createChat } from '@n8n/chat'
import '@n8n/chat/style.css'
import '@/styles/custom-chat-theme.css';

interface ChatInterfaceProps {
  selectedBot: string
}

export function ChatInterface({ selectedBot }: ChatInterfaceProps) {
  // Store webhook URLs for each bot type
  const [webhookUrls, setWebhookUrls] = useState<Record<string, string>>({
    generalWebhookUrl: process.env.NEXT_PUBLIC_GENERAL_WEBHOOK_URL || "",
    analyticsWebhookUrl: process.env.NEXT_PUBLIC_ANALYTICS_WEBHOOK_URL || "",
    travelPlannerWebhookUrl: process.env.NEXT_PUBLIC_TRAVEL_PLANNER_WEBHOOK_URL || "",
  })

  const [showSettings, setShowSettings] = useState(false)

  // Get the current bot's webhook URL key
  const currentBot = botTypes.find((bot) => bot.id === selectedBot) || botTypes[0]
  const currentWebhookUrlKey = currentBot.webhookUrlKey
  const currentWebhookUrl = webhookUrls[currentWebhookUrlKey]

  // Update a specific webhook URL
  const updateWebhookUrl = (key: string, url: string) => {
    setWebhookUrls((prev) => ({
      ...prev,
      [key]: url,
    }))
  }

  useEffect(() => {
    if (currentWebhookUrl) {
      createChat({
        webhookUrl: currentWebhookUrl,
        target: '#n8n-chat-box',
        mode: 'fullscreen',
      });
    }
  }, [webhookUrls, selectedBot])

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{currentBot.name}</h2>
        <Button variant="outline" size="icon" onClick={() => setShowSettings(!showSettings)} aria-label="Settings">
          <Settings className="h-4 w-4" />
        </Button>
      </div>

      {showSettings && (
        <WebhookSettings
          webhookUrl={currentWebhookUrl}
          setWebhookUrl={(url) => updateWebhookUrl(currentWebhookUrlKey, url)}
          onClose={() => setShowSettings(false)}
          botName={currentBot.name}
        />
      )}

      <Card className="flex-1 overflow-hidden p-0 mb-4">
        <div hidden={!currentWebhookUrl} id="n8n-chat-box" className="n8n-chat-box w-full h-full"></div>
        {!currentWebhookUrl && (
          <div className="p-4 text-center h-full flex items-center justify-center">
            <p className="text-muted-foreground">
              Please configure the webhook URL for {currentBot.name} in settings to start chatting.
            </p>
          </div>
        )}
      </Card>
    </div>
  )
}


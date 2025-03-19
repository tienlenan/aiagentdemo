"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

interface WebhookSettingsProps {
  webhookUrl: string
  setWebhookUrl: (url: string) => void
  onClose: () => void
  botName?: string
}

export function WebhookSettings({ webhookUrl, setWebhookUrl, onClose, botName = "Chatbot" }: WebhookSettingsProps) {
  const [tempUrl, setTempUrl] = useState(webhookUrl)
  const [error, setError] = useState("")

  const handleSave = () => {
    // Basic URL validation
    if (!tempUrl) {
      setError("Webhook URL is required")
      return
    }

    try {
      new URL(tempUrl)
      setWebhookUrl(tempUrl)
      setError("")
      onClose()
    } catch (e) {
      setError("Please enter a valid URL")
    }
  }

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>{botName} Webhook Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="webhook-url">AI Webhook URL</Label>
            <Input
              id="webhook-url"
              placeholder="https://your-n8n-instance.com/webhook/path"
              value={tempUrl}
              onChange={(e) => setTempUrl(e.target.value)}
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
            <p className="text-xs text-muted-foreground">
              Enter the webhook URL from your n8n workflow for the {botName.toLowerCase()}. This is where your chat
              messages will be sent.
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleSave}>Save Settings</Button>
      </CardFooter>
    </Card>
  )
}


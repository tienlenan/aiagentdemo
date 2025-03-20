"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { MessageSquare, ChartNoAxesCombined, Plane } from "lucide-react"

interface ChatbotSelectorProps {
  selectedBot: string
  onSelectBot: (bot: string) => void
}

type BotType = {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  webhookUrlKey: string
}

export const botTypes: BotType[] = [
  {
    id: "general",
    name: "General Assistant",
    description: "General purpose assistant for everyday questions",
    icon: <MessageSquare className="h-5 w-5" />,
    webhookUrlKey: "generalWebhookUrl",
  },
  {
    id: "support",
    name: "Analytics Assistant",
    description: "Analyze your business data and provide insights",
    icon: <ChartNoAxesCombined className="h-5 w-5" />,
    webhookUrlKey: "supportWebhookUrl",
  },
  {
    id: "technical",
    name: "Travel Planner Assistant",
    description: "Tailoring your travel tour with our expert advice",
    icon: <Plane className="h-5 w-5" />,
    webhookUrlKey: "technicalWebhookUrl",
  },
]

export function ChatbotSelector({ selectedBot, onSelectBot }: ChatbotSelectorProps) {
  return (
    <div className="space-y-2 w-full">
      {botTypes.map((bot) => (
        <Button
          key={bot.id}
          variant={selectedBot === bot.id ? "default" : "ghost"}
          className={cn(
            "w-full justify-start gap-2 px-3 py-3 h-auto",
            selectedBot === bot.id ? "bg-primary text-primary-foreground" : "hover:bg-muted",
          )}
          onClick={() => onSelectBot(bot.id)}
        >
          <div className="flex items-start">
            <div className="mt-0.5">{bot.icon}</div>
            <div className="flex flex-col items-start text-left ml-2">
              <span className="text-sm font-medium">{bot.name}</span>
              <span className="text-xs text-muted-foreground whitespace-normal">{bot.description}</span>
            </div>
          </div>
        </Button>
      ))}
    </div>
  )
}


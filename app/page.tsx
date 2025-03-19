"use client"

import { useState } from "react"
import { ChatInterface } from "@/components/chat-interface"
import { ChatbotSelector } from "@/components/chatbot-selector"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"

export default function Home() {
  const [selectedBot, setSelectedBot] = useState("general")
  const isMobile = useMediaQuery("(max-width: 768px)")

  return (
    <main className="flex min-h-screen flex-col md:flex-row">
      {/* Mobile menu */}
      {isMobile ? (
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="absolute top-4 left-4 md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[250px] sm:w-[300px]">
            <div className="py-4">
              <h2 className="text-xl font-bold mb-6">PYS AI Chatbot</h2>
              <ChatbotSelector selectedBot={selectedBot} onSelectBot={setSelectedBot} />
            </div>
          </SheetContent>
        </Sheet>
      ) : (
        /* Desktop sidebar */
        <div className="w-64 border-r p-4 hidden md:block">
          <h2 className="text-xl font-bold mb-6">PYS AI Chatbot</h2>
          <ChatbotSelector selectedBot={selectedBot} onSelectBot={setSelectedBot} />
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 p-4 md:p-8">
        <div className="w-full max-w-3xl mx-auto h-[calc(100vh-2rem)]">
          {isMobile && <h1 className="text-2xl font-bold mb-6 text-center mt-8">PYS AI Chatbot</h1>}
          <ChatInterface selectedBot={selectedBot} />
        </div>
      </div>
    </main>
  )
}


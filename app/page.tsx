"use client"

import { useState } from "react"
import { ChatInterface } from "@/components/chat-interface"
import { ModelSelector } from "@/components/model-selector"
import { ThemeToggle } from "@/components/theme-toggle"
import { WelcomeDialog } from "@/components/welcome-dialog"
import { SystemPrompt } from "@/components/system-prompt"
import { TokenCounter } from "@/components/token-counter"
import { Button } from "@/components/ui/button"
import { Menu, X, UserCircle, Info, HelpCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <>
      <WelcomeDialog />
      <div className="flex h-screen bg-background">
        {/* Sidebar */}
        <div
          className={cn(
            "flex h-full flex-col border-r bg-muted/30 transition-all duration-300",
            sidebarOpen ? "w-80" : "w-0 overflow-hidden"
          )}
        >
        <div className="border-b p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-semibold">gptoss playground</h1>
              <p className="text-xs text-muted-foreground">
                A demo of OpenAI&apos;s open-weight models, gpt‑oss‑120b and gpt‑oss‑20b, for developers.
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex-1 overflow-auto">
          <ModelSelector />
          <SystemPrompt />
          <TokenCounter />
        </div>
        
        <div className="border-t p-4 space-y-2">
          <Link href="/about" className="block">
            <Button variant="ghost" className="w-full justify-start">
              <Info className="mr-2 h-4 w-4" />
              About
            </Button>
          </Link>
          <Link href="/help" className="block">
            <Button variant="ghost" className="w-full justify-start">
              <HelpCircle className="mr-2 h-4 w-4" />
              Help
            </Button>
          </Link>
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => {}}
          >
            <UserCircle className="mr-2 h-4 w-4" />
            Sign in with Hugging Face
          </Button>
        </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-1 flex-col">
        {/* Header */}
        <header className="flex items-center justify-between border-b px-4 py-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          
          <ThemeToggle />
        </header>

        {/* Chat Area */}
        <main className="flex-1 overflow-hidden">
          <ChatInterface />
        </main>

        {/* Footer */}
        <footer className="border-t px-4 py-2 text-center text-xs text-muted-foreground">
          Demo only. Reasoning may be verbose, speculative, or off. Models can make mistakes. Please use responsibly.
        </footer>
      </div>
    </div>
    </>
  )
}
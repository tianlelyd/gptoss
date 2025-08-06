"use client"

import { useState, useEffect } from "react"
import { ChatInterface } from "@/components/chat-interface"
import { ModelSelector } from "@/components/model-selector"
import { ThemeToggle } from "@/components/theme-toggle"
import { WelcomeDialog } from "@/components/welcome-dialog"
import { SystemPrompt } from "@/components/system-prompt"
import { TokenCounter } from "@/components/token-counter"
import { ChatHistory } from "@/components/chat-history"
import { Button } from "@/components/ui/button"
import { Menu, X, UserCircle, Info, HelpCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useChatStore } from "@/lib/store"

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [historyOpen, setHistoryOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { currentChatId, createNewChat, getCurrentChat } = useChatStore()
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  const currentChat = mounted ? getCurrentChat() : undefined
  const hasMessages = currentChat && currentChat.messages.length > 0
  
  const handleNewChat = () => {
    createNewChat()
  }

  return (
    <>
      <WelcomeDialog />
      <ChatHistory isOpen={historyOpen} onOpenChange={setHistoryOpen} />
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
              <h1 className="text-xl font-bold">gpt-oss playground</h1>
              <p className="text-xs text-muted-foreground mt-1">
              gpt-oss is a family of open-weight language models from OpenAI, built upon the Mixture-of-Experts (MoE) architecture. 
              This playground allows you to experiment with the gpt-oss-120b and gpt-oss-20b models, explore their capabilities.
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
          
          <div className="flex items-center gap-2">
            {mounted && hasMessages && (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleNewChat}
                title="New Chat"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.6729 3.91275C16.8918 2.6938 18.8682 2.6938 20.0871 3.91275C21.3061 5.1317 21.3061 7.10801 20.0871 8.32696L14.1499 14.2642C13.3849 15.0291 12.3925 15.5254 11.3215 15.6784L9.14142 15.9898C8.82983 16.0343 8.51546 15.9295 8.29289 15.707C8.07033 15.4844 7.96554 15.17 8.01005 14.8584L8.32149 12.6784C8.47449 11.6074 8.97072 10.6149 9.7357 9.84994L15.6729 3.91275ZM18.6729 5.32696C18.235 4.88906 17.525 4.88906 17.0871 5.32696L11.1499 11.2642C10.6909 11.7231 10.3932 12.3186 10.3014 12.9612L10.1785 13.8213L11.0386 13.6985C11.6812 13.6067 12.2767 13.3089 12.7357 12.8499L18.6729 6.91275C19.1108 6.47485 19.1108 5.76486 18.6729 5.32696ZM11 3.99916C11.0004 4.55145 10.5531 4.99951 10.0008 4.99994C9.00227 5.00072 8.29769 5.00815 7.74651 5.06052C7.20685 5.11179 6.88488 5.20104 6.63803 5.32682C6.07354 5.61444 5.6146 6.07339 5.32698 6.63787C5.19279 6.90123 5.10062 7.24891 5.05118 7.85408C5.00078 8.47092 5 9.26324 5 10.3998V13.5998C5 14.7364 5.00078 15.5288 5.05118 16.1456C5.10062 16.7508 5.19279 17.0985 5.32698 17.3618C5.6146 17.9263 6.07354 18.3852 6.63803 18.6729C6.90138 18.807 7.24907 18.8992 7.85424 18.9487C8.47108 18.9991 9.26339 18.9998 10.4 18.9998H13.6C14.7366 18.9998 15.5289 18.9991 16.1458 18.9487C16.7509 18.8992 17.0986 18.807 17.362 18.6729C17.9265 18.3852 18.3854 17.9263 18.673 17.3618C18.7988 17.115 18.8881 16.793 18.9393 16.2533C18.9917 15.7021 18.9991 14.9976 18.9999 13.9991C19.0003 13.4468 19.4484 12.9994 20.0007 12.9998C20.553 13.0003 21.0003 13.4483 20.9999 14.0006C20.9991 14.9788 20.9932 15.7807 20.9304 16.4425C20.8664 17.1159 20.7385 17.7135 20.455 18.2698C19.9757 19.2106 19.2108 19.9755 18.27 20.4549C17.6777 20.7567 17.0375 20.8825 16.3086 20.942C15.6008 20.9999 14.7266 20.9999 13.6428 20.9998H10.3572C9.27339 20.9999 8.39925 20.9999 7.69138 20.942C6.96253 20.8825 6.32234 20.7567 5.73005 20.4549C4.78924 19.9755 4.02433 19.2106 3.54497 18.2698C3.24318 17.6775 3.11737 17.0373 3.05782 16.3085C2.99998 15.6006 2.99999 14.7264 3 13.6426V10.357C2.99999 9.27325 2.99998 8.3991 3.05782 7.69122C3.11737 6.96237 3.24318 6.32218 3.54497 5.72989C4.02433 4.78908 4.78924 4.02418 5.73005 3.54481C6.28633 3.26137 6.88399 3.13346 7.55735 3.06948C8.21919 3.0066 9.02103 3.00071 9.99922 2.99994C10.5515 2.99951 10.9996 3.44688 11 3.99916Z"></path>
                </svg>
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setHistoryOpen(true)}
              title="Chat History"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M2.954 7.807A1 1 0 0 0 3.968 9c.064.002.13-.003.196-.014l3-.5a1 1 0 0 0-.328-1.972l-.778.13a8 8 0 1 1-2.009 6.247 1 1 0 0 0-1.988.219C2.614 18.11 6.852 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2a9.975 9.975 0 0 0-7.434 3.312l-.08-.476a1 1 0 0 0-1.972.328l.44 2.643ZM12 7a1 1 0 0 1 1 1v3.586l2.207 2.207a1 1 0 0 1-1.414 1.414l-2.5-2.5A1 1 0 0 1 11 12V8a1 1 0 0 1 1-1Z" clipRule="evenodd"></path>
              </svg>
            </Button>
            <ThemeToggle />
          </div>
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
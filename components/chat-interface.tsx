"use client"

import { useState, useRef, useEffect } from "react"
import { useChatStore } from "@/lib/store"
import { ChatMessage } from "./chat-message"
import { Button } from "./ui/button"
import { Textarea } from "./ui/textarea"
import { ScrollArea } from "./ui/scroll-area"
import { Send, Loader2, Lightbulb, Code, HelpCircle, Sparkles, Paperclip } from "lucide-react"
import { useChat } from "@/lib/use-chat"

const examplePrompts = [
  { icon: Lightbulb, text: "How far away is the sun from Earth?" },
  { icon: Code, text: "Write a Python function that checks whether a string is a palindrome." },
  { icon: HelpCircle, text: "How many R's are in strawberry?" },
  { icon: Sparkles, text: "Suggest a random prompt." },
]

export function ChatInterface() {
  const [input, setInput] = useState("")
  const [mounted, setMounted] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const {
    currentChatId,
    model,
    reasoningLevel,
    showReasoning,
    systemPrompt,
    createChat,
    addMessage,
    getCurrentChat,
  } = useChatStore()

  const currentChat = getCurrentChat()

  const { messages, isLoading, append } = useChat({
    api: "/api/chat",
    body: {
      model,
      reasoningLevel,
      systemPrompt,
    },
    initialMessages: mounted ? currentChat?.messages || [] : [],
    onResponse: () => {
      if (!currentChatId) {
        createChat()
      }
    },
    onFinish: (message) => {
      addMessage({
        role: message.role as "user" | "assistant",
        content: message.content,
      })
    },
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    if (!currentChatId) {
      createChat()
    }

    const userMessage = {
      role: "user" as const,
      content: input,
    }

    addMessage(userMessage)
    setInput("")
    
    await append(userMessage)
  }

  const handleExampleClick = async (prompt: string) => {
    if (isLoading) return
    
    if (!currentChatId) {
      createChat()
    }

    const userMessage = {
      role: "user" as const,
      content: prompt,
    }

    addMessage(userMessage)
    await append(userMessage)
  }

  if (!mounted) {
    return (
      <div className="flex h-full flex-col">
        <ScrollArea className="flex-1 p-4">
          <div className="flex h-full flex-col items-center justify-center space-y-8 px-4">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-semibold">I&apos;m gptoss—how can I help?</h2>
            </div>
          </div>
        </ScrollArea>
        <div className="border-t p-4">
          <form className="mx-auto max-w-4xl">
            <div className="relative flex items-end gap-2">
              <Button
                type="button"
                size="icon"
                variant="ghost"
                className="mb-2"
                disabled
              >
                <Paperclip className="h-4 w-4" />
              </Button>
              <Textarea
                placeholder="Ask anything"
                className="min-h-[60px] flex-1 resize-none pr-12"
                disabled
              />
              <Button type="submit" size="icon" disabled className="absolute bottom-2 right-2">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col">
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center space-y-8 px-4">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-semibold">I&apos;m gptoss—how can I help?</h2>
            </div>
            
            <div className="grid gap-3 sm:grid-cols-2 max-w-2xl w-full">
              {examplePrompts.map((prompt, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-auto p-4 justify-start text-left hover:bg-accent"
                  onClick={() => handleExampleClick(prompt.text)}
                  disabled={isLoading}
                >
                  <prompt.icon className="mr-3 h-5 w-5 shrink-0" />
                  <span className="text-sm">{prompt.text}</span>
                </Button>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-4">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={{
                  id: message.id,
                  role: message.role as "user" | "assistant",
                  content: message.content,
                  timestamp: new Date(),
                }}
                showReasoning={showReasoning}
              />
            ))}
            {isLoading && (
              <div className="flex gap-3 p-4 bg-muted/30">
                <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md bg-primary text-primary-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
                <div className="flex-1">
                  <div className="space-y-2">
                    <div className="h-4 w-24 animate-pulse rounded bg-muted"></div>
                    <div className="h-4 w-48 animate-pulse rounded bg-muted"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </ScrollArea>

      <div className="border-t p-4">
        <form onSubmit={handleSubmit} className="mx-auto max-w-4xl">
          <div className="relative flex items-end gap-2">
            <input
              type="file"
              id="file-upload"
              className="hidden"
              multiple
              onChange={(e) => {
                // File upload handling placeholder
              }}
            />
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="mb-2"
              onClick={() => document.getElementById('file-upload')?.click()}
            >
              <Paperclip className="h-4 w-4" />
            </Button>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything"
              className="min-h-[60px] flex-1 resize-none pr-12"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  handleSubmit(e)
                }
              }}
              disabled={isLoading}
            />
            <Button
              type="submit"
              size="icon"
              disabled={!input.trim() || isLoading}
              className="absolute bottom-2 right-2"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
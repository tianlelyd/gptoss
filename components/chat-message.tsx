"use client"

import { Message } from "@/lib/store"
import { MarkdownRenderer } from "./markdown-renderer"
import { cn } from "@/lib/utils"
import { Bot, User } from "lucide-react"

interface ChatMessageProps {
  message: Message
  showReasoning?: boolean
}

export function ChatMessage({ message, showReasoning }: ChatMessageProps) {
  const isUser = message.role === 'user'
  
  return (
    <div className={cn("flex gap-3 p-4", isUser ? "bg-background" : "bg-muted/30")}>
      <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md bg-primary text-primary-foreground">
        {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
      </div>
      <div className="flex-1 space-y-2">
        {message.reasoning && showReasoning && !isUser && (
          <div className="rounded-lg border border-muted bg-muted/50 p-3 text-sm">
            <div className="mb-1 font-semibold text-muted-foreground">Reasoning</div>
            <MarkdownRenderer content={message.reasoning} />
          </div>
        )}
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <MarkdownRenderer content={message.content} />
        </div>
      </div>
    </div>
  )
}
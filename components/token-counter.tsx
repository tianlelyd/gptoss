"use client"

import { useChatStore } from "@/lib/store"
import { Card } from "./ui/card"
import { useEffect, useState } from "react"

function estimateTokens(text: string): number {
  // Simple token estimation: ~4 characters per token on average
  return Math.ceil(text.length / 4)
}

export function TokenCounter() {
  const { getCurrentChat } = useChatStore()
  const [inputTokens, setInputTokens] = useState(0)
  const [outputTokens, setOutputTokens] = useState(0)
  
  useEffect(() => {
    const chat = getCurrentChat()
    if (!chat) {
      setInputTokens(0)
      setOutputTokens(0)
      return
    }

    let input = 0
    let output = 0
    
    chat.messages.forEach((message) => {
      const tokens = estimateTokens(message.content)
      if (message.role === 'user' || message.role === 'system') {
        input += tokens
      } else {
        output += tokens
      }
    })
    
    setInputTokens(input)
    setOutputTokens(output)
  }, [getCurrentChat])

  const totalTokens = inputTokens + outputTokens

  return (
    <div className="p-4 border-t">
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Token Usage</h3>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <Card className="p-2 text-center">
            <div className="text-muted-foreground">Input</div>
            <div className="font-bold">{inputTokens.toLocaleString()}</div>
          </Card>
          <Card className="p-2 text-center">
            <div className="text-muted-foreground">Output</div>
            <div className="font-bold">{outputTokens.toLocaleString()}</div>
          </Card>
          <Card className="p-2 text-center">
            <div className="text-muted-foreground">Total</div>
            <div className="font-bold">{totalTokens.toLocaleString()}</div>
          </Card>
        </div>
      </div>
    </div>
  )
}
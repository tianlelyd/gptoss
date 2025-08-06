import { useState, useCallback } from 'react'
import { Message } from './store'
import { nanoid } from 'nanoid'

interface UseChatOptions {
  api: string
  body?: Record<string, unknown>
  initialMessages?: Message[]
  onResponse?: (response: Response) => void
  onFinish?: (message: Message) => void
}

export function useChat({
  api,
  body = {},
  initialMessages = [],
  onResponse,
  onFinish,
}: UseChatOptions) {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const append = useCallback(async (message: { role: string; content: string }) => {
    const userMessage: Message = {
      id: nanoid(),
      role: message.role as 'user' | 'assistant',
      content: message.content,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(api, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...body,
          messages: [...messages, userMessage].map(m => ({
            role: m.role,
            content: m.content,
          })),
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      if (onResponse) {
        onResponse(response)
      }

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      const assistantMessage: Message = {
        id: nanoid(),
        role: 'assistant',
        content: '',
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])

      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value)
          const lines = chunk.split('\n').filter(line => line.trim() !== '')
          
          for (const line of lines) {
            if (line.startsWith('0:')) {
              const content = line.slice(2).trim()
              if (content && content !== '""') {
                try {
                  const parsed = JSON.parse(content)
                  assistantMessage.content += parsed
                } catch {
                  assistantMessage.content += content.replace(/^"|"$/g, '')
                }
                setMessages((prev) => 
                  prev.map((m) => 
                    m.id === assistantMessage.id 
                      ? { ...m, content: assistantMessage.content }
                      : m
                  )
                )
              }
            }
          }
        }
      }

      if (onFinish) {
        onFinish(assistantMessage)
      }
    } catch (err) {
      setError(err as Error)
      console.error('Chat error:', err)
    } finally {
      setIsLoading(false)
    }
  }, [api, body, messages, onResponse, onFinish])

  const reload = useCallback(() => {
    if (messages.length > 0) {
      const lastUserMessage = [...messages].reverse().find(m => m.role === 'user')
      if (lastUserMessage) {
        setMessages(messages.filter(m => m.role !== 'assistant' || m.timestamp < lastUserMessage.timestamp))
        append({ role: 'user', content: lastUserMessage.content })
      }
    }
  }, [messages, append])

  const stop = useCallback(() => {
    setIsLoading(false)
  }, [])

  return {
    messages,
    isLoading,
    error,
    append,
    reload,
    stop,
  }
}
"use client"

import { useState } from "react"
import { useChatStore } from "@/lib/store"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"
import { ScrollArea } from "./ui/scroll-area"
import { Trash2, MessageSquare } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface ChatHistoryProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export function ChatHistory({ isOpen, onOpenChange }: ChatHistoryProps) {
  const { chats, currentChatId, setCurrentChat, deleteChat } = useChatStore()
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const handleSelectChat = (chatId: string) => {
    setCurrentChat(chatId)
    onOpenChange(false)
  }

  const handleDeleteChat = (e: React.MouseEvent, chatId: string) => {
    e.stopPropagation()
    setDeletingId(chatId)
    setTimeout(() => {
      deleteChat(chatId)
      setDeletingId(null)
    }, 200)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Chat History</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[400px] pr-4">
          {chats.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-32 text-muted-foreground">
              <MessageSquare className="h-8 w-8 mb-2" />
              <p>No chat history yet</p>
            </div>
          ) : (
            <div className="space-y-2">
              {chats
                .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
                .map((chat) => (
                  <div
                    key={chat.id}
                    onClick={() => handleSelectChat(chat.id)}
                    className={`
                      group relative flex items-start gap-3 rounded-lg border p-3 
                      transition-all cursor-pointer hover:bg-accent
                      ${currentChatId === chat.id ? "bg-accent" : ""}
                      ${deletingId === chat.id ? "opacity-50" : ""}
                    `}
                  >
                    <MessageSquare className="h-5 w-5 mt-0.5 shrink-0 text-muted-foreground" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate">{chat.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {chat.messages.length} messages · {formatDistanceToNow(new Date(chat.updatedAt), { addSuffix: true })}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => handleDeleteChat(e, chat.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
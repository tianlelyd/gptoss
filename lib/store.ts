import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { nanoid } from 'nanoid'

export interface Message {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  reasoning?: string
  timestamp: Date
}

export interface Chat {
  id: string
  title: string
  messages: Message[]
  createdAt: Date
  updatedAt: Date
}

interface ChatStore {
  chats: Chat[]
  currentChatId: string | null
  model: string
  reasoningLevel: 'high' | 'medium' | 'low'
  showReasoning: boolean
  systemPrompt: string
  
  createChat: () => string
  deleteChat: (id: string) => void
  setCurrentChat: (id: string) => void
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void
  updateMessage: (id: string, content: string, reasoning?: string) => void
  setModel: (model: string) => void
  setReasoningLevel: (level: 'high' | 'medium' | 'low') => void
  setShowReasoning: (show: boolean) => void
  setSystemPrompt: (prompt: string) => void
  getCurrentChat: () => Chat | undefined
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      chats: [],
      currentChatId: null,
      model: 'gpt-4.1-nano',
      reasoningLevel: 'high',
      showReasoning: true,
      systemPrompt: '',
      
      createChat: () => {
        const chatId = nanoid()
        const newChat: Chat = {
          id: chatId,
          title: 'New Chat',
          messages: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        }
        
        set((state) => ({
          chats: [...state.chats, newChat],
          currentChatId: chatId,
        }))
        
        return chatId
      },
      
      deleteChat: (id) => {
        set((state) => ({
          chats: state.chats.filter((chat) => chat.id !== id),
          currentChatId: state.currentChatId === id ? null : state.currentChatId,
        }))
      },
      
      setCurrentChat: (id) => {
        set({ currentChatId: id })
      },
      
      addMessage: (message) => {
        const messageWithMeta: Message = {
          ...message,
          id: nanoid(),
          timestamp: new Date(),
        }
        
        set((state) => ({
          chats: state.chats.map((chat) => {
            if (chat.id === state.currentChatId) {
              const title = chat.messages.length === 0 && message.role === 'user' 
                ? message.content.slice(0, 50) + (message.content.length > 50 ? '...' : '')
                : chat.title
                
              return {
                ...chat,
                title,
                messages: [...chat.messages, messageWithMeta],
                updatedAt: new Date(),
              }
            }
            return chat
          }),
        }))
      },
      
      updateMessage: (id, content, reasoning) => {
        set((state) => ({
          chats: state.chats.map((chat) => {
            if (chat.id === state.currentChatId) {
              return {
                ...chat,
                messages: chat.messages.map((msg) =>
                  msg.id === id ? { ...msg, content, reasoning } : msg
                ),
                updatedAt: new Date(),
              }
            }
            return chat
          }),
        }))
      },
      
      setModel: (model) => set({ model }),
      setReasoningLevel: (level) => set({ reasoningLevel: level }),
      setShowReasoning: (show) => set({ showReasoning: show }),
      setSystemPrompt: (prompt) => set({ systemPrompt: prompt }),
      
      getCurrentChat: () => {
        const state = get()
        return state.chats.find((chat) => chat.id === state.currentChatId)
      },
    }),
    {
      name: 'gptoss-chat-storage',
    }
  )
)
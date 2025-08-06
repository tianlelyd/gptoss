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
  createNewChat: () => string
  deleteChat: (id: string) => void
  setCurrentChat: (id: string | null) => void
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void
  updateMessage: (id: string, content: string, reasoning?: string) => void
  setModel: (model: string) => void
  setReasoningLevel: (level: 'high' | 'medium' | 'low') => void
  setShowReasoning: (show: boolean) => void
  setSystemPrompt: (prompt: string) => void
  getCurrentChat: () => Chat | undefined
}

const deserializeDates = (chat: any): Chat => ({
  ...chat,
  createdAt: new Date(chat.createdAt),
  updatedAt: new Date(chat.updatedAt),
  messages: chat.messages.map((msg: any) => ({
    ...msg,
    timestamp: new Date(msg.timestamp)
  }))
})

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      chats: [],
      currentChatId: null,
      model: 'gpt-oss-120b',
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
      
      createNewChat: () => {
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
      storage: {
        getItem: (name) => {
          const str = window.localStorage.getItem(name)
          if (!str) return null
          const state = JSON.parse(str)
          return {
            ...state,
            state: {
              ...state.state,
              chats: state.state.chats.map(deserializeDates)
            }
          }
        },
        setItem: (name, value) => {
          window.localStorage.setItem(name, JSON.stringify(value))
        },
        removeItem: (name) => {
          window.localStorage.removeItem(name)
        }
      }
    }
  )
)
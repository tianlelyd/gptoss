"use client"

import { useChatStore } from "@/lib/store"
import { Textarea } from "./ui/textarea"
import { Label } from "./ui/label"
import { Button } from "./ui/button"
import { Settings } from "lucide-react"
import { useState } from "react"

export function SystemPrompt() {
  const { systemPrompt, setSystemPrompt } = useChatStore()
  const [expanded, setExpanded] = useState(false)
  const [localPrompt, setLocalPrompt] = useState(systemPrompt)

  const handleSave = () => {
    setSystemPrompt(localPrompt)
    setExpanded(false)
  }

  const handleCancel = () => {
    setLocalPrompt(systemPrompt)
    setExpanded(false)
  }

  return (
    <div className="space-y-3 p-4 border-t">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">System Prompt</Label>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setExpanded(!expanded)}
        >
          <Settings className="h-4 w-4" />
        </Button>
      </div>
      
      {expanded && (
        <div className="space-y-2">
          <Textarea
            value={localPrompt}
            onChange={(e) => setLocalPrompt(e.target.value)}
            placeholder="Enter a system prompt to guide the model's behavior..."
            className="min-h-[100px] text-sm"
          />
          <div className="flex gap-2">
            <Button size="sm" onClick={handleSave}>
              Save
            </Button>
            <Button size="sm" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </div>
      )}
      
      {!expanded && systemPrompt && (
        <p className="text-xs text-muted-foreground truncate">
          {systemPrompt}
        </p>
      )}
    </div>
  )
}
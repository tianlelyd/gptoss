"use client"

import * as React from "react"
import { useChatStore } from "@/lib/store"
import { Card } from "./ui/card"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { Checkbox } from "./ui/checkbox"
import { Label } from "./ui/label"
import { Cpu, Zap, Download } from "lucide-react"
import { cn } from "@/lib/utils"

const models = [
  {
    id: "gpt-oss-120b",
    name: "gpt-oss-120b",
    description: "Designed for large-scale infrastructure",
    icon: Cpu,
    label: "120b",
  },
  {
    id: "gpt-oss-20b",
    name: "gpt-oss-20b",
    description: "Optimized for running on-device",
    icon: Zap,
    label: "20b",
  },
]

export function ModelSelector() {
  const {
    model,
    setModel,
    reasoningLevel,
    setReasoningLevel,
    showReasoning,
    setShowReasoning,
  } = useChatStore()

  return (
    <div className="space-y-6 p-4">
      <div>
        <h3 className="mb-3 text-sm font-medium">Model</h3>
        <div className="space-y-2">
          {models.map((m) => (
            <Card
              key={m.id}
              className={cn(
                "cursor-pointer p-3 transition-colors hover:bg-accent",
                model === m.id && "border-primary bg-accent"
              )}
              onClick={() => setModel(m.id)}
            >
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <span className="text-xs font-bold">{m.label}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className="font-medium">{m.name}</div>
                  </div>
                  <div className="text-xs text-muted-foreground">{m.description}</div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    // Download functionality placeholder
                  }}
                  className="rounded p-1 hover:bg-muted"
                  title="Download model"
                >
                  <Download className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-medium">Reasoning level</h3>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="show-reasoning"
              checked={showReasoning}
              onCheckedChange={setShowReasoning}
            />
            <Label htmlFor="show-reasoning" className="text-sm">
              Show reasoning
            </Label>
          </div>
        </div>
        
        <RadioGroup value={reasoningLevel} onValueChange={setReasoningLevel}>
          <div className="space-y-2">
            <Card
              className={cn(
                "cursor-pointer p-3 transition-colors hover:bg-accent",
                reasoningLevel === "high" && "border-primary bg-accent"
              )}
              onClick={() => setReasoningLevel("high")}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="high" id="high" />
                <Label htmlFor="high" className="flex-1 cursor-pointer">
                  High
                </Label>
              </div>
            </Card>
            
            <Card
              className={cn(
                "cursor-pointer p-3 transition-colors hover:bg-accent",
                reasoningLevel === "medium" && "border-primary bg-accent"
              )}
              onClick={() => setReasoningLevel("medium")}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="medium" id="medium" />
                <Label htmlFor="medium" className="flex-1 cursor-pointer">
                  Medium
                </Label>
              </div>
            </Card>
            
            <Card
              className={cn(
                "cursor-pointer p-3 transition-colors hover:bg-accent",
                reasoningLevel === "low" && "border-primary bg-accent"
              )}
              onClick={() => setReasoningLevel("low")}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="low" id="low" />
                <Label htmlFor="low" className="flex-1 cursor-pointer">
                  Low
                </Label>
              </div>
            </Card>
          </div>
        </RadioGroup>
      </div>
    </div>
  )
}
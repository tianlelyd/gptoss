"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useChatStore } from "@/lib/store"

export function WelcomeDialog() {
  const [open, setOpen] = useState(false)
  const { setShowReasoning } = useChatStore()

  useEffect(() => {
    const hasVisited = localStorage.getItem("gptoss-has-visited")
    if (!hasVisited) {
      setOpen(true)
    }
  }, [])

  const handleContinue = (showReasoning: boolean) => {
    setShowReasoning(showReasoning)
    localStorage.setItem("gptoss-has-visited", "true")
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 rounded-lg bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold">
            GPT
          </div>
          <DialogTitle>Welcome to gptoss playground</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <p className="text-sm text-muted-foreground text-center">
            Welcome to the gptoss playground, a place for developers to explore OpenAI&apos;s open-weight models.
          </p>
          <p className="text-sm text-muted-foreground text-center">
            By continuing, you agree that reasoning may be verbose, speculative, or off.
          </p>
          <div className="flex flex-col gap-2">
            <Button onClick={() => handleContinue(true)}>
              Continue with visible reasoning
            </Button>
            <Button variant="outline" onClick={() => handleContinue(false)}>
              Don&apos;t show reasoning
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
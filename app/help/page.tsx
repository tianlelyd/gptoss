"use client"

import { useState } from "react"
import { useTranslation, Language } from "@/lib/i18n"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Globe } from "lucide-react"
import Link from "next/link"

export default function HelpPage() {
  const [lang, setLang] = useState<Language>('en')
  const t = useTranslation(lang)

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-4xl p-6">
        <div className="mb-6 flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Chat
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLang(lang === 'en' ? 'zh' : 'en')}
          >
            <Globe className="mr-2 h-4 w-4" />
            {lang === 'en' ? '中文' : 'English'}
          </Button>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-3xl">{t.help.title}</CardTitle>
          </CardHeader>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t.help.gettingStarted.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="whitespace-pre-wrap text-sm text-muted-foreground">
                {t.help.gettingStarted.content}
              </pre>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t.help.reasoningLevels.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <span className="font-semibold">• </span>
                {t.help.reasoningLevels.high}
              </div>
              <div>
                <span className="font-semibold">• </span>
                {t.help.reasoningLevels.medium}
              </div>
              <div>
                <span className="font-semibold">• </span>
                {t.help.reasoningLevels.low}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t.help.tips.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc space-y-2 pl-6">
                {t.help.tips.items.map((tip, index) => (
                  <li key={index} className="text-muted-foreground">
                    {tip}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
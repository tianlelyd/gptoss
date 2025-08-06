"use client"

import { useState } from "react"
import { useTranslation, Language } from "@/lib/i18n"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Globe } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
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

        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">{t.about.title}</CardTitle>
            <CardDescription className="text-lg">
              {t.about.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="mb-3 text-xl font-semibold">{t.about.features.title}</h3>
              <ul className="list-disc space-y-2 pl-6">
                {t.about.features.items.map((item, index) => (
                  <li key={index} className="text-muted-foreground">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-3 text-xl font-semibold">{t.about.models.title}</h3>
              <div className="space-y-3">
                {Object.entries(t.about.models.items).map(([model, description]) => (
                  <Card key={model}>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">{model}</CardTitle>
                      <CardDescription>{description}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
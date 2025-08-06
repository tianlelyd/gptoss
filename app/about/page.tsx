"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-10 flex items-center justify-between h-16 px-4 border-b bg-background/95 backdrop-blur-sm sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="M15.6729 3.91275C16.8918 2.6938 18.8682 2.6938 20.0871 3.91275C21.3061 5.1317 21.3061 7.10801 20.0871 8.32696L14.1499 14.2642C13.3849 15.0291 12.3925 15.5254 11.3215 15.6784L9.14142 15.9898C8.82983 16.0343 8.51546 15.9295 8.29289 15.707C8.07033 15.4844 7.96554 15.17 8.01005 14.8584L8.32149 12.6784C8.47449 11.6074 8.97072 10.6149 9.7357 9.84994L15.6729 3.91275Z"></path><path d="M11 4H7.5C6.39992 4 5.52886 4.00004 4.80862 4.05782C4.03747 4.11737 3.32234 4.24318 2.73005 4.54497C1.78924 5.02433 1.02433 5.78924 0.544971 6.73005C0.243183 7.32234 0.117373 8.03747 0.057824 8.80862C0.0000409766 9.52886 0 10.3999 0 11.5V14.5C0 15.6001 0.0000409766 16.4711 0.057824 17.1914C0.117373 17.9625 0.243183 18.6777 0.544971 19.2699C1.02433 20.2108 1.78924 20.9757 2.73005 21.455C3.32234 21.7568 4.03747 21.8826 4.80862 21.9422C5.52886 21.9999 6.39992 22 7.5 22H10.5"></path></svg>
          <span className="text-lg font-semibold">gpt-oss</span>
        </Link>
        <nav className="hidden items-center gap-4 sm:flex">
          <Link href="/about" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            About
          </Link>
          <Link href="/help" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Help
          </Link>
        </nav>
        <Button variant="outline" size="sm" className="sm:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><line x1="4" x2="20" y1="12" y2="12"></line><line x1="4" x2="20" y1="6" y2="6"></line><line x1="4" x2="20" y1="18" y2="18"></line></svg>
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </header>
      <main className="flex-1 px-4 py-8 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold tracking-tight">About gpt-oss</h1>
              <p className="mt-4 text-lg text-muted-foreground">
                gpt-oss is a family of open-weight language models released by OpenAI. These models are designed to be efficient, and highly customizable for a wide range of applications. This project, the gpt-oss playground, is a demonstration of their capabilities.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Open-Weight Language Models</h2>
              <p className="mt-4 text-muted-foreground">
                The term "open-weight" means that the model's parameters, the very core of the AI, are publicly available. This allows developers and researchers to not only use the models but also to fine-tune them for specific tasks, conduct research on their inner workings, and build new applications on top of them. The gpt-oss models are released under the permissive Apache 2.0 license, encouraging broad use and innovation.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Key Technical Features</h2>
              <div className="mt-4 space-y-4">
                <div>
                  <h3 className="text-lg font-semibold">Mixture-of-Experts (MoE)</h3>
                  <p className="mt-2 text-muted-foreground">
                    The gpt-oss models utilize a Mixture-of-Experts (MoE) architecture. This means that instead of one giant model processing every request, the system is composed of many smaller "expert" models. For any given input, the system intelligently routes the request to the most relevant experts. This approach significantly improves efficiency and performance, especially for complex tasks.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Chain-of-Thought (CoT)</h3>
                  <p className="mt-2 text-muted-foreground">
                    One of the standout features of the gpt-oss models is their ability to provide full, non-supervised Chain-of-Thought (CoT) data. This means the model can show its work, revealing the step-by-step reasoning process it used to arrive at an answer. This transparency is crucial for understanding model behavior, debugging, and ensuring responsible AI development.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Reinforcement Learning from Human Feedback (RLHF)</h3>
                  <p className="mt-2 text-muted-foreground">
                    To ensure the models are helpful and harmless, they are trained using a technique called Reinforcement Learning from Human Feedback (RLHF). This process involves human reviewers rating the model's responses, which then helps to fine-tune the model's behavior to better align with human values and expectations.
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">The gpt-oss Playground</h2>
              <p className="mt-4 text-muted-foreground">
                This playground provides a hands-on experience with the gpt-oss-120b and gpt-oss-20b models. You can interact with them, test their capabilities, and see their performance on a variety of tasks. We encourage you to explore, experiment, and discover the potential of these powerful open-weight language models.
              </p>
            </div>
          </div>
        </div>
      </main>
      <footer className="flex items-center justify-center h-16 border-t">
        <p className="text-sm text-muted-foreground">
          <Link href="https://gpt-oss.work">gpt-oss.work</Link>
        </p>
      </footer>
    </div>
  )
}
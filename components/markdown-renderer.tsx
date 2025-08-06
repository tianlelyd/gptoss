"use client"

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface MarkdownRendererProps {
  content: string
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        code({ className, children, ...props }: any) {
          const match = /language-(\w+)/.exec(className || '')
          const inline = !className || !match
          return !inline ? (
            <SyntaxHighlighter
              style={oneDark}
              language={match[1]}
              PreTag="div"
              {...props}
            >
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm" {...props}>
              {children}
            </code>
          )
        },
        p({ children }) {
          return <p className="mb-2 last:mb-0">{children}</p>
        },
        ul({ children }) {
          return <ul className="mb-2 ml-6 list-disc">{children}</ul>
        },
        ol({ children }) {
          return <ol className="mb-2 ml-6 list-decimal">{children}</ol>
        },
        h1({ children }) {
          return <h1 className="mb-3 text-2xl font-bold">{children}</h1>
        },
        h2({ children }) {
          return <h2 className="mb-2 text-xl font-semibold">{children}</h2>
        },
        h3({ children }) {
          return <h3 className="mb-2 text-lg font-semibold">{children}</h3>
        },
        blockquote({ children }) {
          return (
            <blockquote className="border-l-4 border-muted pl-4 italic mb-2">
              {children}
            </blockquote>
          )
        },
        table({ children }) {
          return (
            <div className="mb-2 overflow-x-auto">
              <table className="min-w-full border-collapse border border-muted">
                {children}
              </table>
            </div>
          )
        },
        th({ children }) {
          return (
            <th className="border border-muted bg-muted px-3 py-1 text-left font-semibold">
              {children}
            </th>
          )
        },
        td({ children }) {
          return (
            <td className="border border-muted px-3 py-1">
              {children}
            </td>
          )
        },
      }}
    >
      {content}
    </ReactMarkdown>
  )
}
# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

GPTOss - A Next.js 15 chat application replicating gpt-oss.com functionality, configured for deployment on Cloudflare Workers using OpenNext. Built with TypeScript, Tailwind CSS v4, and AI SDK.

## Essential Commands

### Development
- `pnpm dev` - Start Next.js development server on localhost:3000
- `pnpm build` - Build Next.js production bundle
- `pnpm lint` - Run ESLint for code quality checks

### Cloudflare Deployment
- `pnpm preview` - Build and preview Cloudflare Worker locally
- `pnpm deploy` - Build and deploy to Cloudflare Workers
- `pnpm upload` - Build and upload to Cloudflare Workers

## Development Guidelines

### Documentation Resources
- Use Context7 MCP server to query the latest documentation during development for up-to-date API references and best practices

## Architecture

### Technology Stack
- **Framework**: Next.js 15.4.5 with App Router
- **Runtime**: Cloudflare Workers via @opennextjs/cloudflare
- **Language**: TypeScript with strict mode enabled
- **Styling**: Tailwind CSS v4 with PostCSS
- **UI Components**: Shadcn UI (to be integrated)
- **AI Integration**: @ai-sdk/openai with Vercel AI SDK
- **Package Manager**: pnpm (required)

### Project Structure
- `/app` - Next.js App Router pages and API routes
  - `/api/chat` - API route for AI chat functionality using @ai-sdk/openai
  - `/about`, `/help`, `/test` - Additional page routes (to be implemented)
- `/components/ui` - Reusable UI components (Shadcn UI)
- `/lib` - Utility functions and shared code
  - `/lib/resp.ts` - Standard API response helpers
- `/.open-next` - Build output for Cloudflare Workers (generated)

### Key Configuration Files
- `wrangler.jsonc` - Cloudflare Workers configuration
  - Main worker: `.open-next/worker.js`
  - Assets directory: `.open-next/assets`
  - Compatibility flags: nodejs_compat enabled
- `open-next.config.ts` - OpenNext configuration (currently using dummy cache)
- `next.config.ts` - Next.js configuration (OpenNext Cloudflare ready)
- `tsconfig.json` - TypeScript configuration with path alias `@/*`

### Import Conventions
- Use `@/*` path alias for absolute imports from project root
- Example: `import { respData, respErr } from '@/lib/resp'`

### API Response Pattern
The codebase uses standardized response helpers from `/lib/resp.ts`:
- `respData(data)` - Success response with data
- `respOk()` - Simple success response
- `respErr(message)` - Error response with message

### AI Integration
- Current API route at `/api/chat` accepts POST requests with `prompt`, `provider`, and `model`
- Uses Vercel AI SDK with @ai-sdk/openai for text generation
- Environment variable `OPENAI_API_KEY` required for OpenAI integration

### Deployment Target
The application is configured for Cloudflare Workers deployment using OpenNext adapter. The build process transforms the Next.js application into a format compatible with Cloudflare's edge runtime.
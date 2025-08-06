I want to replicate the full functionality and UI of https://www.gpt-oss.com/ as a 1:1 copy, and deploy it using OpenNext to Cloudflare Workers (refer to: https://opennext.js.org/cloudflare/get-started). The application must use the following tech stack and guidelines:

---

Tech Stack:
- Framework: Next.js with App Router (latest version)
- Language: TypeScript
- Components: React Functional Components
- Styling: Tailwind CSS
- UI Library: Shadcn UI
- AI SDK: @ai-sdk/openai
- AI Model: gpt-4.1-nano (must be used as the main model)
- Environment: OPENAI_API_KEY has already been configured in `.env`
- Use **pnpm** as the package manager instead of npm or yarn.

Site Name: gptoss (this is the core keyword throughout the app)

---

Coding Conventions:
- Use React best practices and hooks
- Follow modular architecture and component reusability
- Implement consistent internationalization (i18n) structure
- Responsive design using Tailwind CSS and Shadcn UI
- Strong type safety using TypeScript throughout the project
- Use `.env` for configuration and secrets

---

Features to Implement (fully replicate from https://www.gpt-oss.com/):
- Chat interface
- Model selector
- Token usage counter
- System prompt configuration
- Markdown response rendering
- Theme switcher (light/dark)
- Persistent chat history (localStorage or other persistence)
- About/Help pages with internationalization

---

Deployment:
- Use context 7 to query the latest documents during the development process.
- Use playwright mcp to verify the functionality of the app.
- use 'pnpm create cloudflare@latest . --framework=next --platform=workers
' init project.
- Must use OpenNext deployment to Cloudflare Workers following this guide: https://opennext.js.org/cloudflare/get-started
- All backend AI requests must go through @ai-sdk/openai using the `gpt-4.1-nano` model
- The OpenAI API key is stored in `.env` as `OPENAI_API_KEY`

---

Please generate the full project code (or module) based on the above instructions. The output should be structured, maintainable, production-ready, and meet modern development best practices.

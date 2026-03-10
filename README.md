# Josh_Kim_Web

A modern developer portfolio for Joshua Kim, showcasing projects, experience, technical skills, and an AI assistant built with Next.js, TypeScript, and Tailwind CSS.

## Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Vercel

## Features

- Responsive portfolio homepage
- Projects, experience, and contact pages
- Floating AI assistant launcher
- Dedicated AI assistant page
- Portfolio content stored in JSON files
- OpenAI-powered chat with local portfolio fallback

## Local Development

```bash
npm install
npm run dev
```

To enable live OpenAI answers locally, add:

```bash
OPENAI_API_KEY=your_openai_api_key
OPENAI_MODEL=gpt-4.1-mini
```

## Deployment

Deploy directly to Vercel.

- `OPENAI_API_KEY` is optional but required for live OpenAI answers.
- Without it, the assistant falls back to local portfolio data.

import { NextResponse } from "next/server";
import { buildContext } from "@/lib/embeddings";
import { createLocalAssistantAnswer } from "@/lib/local-assistant";
import { createPortfolioAnswer } from "@/lib/openai";
import type { ChatHistoryMessage } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ChatRequest = {
  message?: string;
  history?: Array<{
    role?: string;
    content?: string;
  }>;
};

function sanitizeHistory(history: ChatRequest["history"]): ChatHistoryMessage[] {
  if (!Array.isArray(history)) {
    return [];
  }

  return history
    .filter(
      (item): item is { role: "user" | "assistant"; content: string } =>
        (item.role === "user" || item.role === "assistant") &&
        typeof item.content === "string" &&
        item.content.trim().length > 0,
    )
    .map((item) => ({
      role: item.role,
      content: item.content.trim(),
    }))
    .slice(-8);
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as ChatRequest;
    const message = payload.message?.trim();

    if (!message) {
      return NextResponse.json(
        { error: "A non-empty message is required." },
        { status: 400 },
      );
    }

    const history = sanitizeHistory(payload.history);
    const localAnswer = createLocalAssistantAnswer({
      question: message,
      history,
    });

    const apiKey = process.env.OPENAI_API_KEY?.trim();

    if (!apiKey) {
      return NextResponse.json({ answer: localAnswer, source: "local" });
    }

    try {
      const context = buildContext(message);
      const answer = await createPortfolioAnswer({
        question: message,
        context,
        history,
      });

      return NextResponse.json({ answer, source: "openai" });
    } catch (caughtError) {
      console.error("OpenAI chat request failed. Falling back to local answer.", caughtError);
      return NextResponse.json({ answer: localAnswer, source: "local-fallback" });
    }
  } catch {
    return NextResponse.json(
      { error: "Invalid request payload." },
      { status: 400 },
    );
  }
}

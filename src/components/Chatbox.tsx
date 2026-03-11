"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import JoshAssistantAvatar from "@/components/JoshAssistantAvatar";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type ChatboxProps = {
  developerName: string;
  mode?: "full" | "embedded" | "launcher" | "hero" | "overlay";
  onPresenceChange?: (state: {
    phase: "idle" | "listening" | "typing" | "thinking" | "replying";
    preview?: string;
  }) => void;
};

type ChatPayload = {
  answer?: string;
  error?: string;
};

type StatusPayload = {
  configured?: boolean;
  model?: string;
  provider?: string;
};

type AssistantState = "checking" | "ready" | "disabled";

function getIntroMessage(
  developerName: string,
  mode: "full" | "embedded" | "launcher" | "hero" | "overlay",
): string {
  if (mode === "launcher") {
    return `Hi, I'm ${developerName}'s Josh Assistant. Ask about projects, stack, experience, or career focus.`;
  }

  if (mode === "overlay") {
    return `Ask me about ${developerName}'s projects, experience, stack, and current career focus.`;
  }

  return `Hi, I'm ${developerName}'s Josh Assistant. Ask about projects, experience, technical strengths, or current career focus.`;
}

export default function Chatbox({
  developerName,
  mode = "full",
  onPresenceChange,
}: ChatboxProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [assistantState, setAssistantState] = useState<AssistantState>("checking");
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [sessionDisabled, setSessionDisabled] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [replyPreview, setReplyPreview] = useState<string | null>(null);
  const [replyTick, setReplyTick] = useState(0);
  const endOfMessagesRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const isEmbedded = mode === "embedded";
  const isHero = mode === "hero";
  const isLauncher = mode === "launcher";
  const isOverlay = mode === "overlay";
  const introMessage = getIntroMessage(developerName, mode);
  const isChatDisabled = assistantState !== "ready" || sessionDisabled;
  const disabledCardMessage =
    assistantState === "checking"
      ? "Checking OpenAI setup..."
      : assistantState === "disabled"
        ? statusMessage || "OpenAI is not configured for this deployment."
        : sessionDisabled
          ? error || "OpenAI chat is currently unavailable."
          : null;
  const canSubmit = useMemo(
    () => input.trim().length > 0 && !loading && !isChatDisabled,
    [input, loading, isChatDisabled],
  );

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    const textarea = textareaRef.current;

    if (!textarea) {
      return;
    }

    const minHeight = isOverlay ? 42 : isLauncher || isHero ? 40 : 40;
    const maxHeight = isOverlay ? 96 : isLauncher || isHero ? 84 : 104;

    textarea.style.height = "0px";
    const nextHeight = Math.min(Math.max(textarea.scrollHeight, minHeight), maxHeight);
    textarea.style.height = `${nextHeight}px`;
    textarea.style.overflowY = textarea.scrollHeight > maxHeight ? "auto" : "hidden";
  }, [input, isHero, isLauncher, isOverlay]);

  useEffect(() => {
    if (loading) {
      onPresenceChange?.({
        phase: "thinking",
        preview: "Thinking...",
      });
      return;
    }

    if (input.trim().length > 0) {
      onPresenceChange?.({
        phase: "typing",
        preview: input.trim().slice(0, 42),
      });
      return;
    }

    if (isFocused) {
      onPresenceChange?.({
        phase: "listening",
        preview: "I'm listening",
      });
      return;
    }

    onPresenceChange?.({
      phase: replyPreview ? "replying" : "idle",
      preview: replyPreview || undefined,
    });
  }, [input, isFocused, loading, onPresenceChange, replyPreview, replyTick]);

  useEffect(() => {
    if (!replyPreview) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setReplyPreview(null);
    }, 1800);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [replyPreview, replyTick]);

  useEffect(() => {
    let active = true;

    async function loadStatus() {
      try {
        const response = await fetch("/api/chat/status", {
          cache: "no-store",
        });
        const payload = (await response.json()) as StatusPayload;

        if (!active) {
          return;
        }

        if (!response.ok || !payload.configured) {
          setAssistantState("disabled");
          setStatusMessage("OpenAI is not configured for this deployment.");
          return;
        }

        setAssistantState("ready");
        setStatusMessage(null);
      } catch {
        if (!active) {
          return;
        }

        setAssistantState("disabled");
        setStatusMessage("OpenAI is not configured for this deployment.");
      }
    }

    void loadStatus();

    return () => {
      active = false;
    };
  }, []);

  async function sendMessage(content: string) {
    const trimmed = content.trim();

    if (!trimmed || loading || isChatDisabled) {
      return;
    }

    const nextUserMessage: Message = { role: "user", content: trimmed };
    const history = messages.map((message) => ({
      role: message.role,
      content: message.content,
    }));

    setMessages((current) => [...current, nextUserMessage]);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: trimmed,
          history,
        }),
      });

      const payload = (await response.json()) as ChatPayload;

      if (!response.ok) {
        throw new Error(payload.error || `Chat request failed (${response.status})`);
      }

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content:
            payload.answer ||
            "The assistant returned an empty response. Try a different question.",
        },
      ]);
      const preview =
        payload.answer ||
        "The assistant returned an empty response. Try a different question.";
      setReplyPreview(preview.slice(0, 42));
      setReplyTick((current) => current + 1);
    } catch (caughtError) {
      const message =
        caughtError instanceof Error
          ? caughtError.message
          : "OpenAI request could not be completed. Try again shortly.";

      setError(message);
      setSessionDisabled(true);
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: `OpenAI chat is unavailable right now. ${message}`,
        },
      ]);
      setReplyPreview("I need a moment to recover.");
      setReplyTick((current) => current + 1);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await sendMessage(input);
  }

  return (
    <section
      data-chat-mode={mode}
      className={`chat-shell ${
        isOverlay
          ? "p-0"
          : isLauncher
            ? "p-3 sm:p-4"
            : isEmbedded || isHero
              ? "p-4"
              : "p-4 sm:p-6"
      }`}
    >
      <div
        className={`chat-thread overflow-y-auto rounded-2xl p-4 ${
          isOverlay
            ? "h-[min(44svh,30rem)] sm:h-[min(48svh,34rem)] sm:p-5"
            : isLauncher
            ? "h-[220px] sm:h-[300px]"
            : isHero
              ? "h-[240px] sm:h-[260px]"
              : isEmbedded
              ? "h-[360px]"
              : "h-[460px] sm:p-5"
        }`}
      >
        <div className="space-y-4">
          <div className="chat-message-row" data-role="assistant">
            <JoshAssistantAvatar />
            <div data-role="assistant" className="chat-message text-sm">
              {introMessage}
            </div>
          </div>

          {messages.map((message, index) => (
            <div
              key={`${message.role}-${index}`}
              className="chat-message-row"
              data-role={message.role}
            >
              {message.role === "assistant" ? <JoshAssistantAvatar /> : null}
              <div
                data-role={message.role}
                className="chat-message text-sm"
                style={{ animationDelay: `${Math.min(index, 8) * 35}ms` }}
              >
                {message.content}
              </div>
            </div>
          ))}

          {loading ? (
            <div className="chat-message-row" data-role="assistant">
              <JoshAssistantAvatar />
              <div data-role="assistant" className="chat-message text-sm">
                <span className="typing-dots" aria-label="Assistant is typing">
                  <span />
                  <span />
                  <span />
                </span>
              </div>
            </div>
          ) : null}

          <div ref={endOfMessagesRef} />
        </div>
      </div>

      {disabledCardMessage ? (
        <div className="chat-disabled-card">{disabledCardMessage}</div>
      ) : (
        <form onSubmit={handleSubmit} className="chat-compose">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();

                if (canSubmit) {
                  void sendMessage(input);
                }
              }
            }}
            rows={1}
            disabled={loading || isChatDisabled}
            placeholder="Ask about Joshua's projects, stack, experience, or career focus..."
            className="chat-textarea w-full resize-none rounded-2xl px-3.5 py-1.5 text-sm outline-none transition"
          />
        </form>
      )}
    </section>
  );
}

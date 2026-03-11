"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import AssistantFigure from "@/components/AssistantFigure";
import Chatbox from "@/components/Chatbox";

type FloatingChatLauncherProps = {
  developerName: string;
};

type StatusPayload = {
  configured?: boolean;
};

export default function FloatingChatLauncher({
  developerName,
}: FloatingChatLauncherProps) {
  const pathname = usePathname();

  if (pathname === "/ai") {
    return null;
  }

  return (
    <FloatingChatLauncherInner
      key={pathname}
      developerName={developerName}
    />
  );
}

function FloatingChatLauncherInner({
  developerName,
}: FloatingChatLauncherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [presence, setPresence] = useState<{
    phase: "idle" | "listening" | "typing" | "thinking" | "replying";
    preview?: string;
  }>({
    phase: "idle",
  });
  const [assistantState, setAssistantState] = useState<
    "checking" | "ready" | "disabled"
  >("checking");
  const pathname = usePathname();

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setIsOpen(true);
    }, 260);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [pathname]);

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

        setAssistantState(response.ok && payload.configured ? "ready" : "disabled");
      } catch {
        if (!active) {
          return;
        }

        setAssistantState("disabled");
      }
    }

    void loadStatus();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  const statusLabel =
    assistantState === "ready"
      ? "OpenAI live"
      : assistantState === "checking"
        ? "Checking setup"
        : "Setup needed";
  const companionCaption =
    assistantState === "checking"
      ? "Checking OpenAI..."
      : assistantState === "disabled"
        ? "OpenAI setup needed"
        : presence.phase === "thinking"
          ? "Thinking..."
          : presence.phase === "listening"
            ? "I'm listening"
          : presence.phase === "typing"
            ? presence.preview || "Keep typing..."
            : presence.phase === "replying"
              ? "I have a reply for you"
              : "Ask me about Joshua";

  return (
    <div className="floating-chat-shell">
      {isOpen ? (
        <div
          id="floating-ai-assistant"
          className="floating-chat-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="floating-ai-title"
        >
          <button
            type="button"
            className="floating-chat-backdrop"
            aria-label="Close assistant"
            onClick={() => setIsOpen(false)}
          />

          <div className="floating-chat-stage">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="floating-chat-close floating-chat-close-overlay"
              aria-label="Close assistant"
            >
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M7 7l10 10M17 7 7 17"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="1.75"
                />
              </svg>
            </button>

            <div className="floating-chat-layout">
              <aside className="floating-chat-aside">
                <p className="floating-chat-kicker">Josh Assistant</p>
                <div className="floating-chat-aside-hero">
                  <AssistantFigure
                    active={presence.phase !== "idle"}
                    caption={companionCaption}
                    phase={presence.phase}
                  />

                  <div className="floating-chat-aside-copy">
                    <h2 id="floating-ai-title" className="floating-chat-hero-title">
                      Ask Joshua Kim&apos;s Josh Assistant first.
                    </h2>
                    <p className="floating-chat-hero-copy">
                      Explore projects, experience, technical stack, and career
                      focus in a full-screen chat layer while the portfolio stays
                      visible behind it.
                    </p>
                  </div>
                </div>

                <div className="floating-chat-badge-row">
                  <span className="floating-chat-badge">Portfolio scoped</span>
                  <span className="floating-chat-badge">Rate limited</span>
                  <span className="floating-chat-badge" data-state={assistantState}>
                    {statusLabel}
                  </span>
                </div>

                <div className="floating-chat-aside-actions">
                  <Link href="/ai" className="floating-chat-secondary-link">
                    Open dedicated page
                  </Link>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="floating-chat-dismiss"
                  >
                    Continue to portfolio
                  </button>
                  <p className="floating-chat-inline-note">
                    Press <kbd>Esc</kbd> or close at any time.
                  </p>
                </div>
              </aside>

              <div className="floating-chat-main">
                <div className="floating-chat-main-head">
                  <div className="floating-chat-mobile-actions">
                    <span className="floating-chat-mobile-title">Josh Assistant</span>
                    <div className="floating-chat-mobile-actions-end">
                      <Link href="/ai" className="floating-chat-mobile-link">
                        Full page
                      </Link>
                      <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="floating-chat-mobile-close"
                        aria-label="Close assistant"
                      >
                        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path
                            d="M7 7l10 10M17 7 7 17"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeWidth="1.75"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <p className="floating-chat-main-label">Start with a question</p>
                  <p className="floating-chat-main-copy">
                    Ask directly, or use one of the guided prompts below.
                  </p>
                </div>
                <Chatbox
                  developerName={developerName}
                  mode="overlay"
                  onPresenceChange={setPresence}
                />
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="floating-chat-button"
        data-open={isOpen}
        aria-expanded={isOpen}
        aria-controls="floating-ai-assistant"
        aria-label={isOpen ? "Close assistant" : "Open assistant"}
      >
        <span className="floating-chat-button-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M7.25 8.25h9.5M7.25 12h6.5m-8 7.25 1.31-3.5A7.75 7.75 0 1 1 19.75 12 7.75 7.75 0 0 1 8.88 19.1l-3.13.15Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.6"
            />
            <path
              d="M17.25 5.75v3m1.5-1.5h-3"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.6"
            />
          </svg>
        </span>
        <span className="floating-chat-button-label">Josh Assistant</span>
      </button>
    </div>
  );
}

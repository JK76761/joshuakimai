import Link from "next/link";
import Chatbox from "@/components/Chatbox";
import { profile } from "@/lib/data";
import { getDisplayName } from "@/lib/format";

export default function AIAssistantPage() {
  const displayName = getDisplayName(profile.name);

  return (
    <div className="max-w-5xl space-y-10">
      <header className="page-fade stagger-1 max-w-3xl space-y-4">
        <Link href="/" className="link-inline text-sm font-semibold">
          Back to home
        </Link>
        <p className="section-kicker">AI Assistant</p>
        <h1 className="section-title">AI Assistant</h1>
        <p className="section-copy">
          Ask about {displayName}&apos;s projects, experience, technical strengths,
          and career focus. This assistant uses OpenAI when configured and falls back to
          structured portfolio data if live AI is unavailable.
        </p>
        <p className="status-note" data-state="live">
          OpenAI ready with local fallback
        </p>
      </header>

      <div className="page-fade stagger-2">
        <Chatbox developerName={displayName} />
      </div>
    </div>
  );
}

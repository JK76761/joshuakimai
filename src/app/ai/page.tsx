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
        <p className="section-kicker">Assistant</p>
        <h1 className="section-title">Portfolio Assistant</h1>
        <p className="section-copy">
          Ask about {displayName}&apos;s projects, experience, technical strengths,
          and career focus. This assistant runs from structured local portfolio data, so
          it works on Vercel without API billing or extra setup.
        </p>
        <p className="status-note" data-state="live">
          Local portfolio Q&amp;A is active
        </p>
      </header>

      <div className="page-fade stagger-2">
        <Chatbox developerName={displayName} />
      </div>
    </div>
  );
}

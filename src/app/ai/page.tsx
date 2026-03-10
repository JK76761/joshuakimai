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
          and career focus. This assistant uses OpenAI to answer recruiter and project
          questions directly from Joshua&apos;s portfolio context and is rate limited for
          abuse protection.
        </p>
        <p className="status-note" data-state="live">
          OpenAI-powered, portfolio-scoped, rate limited
        </p>
      </header>

      <div className="page-fade stagger-2">
        <Chatbox developerName={displayName} />
      </div>
    </div>
  );
}

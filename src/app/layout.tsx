import type { Metadata } from "next";
import BackgroundAura from "@/components/BackgroundAura";
import DragonBackdrop from "@/components/DragonBackdrop";
import FloatingChatLauncher from "@/components/FloatingChatLauncher";
import { profile } from "@/lib/data";
import { getDisplayName } from "@/lib/format";
import "./globals.css";

export const metadata: Metadata = {
  title: "Joshua Kim | Developer Portfolio",
  description:
    "Portfolio of Joshua Kim, a full-stack developer focused on Next.js, React Native, and systems troubleshooting.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const displayName = getDisplayName(profile.name);

  return (
    <html lang="en">
      <body className="bg-[var(--bg)] text-[var(--text-primary)] antialiased">
        <div className="site-backdrop" aria-hidden="true" />
        <div className="site-aurora" aria-hidden="true" />
        <div className="site-grid" aria-hidden="true" />
        <div className="site-noise" aria-hidden="true" />
        <BackgroundAura />
        <DragonBackdrop />

        <div className="relative min-h-screen pb-8">
          <main className="mx-auto w-full max-w-6xl px-6 pb-20 pt-12 md:px-10 md:pt-16">
            {children}
          </main>
          <FloatingChatLauncher developerName={displayName} />
        </div>
      </body>
    </html>
  );
}

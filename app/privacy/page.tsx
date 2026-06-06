import Link from "next/link";

export const metadata = {
  title: "Privacy Policy — Heatmap",
  description: "How Heatmap handles your data.",
};

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Nav */}
      <nav className="border-b border-white/[0.06] px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back
          </Link>
          <span className="text-xs text-white/30">Last updated June 6, 2026</span>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00ff88]/10 border border-[#00ff88]/20 text-[#00ff88] text-xs font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88]" />
            Privacy First
          </div>
          <h1 className="text-3xl font-semibold tracking-tight mb-3">Privacy Policy</h1>
          <p className="text-white/50 text-base leading-relaxed">
            Heatmap is built on a simple principle: your data is yours. Here's exactly what we do — and don't — collect.
          </p>
        </div>

        <div className="space-y-10">
          <Section title="What we collect">
            <ul className="space-y-3">
              <ListItem>The names of applications you use — never window titles, file names, or content</ListItem>
              <ListItem>Timestamps of when you switch apps or go AFK</ListItem>
              <ListItem>All data is stored locally on your Mac only — it never leaves your device</ListItem>
            </ul>
          </Section>

          <Section title="What we don't collect">
            <ul className="space-y-3">
              <ListItem negative>No keystrokes, no screenshots, no clipboard content</ListItem>
              <ListItem negative>No personal identifiers, names, emails, or accounts</ListItem>
              <ListItem negative>No data is ever uploaded to our servers</ListItem>
            </ul>
          </Section>

          <Section title="Analytics">
            <p className="text-white/60 leading-relaxed text-sm">
              We use <a href="https://telemetrydeck.com" target="_blank" rel="noopener noreferrer" className="text-[#00ff88] hover:underline">TelemetryDeck</a> to collect anonymous, privacy-preserving usage signals (e.g. "app launched", "menu bar opened"). These signals contain no personal data and cannot be traced back to you. You can review TelemetryDeck's privacy policy at{" "}
              <a href="https://telemetrydeck.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#00ff88] hover:underline">telemetrydeck.com/privacy</a>.
            </p>
          </Section>

          <Section title="Third-party sharing">
            <p className="text-white/60 leading-relaxed text-sm">
              We never sell, rent, or share your data with anyone. Period.
            </p>
          </Section>

          <Section title="Data deletion">
            <p className="text-white/60 leading-relaxed text-sm">
              To delete all your data, simply uninstall Heatmap. All data lives in:
            </p>
            <div className="mt-3 space-y-2">
              <code className="block text-xs bg-white/[0.05] border border-white/[0.08] rounded-lg px-4 py-3 text-white/70 font-mono">
                ~/Library/Application Support/Heatmap
              </code>
              <code className="block text-xs bg-white/[0.05] border border-white/[0.08] rounded-lg px-4 py-3 text-white/70 font-mono">
                ~/Library/Preferences/rishaanjain.Heatmap.plist
              </code>
            </div>
          </Section>

          <Section title="Contact">
            <p className="text-white/60 leading-relaxed text-sm">
              Questions? Reach us at{" "}
              <a href="mailto:rishaanjain188@gmail.com" className="text-[#00ff88] hover:underline">
                rishaanjain188@gmail.com
              </a>
            </p>
          </Section>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-white/[0.06] flex items-center justify-between">
          <span className="text-xs text-white/20">© 2026 Heatmap</span>
          <Link href="/terms" className="text-xs text-white/40 hover:text-white/70 transition-colors">
            Terms & Conditions →
          </Link>
        </div>
      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-base font-semibold text-white mb-4 flex items-center gap-3">
        <span className="w-4 h-px bg-[#00ff88]/60" />
        {title}
      </h2>
      {children}
    </div>
  );
}

function ListItem({ children, negative = false }: { children: React.ReactNode; negative?: boolean }) {
  return (
    <li className="flex items-start gap-3 text-sm text-white/60 leading-relaxed">
      <span className={`mt-1 shrink-0 w-4 h-4 rounded-full flex items-center justify-center ${negative ? "bg-red-500/10" : "bg-[#00ff88]/10"}`}>
        {negative ? (
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
            <path d="M2 2l4 4M6 2L2 6" stroke="#f87171" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
        ) : (
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
            <path d="M1.5 4l2 2 3-3" stroke="#00ff88" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </span>
      {children}
    </li>
  );
}
import Link from "next/link";

export const metadata = {
  title: "Terms & Conditions — Heatmap",
  description: "Terms of use for Heatmap.",
};

export default function TermsAndConditions() {
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
            Legal
          </div>
          <h1 className="text-3xl font-semibold tracking-tight mb-3">Terms & Conditions</h1>
          <p className="text-white/50 text-base leading-relaxed">
            By downloading or using Heatmap, you agree to the following terms.
          </p>
        </div>

        <div className="space-y-10">
          <Section title="License">
            <p className="text-white/60 leading-relaxed text-sm">
              Heatmap is provided for personal, non-commercial use. You may not reverse engineer, resell, or redistribute the app or any part of it.
            </p>
          </Section>

          <Section title="No warranty">
            <p className="text-white/60 leading-relaxed text-sm">
              Heatmap is provided <span className="text-white/80 font-medium">"as is"</span> without warranty of any kind. We make no guarantees about accuracy, uptime, or fitness for a particular purpose. Use at your own discretion.
            </p>
          </Section>

          <Section title="Limitation of liability">
            <p className="text-white/60 leading-relaxed text-sm">
              To the maximum extent permitted by applicable law, the developer of Heatmap is not liable for any direct, indirect, incidental, or consequential damages arising from your use of the app.
            </p>
          </Section>

          <Section title="Accessibility permission">
            <p className="text-white/60 leading-relaxed text-sm">
              Heatmap requests macOS Accessibility permission solely to detect AFK periods. This permission is never used to read screen content, log keystrokes, or access other applications' data.
            </p>
          </Section>

          <Section title="Changes to these terms">
            <p className="text-white/60 leading-relaxed text-sm">
              We may update these terms at any time. Continued use of Heatmap after changes are posted constitutes your acceptance of the revised terms. We'll note the updated date at the top of this page.
            </p>
          </Section>

          <Section title="Contact">
            <p className="text-white/60 leading-relaxed text-sm">
              Questions about these terms? Reach us at{" "}
              <a href="mailto:rishaanjain188@gmail.com" className="text-[#00ff88] hover:underline">
                rishaanjain188@gmail.com
              </a>
            </p>
          </Section>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-white/[0.06] flex items-center justify-between">
          <span className="text-xs text-white/20">© 2026 Heatmap</span>
          <Link href="/privacy" className="text-xs text-white/40 hover:text-white/70 transition-colors">
            ← Privacy Policy
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
        <span className="w-4 h-px bg-violet-400/60" />
        {title}
      </h2>
      {children}
    </div>
  );
}
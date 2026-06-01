import Image from "next/image"
import { BlurFade } from "@/components/ui/blur-fade"
import { BorderBeam } from "@/components/ui/border-beam"
import { MagicCard } from "@/components/ui/magic-card"
import { DotPattern } from "@/components/ui/dot-pattern"
import { NumberTicker } from "@/components/ui/number-ticker"
import { GridPattern } from "@/components/ui/grid-pattern"
import { ThemeToggle } from "./components/ThemeToggle"
import AppMockup from "./components/AppMockup"

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen overflow-x-hidden bg-[var(--background)] text-[var(--foreground)]">

      {/* ── Hero ── */}
      <section className="relative pt-36 pb-16 px-6 overflow-hidden">
        {/* Dot pattern background */}
        <GridPattern
          width={32}
          height={32}
          x={-1}
          y={-1}
          className={[
            "fill-none",
            "stroke-neutral-400/[0.12] dark:stroke-neutral-600/[0.18]",
            "[mask-image:radial-gradient(ellipse_70%_55%_at_50%_0%,black_30%,transparent_100%)]",
          ].join(" ")}
        />

        {/* Green glow */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[360px] rounded-full pointer-events-none blur-3xl opacity-[0.06] dark:opacity-[0.09]"
          style={{ background: "radial-gradient(ellipse, #39d353 0%, transparent 70%)" }}
        />

        <div className="relative max-w-4xl mx-auto text-center">
          {/* Logo badge */}
          <BlurFade delay={0.0} inView>
            <div className="flex justify-center mb-8">
              <div className="p-1.5 rounded-[20px] bg-white dark:bg-[#1a1a1a] border border-black/[0.07] dark:border-white/[0.07] shadow-md shadow-black/[0.05] dark:shadow-black/30">
                <Image
                  src="/logo.png"
                  alt="Heatmap app icon"
                  width={72}
                  height={72}
                  className="rounded-[14px] block"
                  priority
                />
              </div>
            </div>
          </BlurFade>

          {/* Headline */}
          <BlurFade delay={0.08} inView>
            <h1 className="font-semibold leading-[1.06] tracking-tighter mb-6">
              <span className="block text-5xl sm:text-7xl text-neutral-900 dark:text-white">
                Your GitHub commit
              </span>
              <span className="block text-5xl sm:text-7xl text-neutral-900 dark:text-white">
                graph,{" "}
                <span className="text-[var(--green)]">for your life.</span>
              </span>
            </h1>
          </BlurFade>

          <BlurFade delay={0.14} inView>
            <p className="text-lg text-neutral-500 dark:text-neutral-400 max-w-lg mx-auto mb-10 leading-relaxed">
              Heatmap samples your frontmost app every 30 seconds and turns a year
              of data into one honest picture of how you actually spend your time.
            </p>
          </BlurFade>

          <BlurFade delay={0.2} inView>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-5">
              <a
                href="/releases/Heatmap-1.0.1.dmg"
                download
                className="inline-flex items-center gap-3 px-7 py-3.5 rounded-xl bg-[var(--green)] text-white dark:text-black font-semibold text-sm hover:opacity-90 active:scale-[0.98] transition-all duration-150 shadow-lg shadow-green-500/20"
              >
                Download for Mac
                <span className="bg-black/15 dark:bg-black/20 rounded-md px-2.5 py-0.5 text-xs font-mono">
                  $3.99
                </span>
              </a>
              <a
                href="https://github.com/RishaanJ/heatmap"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-neutral-200 dark:border-white/10 text-sm text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-white/[0.04] transition-all duration-150"
              >
                View on GitHub
              </a>
            </div>
            <p className="text-xs text-neutral-400 dark:text-neutral-600 font-mono">
              macOS 13 Ventura or later · One-time purchase, no subscription
            </p>
          </BlurFade>
        </div>
      </section>

      {/* ── App mockup ── */}
      <section className="px-6 pb-28">
        <BlurFade delay={0.3} inView>
          <div className="max-w-2xl mx-auto relative">
            <div className="relative rounded-2xl">
              <AppMockup />
              <BorderBeam
                size={120}
                duration={10}
                colorFrom="#39d353"
                colorTo="#006d32"
                borderWidth={1.5}
              />
            </div>
          </div>
        </BlurFade>
      </section>


      {/* ── Bento features ── */}
      <section className="px-6 pb-24">
        <div className="max-w-5xl mx-auto">
          <BlurFade delay={0} inView>
            <p className="text-xs font-mono text-neutral-400 dark:text-neutral-600 uppercase tracking-widest text-center mb-10">
              What&rsquo;s inside
            </p>
          </BlurFade>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">

            {/* Heatmap view — wide */}
            <BlurFade delay={0.05} inView className="sm:col-span-7">
              <MagicCard className="h-full rounded-2xl border border-neutral-200 dark:border-[#282828] bg-white dark:bg-[#141414]">
                <div className="p-7 flex flex-col justify-between min-h-56">
                  <div>
                    <span className="text-[10px] font-mono text-neutral-400 dark:text-neutral-600 uppercase tracking-widest">View 01</span>
                    <h3 className="text-xl font-semibold mt-3 mb-2 text-neutral-900 dark:text-white">52 weeks at a glance</h3>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-xs">
                      Every day of the past year coloured by how active you were. Hover any cell for an exact timestamp.
                    </p>
                  </div>
                  <MiniHeatmap />
                </div>
              </MagicCard>
            </BlurFade>

            {/* Privacy — narrow */}
            <BlurFade delay={0.1} inView className="sm:col-span-5">
              <MagicCard className="h-full rounded-2xl border border-neutral-200 dark:border-[#282828] bg-white dark:bg-[#141414]">
                <div className="p-7 flex flex-col justify-between min-h-56">
                  <div>
                    <span className="text-[10px] font-mono text-neutral-400 dark:text-neutral-600 uppercase tracking-widest">Privacy</span>
                    <h3 className="text-xl font-semibold mt-3 mb-2 text-neutral-900 dark:text-white">Stays on your Mac.</h3>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                      No cloud. No account. No Accessibility permission. SQLite on disk — the app never makes a single network request.
                    </p>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {["No network", "No account", "Local SQLite", "No Accessibility perm"].map((t) => (
                      <span key={t} className="text-xs font-mono px-2.5 py-1 rounded-md bg-neutral-100 dark:bg-[#1e1e1e] text-neutral-500 dark:text-neutral-400 border border-neutral-200 dark:border-[#2c2c2c]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </MagicCard>
            </BlurFade>

            {/* Apps view — real UI replica */}
            <BlurFade delay={0.12} inView className="sm:col-span-4">
              <MagicCard className="h-full rounded-2xl border border-neutral-200 dark:border-[#282828] bg-white dark:bg-[#141414] overflow-hidden">
                <AppsViewMockup />
              </MagicCard>
            </BlurFade>

            {/* Stats view */}
            <BlurFade delay={0.16} inView className="sm:col-span-4">
              <MagicCard className="h-full rounded-2xl border border-neutral-200 dark:border-[#282828] bg-white dark:bg-[#141414]">
                <div className="p-7">
                  <span className="text-[10px] font-mono text-neutral-400 dark:text-neutral-600 uppercase tracking-widest">View 03</span>
                  <h3 className="text-lg font-semibold mt-3 mb-2 text-neutral-900 dark:text-white">Stats that matter</h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed mb-5">
                    Peak hour, top app, best day, current streak.
                  </p>
                  <div className="grid grid-cols-2 gap-2.5">
                    {[
                      { label: "Peak hour", value: "2 PM" },
                      { label: "Streak", value: "12d" },
                      { label: "Best day", value: "Mon" },
                      { label: "Top app", value: "Xcode" },
                    ].map(({ label, value }) => (
                      <div key={label} className="rounded-xl bg-neutral-50 dark:bg-[#1c1c1c] border border-neutral-100 dark:border-[#282828] p-3">
                        <p className="text-[10px] text-neutral-400 dark:text-neutral-600 font-mono mb-1">{label}</p>
                        <p className="text-base font-semibold font-mono text-[var(--green)]">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </MagicCard>
            </BlurFade>

            {/* Lightweight */}
            <BlurFade delay={0.2} inView className="sm:col-span-4">
              <MagicCard className="h-full rounded-2xl border border-neutral-200 dark:border-[#282828] bg-white dark:bg-[#141414]">
                <div className="p-7 flex flex-col justify-between min-h-48">
                  <div>
                    <span className="text-[10px] font-mono text-neutral-400 dark:text-neutral-600 uppercase tracking-widest">By design</span>
                    <h3 className="text-lg font-semibold mt-3 mb-2 text-neutral-900 dark:text-white">Invisible when idle</h3>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                      Pure SwiftUI, zero dependencies. Only system frameworks: AppKit, SQLite3, ServiceManagement.
                    </p>
                  </div>
                  {/* Fake CPU chart */}
                  <div className="mt-6 flex items-end gap-[3px] h-8">
                    {[0.18, 0.12, 0.15, 0.10, 0.13, 0.11, 0.14, 0.10, 0.12, 0.13, 0.11, 0.12].map((v, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-[2px]"
                        style={{ height: `${v * 100}%`, backgroundColor: "var(--green)", opacity: 0.4 + i * 0.04 }}
                      />
                    ))}
                    <span className="ml-1.5 text-[10px] font-mono text-neutral-400 dark:text-neutral-600 self-center">CPU</span>
                  </div>
                </div>
              </MagicCard>
            </BlurFade>

          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="px-6 pb-24">
        <div className="max-w-3xl mx-auto">
          <BlurFade delay={0} inView>
            <p className="text-xs font-mono text-neutral-400 dark:text-neutral-600 uppercase tracking-widest text-center mb-10">How it works</p>
          </BlurFade>
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-neutral-200 dark:divide-[#222] rounded-2xl border border-neutral-200 dark:border-[#222] overflow-hidden">
            {[
              { n: "01", title: "Runs silently", body: "Samples your frontmost app every 30 seconds. You'll forget it's running." },
              { n: "02", title: "Stores locally", body: "Every session written to SQLite in ~/Library. Nothing leaves your machine." },
              { n: "03", title: "Shows the truth", body: "Open the menu bar icon — see a full year of your attention in one grid." },
            ].map(({ n, title, body }, i) => (
              <BlurFade key={n} delay={0.05 + i * 0.07} inView>
                <div className="bg-white dark:bg-[#141414] p-7 h-full">
                  <span className="font-mono text-xs text-[var(--green)] opacity-70 block mb-4">{n}</span>
                  <h4 className="font-semibold mb-2 text-neutral-900 dark:text-white">{title}</h4>
                  <p className="text-sm text-neutral-500 dark:text-neutral-500 leading-relaxed">{body}</p>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing / CTA ── */}
      <section className="px-6 pb-28">
        <BlurFade delay={0} inView>
          <div className="max-w-xl mx-auto text-center">
            <div className="relative rounded-2xl border border-[var(--green)]/25 dark:border-[#2a2a2a] bg-neutral-50 dark:bg-[#141414] p-10 overflow-hidden">
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(57,211,83,0.07), transparent)",
                }}
              />
              <p className="text-[10px] font-mono text-[var(--green)] opacity-70 uppercase tracking-widest mb-6">Pricing</p>
              <div className="flex items-baseline justify-center gap-1 mb-2">
                <span className="text-6xl font-bold text-neutral-900 dark:text-white tracking-tight">$3</span>
                <span className="text-4xl font-bold text-neutral-900 dark:text-white">.99</span>
              </div>
              <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-8">One-time purchase. No subscription. Ever.</p>
              <a
                href="/releases/Heatmap-1.0.1.dmg"
                download
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[var(--green)] text-white dark:text-black font-semibold text-sm hover:opacity-90 active:scale-[0.98] transition-all duration-150 shadow-lg shadow-green-500/20"
              >
                Download for Mac
              </a>
              <p className="mt-5 text-xs text-neutral-400 dark:text-neutral-600 font-mono">macOS 13 Ventura or later</p>
              <BorderBeam size={100} duration={12} colorFrom="#39d353" colorTo="#006d32" borderWidth={1} />
            </div>
          </div>
        </BlurFade>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-neutral-200 dark:border-[#222] px-6 py-8 mt-auto">
        <div className="max-w-5xl mx-auto flex items-center justify-between flex-wrap gap-3">
          <span className="text-xs text-neutral-400 dark:text-neutral-600 font-mono">
            Heatmap · v1.0.0 "Higashikata" · MIT
          </span>
          <a
            href="https://github.com/RishaanJ/heatmap"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors font-mono"
          >
            GitHub ↗
          </a>
        </div>
      </footer>
    </main>
  )
}

/* ── Inline sub-components ── */

function MiniHeatmap() {
  const COLS = 26
  const ROWS = 7
  function seeded(s: number) {
    const x = Math.sin(s + 1) * 10000
    return x - Math.floor(x)
  }
  const lightColors = ["#e9ecef", "#bbf7d0", "#4ade80", "#16a34a", "#15803d"]
  const darkColors = ["#1a1a1a", "#0e4429", "#006d32", "#26a641", "#39d353"]

  function bucket(v: number) {
    if (v === 0) return 0
    if (v < 0.25) return 1
    if (v < 0.5) return 2
    if (v < 0.75) return 3
    return 4
  }

  const grid = Array.from({ length: COLS }, (_, c) =>
    Array.from({ length: ROWS }, (_, r) => {
      const s = seeded(c * ROWS + r)
      const isWeekend = r === 0 || r === 6
      const recent = c > COLS - 8
      const v = isWeekend ? (s < 0.3 ? s : 0) : recent ? Math.min(1, s + 0.3) : s < 0.6 ? s : 0
      return bucket(v)
    })
  )

  return (
    <div className="mt-5 flex gap-[3px] overflow-hidden" aria-hidden="true">
      {grid.map((col, c) => (
        <div key={c} className="flex flex-col gap-[3px]">
          {col.map((b, r) => (
            <div key={r} className="w-[10px] h-[10px] rounded-[2px]">
              {/* light */}
              <div
                className="w-full h-full rounded-[2px] dark:hidden"
                style={{ backgroundColor: lightColors[b] }}
              />
              {/* dark */}
              <div
                className="w-full h-full rounded-[2px] hidden dark:block"
                style={{ backgroundColor: darkColors[b] }}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

function AppsViewMockup() {
  const apps = [
    {
      name: "Arc",
      time: "34m",
      cat: "Browser",
      catColor: "#a78bfa",
      catBg: "rgba(167,139,250,0.12)",
      icon: <Image src="/arc.webp" alt="Arc" width={32} height={32} className="rounded-[8px] flex-shrink-0" />,
    },
    {
      name: "Claude",
      time: "20m",
      cat: "Coding",
      catColor: "#fb923c",
      catBg: "rgba(251,146,60,0.12)",
      icon: <Image src="/claude.png" alt="Claude" width={32} height={32} className="rounded-[8px] flex-shrink-0" />,
    },
    {
      name: "Xcode",
      time: "8m",
      cat: "Coding",
      catColor: "#60a5fa",
      catBg: "rgba(96,165,250,0.12)",
      icon: <Image src="/xcode.png" alt="Xcode" width={32} height={32} className="rounded-[8px] flex-shrink-0" />,
    },
    {
      name: "Heatmap",
      time: "5m",
      cat: "Coding",
      catColor: "#4ade80",
      catBg: "rgba(74,222,128,0.12)",
      icon: <Image src="/logo.png" alt="Heatmap" width={32} height={32} className="rounded-[8px] flex-shrink-0" />,
    },
  ]

  return (
    <div className="p-4 flex flex-col gap-3">
      {/* Mini tab bar */}
      <div className="flex items-center justify-between">
        <div className="flex gap-0.5 bg-black/[0.04] dark:bg-white/[0.05] rounded-lg p-0.5">
          {["Heatmap", "Apps", "Stats"].map((t, i) => (
            <span
              key={t}
              className="px-2.5 py-1 text-[11px] font-medium rounded-md"
              style={{
                background: i === 1 ? "white" : "transparent",
                color: i === 1 ? "#111" : undefined,
                boxShadow: i === 1 ? "0 1px 3px rgba(0,0,0,0.12)" : undefined,
              }}
            >
              <span className={i !== 1 ? "text-neutral-400 dark:text-neutral-500" : ""}>{t}</span>
            </span>
          ))}
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--green)]" />
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-400 dark:text-neutral-500" aria-hidden="true">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>
          </svg>
        </div>
      </div>

      {/* Time header */}
      <div className="flex items-end justify-between">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-neutral-900 dark:text-white tracking-tight">1h 12m</span>
          <span className="text-xs text-neutral-400 dark:text-neutral-500 mb-0.5">today</span>
        </div>
        {/* Today / This Week toggle */}
        <div className="flex gap-0.5 bg-black/[0.04] dark:bg-white/[0.05] rounded-lg p-0.5">
          {["Today", "This Week"].map((t, i) => (
            <span
              key={t}
              className="px-2 py-0.5 text-[10px] font-medium rounded-md"
              style={{
                background: i === 0 ? "white" : "transparent",
                color: i === 0 ? "#111" : undefined,
                boxShadow: i === 0 ? "0 1px 2px rgba(0,0,0,0.1)" : undefined,
              }}
            >
              <span className={i !== 0 ? "text-neutral-400 dark:text-neutral-500" : ""}>{t}</span>
            </span>
          ))}
        </div>
      </div>

      {/* App rows */}
      <div className="flex flex-col divide-y divide-neutral-100 dark:divide-white/[0.04]">
        {apps.map(({ name, time, cat, catColor, catBg, icon }) => (
          <div key={name} className="flex items-center gap-3 py-2.5 first:pt-1">
            {icon}
            <span className="flex-1 text-sm font-medium text-neutral-800 dark:text-neutral-100 truncate">{name}</span>
            <span
              className="text-[10px] font-medium px-2 py-0.5 rounded-full flex-shrink-0"
              style={{ color: catColor, background: catBg }}
            >
              {cat}
            </span>
            <span className="text-xs font-mono text-neutral-400 dark:text-neutral-500 flex-shrink-0 w-8 text-right">{time}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

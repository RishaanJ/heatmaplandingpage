// Matches the actual SwiftUI HeatmapView exactly:
// - 11×11 cells, cornerRadius 2, gap 2px between cells, 2px between columns
// - Day labels: 9pt, Month labels: 9pt
// - StatChip: label 10pt tertiary, value 20pt semibold monospacedDigit
// - Legend squares: 11×11, cornerRadius 2
// - HourlyBarChart below a divider

// ── Deterministic cell data ──────────────────────────────────────────────────
function seeded(s: number) {
  const x = Math.sin(s + 1) * 10000
  return x - Math.floor(x)
}

const WEEKS = 52
const DAYS = 7
const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

// Build 52 weeks of fake data that looks realistic
const cellLevels: number[][] = Array.from({ length: WEEKS }, (_, w) =>
  Array.from({ length: DAYS }, (_, d) => {
    const s = seeded(w * DAYS + d + 7)
    const isWeekend = d === 0 || d === 6
    const isFuture = w === WEEKS - 1 && d > 2 // last few days = future
    if (isFuture) return -1
    if (isWeekend) return s < 0.25 ? Math.ceil(s * 4) : 0
    const recent = w > WEEKS - 6
    if (recent) return Math.ceil(Math.min(4, (s + 0.3) * 4))
    return s < 0.5 ? Math.ceil(s * 4) : 0
  })
)

// Month label: show month name when first week that contains the 1st–7th
function monthLabel(weekIdx: number): string {
  // Fake month progression over 52 weeks
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
  const monthStartWeeks = [0, 4, 9, 13, 18, 22, 27, 31, 35, 40, 44, 48]
  const idx = monthStartWeeks.indexOf(weekIdx)
  return idx >= 0 ? months[idx] : ""
}

// Theme.heatmap colors — dark mode (matches the real app screenshot)
const DARK_COLORS = ["#216830", "#0e4429", "#006d32", "#26a641", "#39d353"]
// Level -1 = future = Color(white: 0.13)
const DARK_FUTURE = "#212121"
const DARK_EMPTY  = "#2d333b" // level 0, no activity

// Light mode greens
const LIGHT_COLORS = ["#cae8c3", "#b5e0ac", "#6cc644", "#2ea043", "#196c2e"]
const LIGHT_FUTURE = "#eaeef2"
const LIGHT_EMPTY  = "#ebedf0"

function cellBg(level: number, dark: boolean): string {
  if (level === -1) return dark ? DARK_FUTURE : LIGHT_FUTURE
  if (level === 0)  return dark ? DARK_EMPTY  : LIGHT_EMPTY
  const colors = dark ? DARK_COLORS : LIGHT_COLORS
  return colors[Math.min(level, 4) - 1] ?? (dark ? DARK_EMPTY : LIGHT_EMPTY)
}

// Hourly data (matches HourlyBarChart shape)
const HOURLY_RAW = [
  0, 0, 0, 0, 0, 0, 0, 0,   // 0–7
  0, 5, 12, 18, 22, 15,      // 8–13
  28, 35, 42, 38,            // 14–17
  30, 25, 45, 55, 40, 10,    // 18–23
]
const MAX_HOURLY = Math.max(...HOURLY_RAW)

function barColor(v: number, dark: boolean): string {
  const ratio = v / MAX_HOURLY
  if (dark) {
    if (ratio > 0.7) return "#39d353"
    if (ratio > 0.4) return "#26a641"
    if (ratio > 0.1) return "#006d32"
    return "transparent"
  }
  if (ratio > 0.7) return "#2ea043"
  if (ratio > 0.4) return "#4caf50"
  if (ratio > 0.1) return "#94d68c"
  return "transparent"
}

// ── Component ────────────────────────────────────────────────────────────────
export default function AppMockup() {
  return (
    <div className="rounded-[18px] overflow-hidden border shadow-2xl"
      style={{
        // Matches macOS dark panel
        background: "linear-gradient(180deg, #252529 0%, #1e1e21 100%)",
        borderColor: "rgba(255,255,255,0.1)",
        boxShadow: "0 32px 80px rgba(0,0,0,0.7), 0 8px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
      }}
      role="img"
      aria-label="Heatmap app — Heatmap view"
    >
      {/* ── Tab bar ── */}
      <div className="flex items-center justify-between px-5 pt-4 pb-3">
        <div className="flex gap-[3px]">
          {["Heatmap", "Apps", "Stats"].map((tab, i) => (
            <div
              key={tab}
              className="px-3.5 py-1.5 rounded-[8px] text-[13px] font-medium select-none"
              style={{
                background: i === 0 ? "rgba(255,255,255,0.92)" : "transparent",
                color: i === 0 ? "#000" : "rgba(255,255,255,0.4)",
                boxShadow: i === 0 ? "0 1px 4px rgba(0,0,0,0.25)" : undefined,
              }}
            >
              {tab}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full" style={{ background: "#39d353" }} />
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="rgba(255,255,255,0.45)" strokeWidth="1.5"
            strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>
          </svg>
        </div>
      </div>

      {/* ── Stat strip (matches StatChip × 2) ── */}
      {/* padding: horizontal 20, top 16→already in tab, bottom 14 */}
      <div className="flex items-start justify-between px-5 pt-1 pb-3.5">
        {/* Today — highlighted */}
        <div className="flex flex-col gap-[2px]">
          <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.35)" }}>Today</span>
          <span className="text-[20px] font-semibold tabular-nums leading-tight" style={{ color: "#39d353" }}>
            1h 12m
          </span>
        </div>
        {/* This week — normal */}
        <div className="flex flex-col gap-[2px] items-end">
          <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.35)" }}>This week</span>
          <span className="text-[20px] font-semibold tabular-nums leading-tight" style={{ color: "rgba(255,255,255,0.9)" }}>
            6h 48m
          </span>
        </div>
      </div>

      {/* ── Heatmap grid ── */}
      {/* HStack(alignment: .top, spacing: 6) { dayLabels + ScrollView } */}
      {/* padding: horizontal 14 */}
      <div className="px-[14px] flex items-start gap-[6px]">
        {/* Day labels — VStack(alignment: .trailing, spacing: 2), paddingTop 14 */}
        <div className="flex flex-col gap-[2px] pt-[14px] shrink-0">
          {DAY_LABELS.map((d) => (
            <span
              key={d}
              className="text-right font-mono leading-none"
              style={{
                fontSize: "9px",
                color: "rgba(255,255,255,0.3)",
                height: "11px",
                lineHeight: "11px",
                width: "20px",
              }}
            >
              {d}
            </span>
          ))}
        </div>

        {/* Scrollable grid — show last 28 weeks, right-aligned (most recent on right) */}
        <div className="flex-1 overflow-hidden" style={{ maskImage: "linear-gradient(to right, transparent 0%, black 6%)" }}>
          <div className="flex gap-[2px]" style={{ justifyContent: "flex-end" }}>
            {cellLevels.slice(-28).map((week, wi) => {
              const globalW = WEEKS - 28 + wi
              const label = monthLabel(globalW)
              return (
                <div key={wi} className="flex flex-col gap-[2px]">
                  {/* Month label row: height 12 */}
                  <div style={{ height: "12px", width: "11px" }}>
                    {label && (
                      <span className="font-mono whitespace-nowrap" style={{ fontSize: "9px", color: "rgba(255,255,255,0.3)", lineHeight: "12px" }}>
                        {label}
                      </span>
                    )}
                  </div>
                  {/* Cells */}
                  {week.map((level, d) => (
                    <div
                      key={d}
                      style={{
                        width: "11px",
                        height: "11px",
                        borderRadius: "2px",
                        backgroundColor: cellBg(level, true),
                      }}
                    />
                  ))}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── Legend ── */}
      {/* HStack(spacing:5), horizontal 20, top 8, bottom 14 */}
      <div className="flex items-center gap-[5px] px-5 pt-2 pb-3.5">
        <span className="font-mono" style={{ fontSize: "9px", color: "rgba(255,255,255,0.3)" }}>Less</span>
        {[DARK_EMPTY, ...DARK_COLORS].map((col, i) => (
          <div key={i} style={{ width: "11px", height: "11px", borderRadius: "2px", backgroundColor: col }} />
        ))}
        <span className="font-mono" style={{ fontSize: "9px", color: "rgba(255,255,255,0.3)" }}>More</span>
      </div>

      {/* ── Divider ── */}
      <div style={{ height: "1px", background: "rgba(255,255,255,0.12)", margin: "0" }} />

      {/* ── Hourly bar chart ── */}
      {/* HourlyBarChart: horizontal 20, vertical 14 */}
      <div className="px-5 py-3.5">
        <p className="font-medium mb-2.5" style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)" }}>
          By hour this week
        </p>
        <div className="relative">
          {/* Bars */}
          <div className="flex items-end gap-[2px]" style={{ height: "44px" }}>
            {HOURLY_RAW.map((v, i) => (
              <div
                key={i}
                className="flex-1 rounded-[2px]"
                style={{
                  height: v > 0 ? `${Math.max((v / MAX_HOURLY) * 100, 8)}%` : "0%",
                  backgroundColor: barColor(v, true),
                }}
              />
            ))}
          </div>
          {/* Baseline */}
          <div style={{ height: "1px", background: "rgba(255,255,255,0.1)", margin: "3px 0 3px" }} />
          {/* Hour axis labels */}
          <div className="flex justify-between">
            {[
              { label: "9a",  idx: 9 },
              { label: "12p", idx: 12 },
              { label: "3p",  idx: 15 },
              { label: "6p",  idx: 18 },
              { label: "9p",  idx: 21 },
            ].map(({ label }) => (
              <span
                key={label}
                className="font-mono"
                style={{ fontSize: "9px", color: "rgba(255,255,255,0.3)" }}
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

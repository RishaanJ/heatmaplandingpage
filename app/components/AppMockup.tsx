function seeded(s: number) {
  const x = Math.sin(s + 1) * 10000
  return x - Math.floor(x)
}

const WEEKS = 20
const DAYS = 7
const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const MONTH_LABELS = ["Jul", "Aug", "Sep", "Oct", "Nov"]

const HOURLY = [
  0, 0, 0, 0, 0, 0, 0, 0, 0,
  0.1, 0.2, 0.3, 0.25, 0.15, 0.35, 0.45, 0.55, 0.65,
  0.8, 1, 0.85, 0.45, 0.15, 0,
]

function cellColor(v: number, light: boolean): string {
  if (light) {
    if (v === 0) return "#e9ecef"
    if (v < 0.25) return "#bbf7d0"
    if (v < 0.5) return "#4ade80"
    if (v < 0.75) return "#16a34a"
    return "#15803d"
  }
  if (v === 0) return "#2d333b"
  if (v < 0.25) return "#0e4429"
  if (v < 0.5) return "#006d32"
  if (v < 0.75) return "#26a641"
  return "#39d353"
}

function barColor(v: number, light: boolean): string {
  if (light) {
    if (v > 0.7) return "#16a34a"
    if (v > 0.4) return "#22c55e"
    if (v > 0.1) return "#86efac"
    return "transparent"
  }
  if (v > 0.7) return "#39d353"
  if (v > 0.4) return "#26a641"
  if (v > 0.1) return "#006d32"
  return "transparent"
}

const HOUR_TICKS = [9, 12, 15, 18, 21]
const maxHourly = Math.max(...HOURLY)

const cells: number[][] = Array.from({ length: WEEKS }, (_, w) =>
  Array.from({ length: DAYS }, (_, d) => {
    const s = seeded(w * DAYS + d)
    const isWeekend = d === 0 || d === 6
    const recent = w > WEEKS - 5
    if (isWeekend) return s < 0.2 ? 0.1 : 0
    if (recent) return Math.min(1, s * 0.6 + 0.1)
    return s < 0.55 ? s * 0.8 : 0
  })
)

// Light variant (used on light-mode pages via CSS class)
export default function AppMockup() {
  return (
    <>
      {/* Dark mockup */}
      <div className="dark:block hidden">
        <MockupInner light={false} />
      </div>
      {/* Light mockup */}
      <div className="dark:hidden block">
        <MockupInner light={true} />
      </div>
    </>
  )
}

function MockupInner({ light }: { light: boolean }) {
  const bg = light ? "#f0f4f8" : "#1a1a1c"
  const tabBg = light ? "#ffffff" : "#ffffff"
  const tabText = light ? "#000000" : "#000000"
  const inactiveTab = light ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.45)"
  const labelColor = light ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.35)"
  const green = light ? "#16a34a" : "#39d353"
  const baseText = light ? "#111111" : "#ffffff"
  const divider = light ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.1)"
  const gearStroke = light ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.5)"

  return (
    <div
      className="rounded-2xl overflow-hidden shadow-2xl border"
      style={{
        background: bg,
        borderColor: light ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.08)",
        boxShadow: light
          ? "0 25px 60px rgba(0,0,0,0.12), 0 8px 20px rgba(0,0,0,0.06)"
          : "0 25px 60px rgba(0,0,0,0.6), 0 8px 20px rgba(0,0,0,0.3)",
      }}
      role="img"
      aria-label="Heatmap app screenshot"
    >
      {/* Tab bar */}
      <div className="px-5 pt-4 pb-3 flex items-center justify-between">
        <div className="flex gap-1">
          {["Heatmap", "Apps", "Stats"].map((tab, i) => (
            <div
              key={tab}
              className="px-4 py-1.5 rounded-lg text-sm font-medium select-none"
              style={{
                background: i === 0 ? tabBg : "transparent",
                color: i === 0 ? tabText : inactiveTab,
                boxShadow: i === 0 && light ? "0 1px 3px rgba(0,0,0,0.1)" : undefined,
              }}
            >
              {tab}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: green }} />
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={gearStroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
          </svg>
        </div>
      </div>

      {/* Stats */}
      <div className="px-5 pb-4 flex items-end justify-between">
        <div>
          <p className="text-xs mb-0.5" style={{ color: labelColor }}>Today</p>
          <p className="text-3xl font-semibold" style={{ color: green }}>51m</p>
        </div>
        <div className="text-right">
          <p className="text-xs mb-0.5" style={{ color: labelColor }}>This week</p>
          <p className="text-3xl font-semibold" style={{ color: baseText }}>51m</p>
        </div>
      </div>

      {/* Heatmap grid */}
      <div className="px-5 pb-4">
        <div className="flex mb-1 ml-10">
          {MONTH_LABELS.map((m) => (
            <span key={m} className="text-[11px] font-mono flex-1 first:text-left text-center" style={{ color: labelColor }}>
              {m}
            </span>
          ))}
        </div>
        <div className="flex gap-1">
          <div className="flex flex-col gap-[4px] w-9 shrink-0">
            {DAY_LABELS.map((d) => (
              <span key={d} className="text-[11px] font-mono h-[14px] leading-[14px] text-right pr-1" style={{ color: labelColor }}>
                {d}
              </span>
            ))}
          </div>
          <div className="flex gap-[4px] flex-1">
            {cells.map((week, w) => (
              <div key={w} className="flex flex-col gap-[4px] flex-1">
                {week.map((v, d) => {
                  const bucket = v === 0 ? 0 : v < 0.25 ? 0.15 : v < 0.5 ? 0.35 : v < 0.75 ? 0.6 : 1
                  return (
                    <div key={d} className="rounded-[3px] w-full aspect-square" style={{ backgroundColor: cellColor(bucket, light) }} />
                  )
                })}
              </div>
            ))}
          </div>
        </div>
        {/* Legend */}
        <div className="flex items-center gap-2 mt-3">
          <span className="text-[11px] font-mono" style={{ color: labelColor }}>Less</span>
          {[0, 0.15, 0.35, 0.6, 1].map((v) => (
            <div key={v} className="w-3 h-3 rounded-[3px]" style={{ backgroundColor: cellColor(v, light) }} />
          ))}
          <span className="text-[11px] font-mono" style={{ color: labelColor }}>More</span>
        </div>
      </div>

      {/* Hourly chart */}
      <div className="px-5 pb-5">
        <p className="text-xs mb-3 font-medium" style={{ color: labelColor }}>By hour this week</p>
        <div className="relative h-20">
          <div className="flex items-end gap-[3px] h-16">
            {HOURLY.map((v, i) => (
              <div
                key={i}
                className="flex-1 rounded-[2px]"
                style={{
                  height: `${Math.max((v / maxHourly) * 100, v > 0 ? 6 : 0)}%`,
                  backgroundColor: barColor(v, light),
                }}
              />
            ))}
          </div>
          <div className="h-px mt-1" style={{ backgroundColor: divider }} />
          <div className="flex justify-between mt-1">
            {HOUR_TICKS.map((h) => (
              <span key={h} className="text-[11px] font-mono" style={{ color: labelColor }}>
                {h > 12 ? `${h - 12}p` : `${h}a`}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

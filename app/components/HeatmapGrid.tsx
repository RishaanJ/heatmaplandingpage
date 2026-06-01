"use client";

const WEEKS = 52;
const DAYS = 7;

function seededRandom(seed: number): number {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

function getColor(intensity: number): string {
  if (intensity === 0) return "#1a1a1a";
  if (intensity < 0.25) return "#0e4429";
  if (intensity < 0.5) return "#006d32";
  if (intensity < 0.75) return "#26a641";
  return "#39d353";
}

export default function HeatmapGrid() {
  const cells: number[][] = [];

  for (let w = 0; w < WEEKS; w++) {
    const week: number[] = [];
    for (let d = 0; d < DAYS; d++) {
      const seed = w * DAYS + d;
      const rand = seededRandom(seed);
      // Simulate realistic activity: mostly active weekdays, quieter weekends
      const isWeekend = d === 0 || d === 6;
      const base = isWeekend ? 0.3 : 0.65;
      const raw = rand < base ? rand / base : 0;
      const intensity = w < WEEKS - 1 ? Math.round(raw * 4) / 4 : 0;
      week.push(intensity);
    }
    cells.push(week);
  }

  // Make last few weeks more active (recent activity)
  for (let w = WEEKS - 6; w < WEEKS - 1; w++) {
    for (let d = 1; d < 6; d++) {
      cells[w][d] = Math.min(1, cells[w][d] + 0.4);
    }
  }

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const today = new Date();
  const monthLabels: { label: string; week: number }[] = [];
  let lastMonth = -1;
  for (let w = 0; w < WEEKS; w++) {
    const d = new Date(today);
    d.setDate(d.getDate() - (WEEKS - w) * 7);
    const m = d.getMonth();
    if (m !== lastMonth) {
      monthLabels.push({ label: months[m], week: w });
      lastMonth = m;
    }
  }

  return (
    <div className="overflow-x-auto" role="img" aria-label="52-week activity heatmap">
      {/* Month labels */}
      <div className="relative flex mb-1 ml-7">
        {monthLabels.map(({ label, week }) => (
          <span
            key={`${label}-${week}`}
            className="absolute text-[10px] text-white/30 font-mono"
            style={{ left: `${(week / WEEKS) * 100}%` }}
          >
            {label}
          </span>
        ))}
      </div>

      <div className="flex gap-[3px]">
        {/* Day labels */}
        <div className="flex flex-col gap-[3px] mr-1">
          {["", "M", "", "W", "", "F", ""].map((label, i) => (
            <span key={i} className="text-[10px] text-white/25 font-mono h-[10px] leading-[10px] w-4 text-right">
              {label}
            </span>
          ))}
        </div>

        {/* Grid */}
        {cells.map((week, w) => (
          <div key={w} className="flex flex-col gap-[3px]">
            {week.map((intensity, d) => (
              <div
                key={d}
                className="heatmap-cell w-[10px] h-[10px]"
                style={{ backgroundColor: getColor(intensity) }}
                title={intensity > 0 ? `${Math.round(intensity * 8)}h active` : "No activity"}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

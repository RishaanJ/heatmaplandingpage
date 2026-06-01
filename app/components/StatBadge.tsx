interface StatBadgeProps {
  label: string;
  value: string;
  accent?: boolean;
}

export default function StatBadge({ label, value, accent }: StatBadgeProps) {
  return (
    <div>
      <p className="text-xs text-white/30 mb-0.5 font-mono">{label}</p>
      <p className={`text-lg font-semibold font-mono ${accent ? "text-[#39d353]" : "text-white"}`}>
        {value}
      </p>
    </div>
  );
}

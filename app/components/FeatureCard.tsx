import { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-[#111111] p-6 hover:border-white/[0.14] transition-colors duration-200">
      <div className="w-9 h-9 rounded-lg bg-[#39d353]/10 flex items-center justify-center text-[#39d353] mb-4">
        {icon}
      </div>
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm text-white/45 leading-relaxed">{description}</p>
    </div>
  );
}

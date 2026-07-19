import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  title: string;
  value: string;
  description: string;
}

export default function StatCard({
  icon: Icon,
  title,
  value,
  description,
}: StatCardProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-indigo-500 hover:shadow-lg">
      <Icon className="h-8 w-8 text-indigo-400" />

      <p className="mt-4 text-sm text-slate-400">
        {title}
      </p>

      <h2 className="mt-1 text-3xl font-bold text-white">
        {value}
      </h2>

      <p className="mt-2 text-sm text-slate-500">
        {description}
      </p>
    </div>
  );
}
import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Topbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-800 bg-slate-950 px-8">
      <div className="w-80">
        <Input placeholder="Search projects..." />
      </div>

      <div className="flex items-center gap-6">
        <Bell className="text-slate-300" />

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white">
          N
        </div>
      </div>
    </header>
  );
}
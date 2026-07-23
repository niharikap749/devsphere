import {
  Home,
  MessageSquare,
  Code2,
  Bug,
  FileCode2,
  FolderKanban,
  Settings,
} from "lucide-react";

const menuItems = [
  { icon: Home, label: "Dashboard" },
  { icon: MessageSquare, label: "AI Chat" },
  { icon: Code2, label: "Code Generator" },
  { icon: Bug, label: "Debug Assistant" },
  { icon: FileCode2, label: "README Generator" },
  { icon: FolderKanban, label: "Projects" },
];

export default function Sidebar() {
  return (
    <aside className="w-72 bg-zinc-950 border-r border-zinc-800 flex flex-col">
      <div className="p-6 border-b border-zinc-800">
        <h1 className="text-3xl font-bold text-white">
          🚀 DevSphere
        </h1>

        <p className="text-zinc-400 mt-2">
          AI Developer Workspace
        </p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map(({ icon: Icon, label }) => (
          <button
            key={label}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-zinc-300 transition hover:bg-zinc-900 hover:text-white"
          >
            <Icon size={20} />
            {label}
          </button>
        ))}
      </nav>

      <div className="border-t border-zinc-800 p-4">
        <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-zinc-300 hover:bg-zinc-900">
          <Settings size={20} />
          Settings
        </button>
      </div>
    </aside>
  );
}
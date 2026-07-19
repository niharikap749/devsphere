import {
    LayoutDashboard,
    FolderKanban,
    Brain,
    GitBranch,
    FileText,
    Settings,
  } from "lucide-react";
  
  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard" },
    { icon: FolderKanban, label: "Projects" },
    { icon: Brain, label: "AI Workspace" },
    { icon: GitBranch, label: "GitHub" },
    { icon: FileText, label: "Documents" },
    { icon: Settings, label: "Settings" },
  ];
  
  export default function Sidebar() {
    return (
      <aside className="flex h-screen w-64 flex-col border-r border-slate-800 bg-slate-950 p-6">
        <h1 className="mb-10 text-2xl font-bold text-white">
          DevSphere
        </h1>
  
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
  
            return (
              <button
                key={item.label}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-slate-300 transition hover:bg-slate-800 hover:text-white"
              >
                <Icon size={20} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </aside>
    );
  }
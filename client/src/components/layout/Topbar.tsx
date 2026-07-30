import { Sparkles } from "lucide-react";
import { useLocation } from "react-router-dom";

export default function Topbar() {
  const location = useLocation();

  let title = "Dashboard";
  let subtitle = "Manage your projects and workspace";

  switch (location.pathname) {
    case "/dashboard":
      title = "Dashboard";
      subtitle = "Manage your projects and workspace";
      break;

    case "/ai":
      title = "DevSphere AI";
      subtitle = "Your AI-powered developer workspace";
      break;

    case "/projects":
      title = "Projects";
      subtitle = "Manage your development projects";
      break;

    case "/settings":
      title = "Settings";
      subtitle = "Customize your DevSphere workspace";
      break;

    default:
      title = "DevSphere";
      subtitle = "AI Developer Workspace";
  }

  return (
    <header className="flex items-center justify-between border-b border-zinc-800 bg-zinc-950 px-10 py-6">
      <div>
        <h1 className="text-4xl font-bold text-white">
          {title}
        </h1>

        <p className="mt-2 text-zinc-400">
          {subtitle}
        </p>
      </div>

      <div className="flex items-center gap-2 rounded-full bg-blue-600/20 px-5 py-3 text-blue-400">
        <Sparkles size={18} />
        <span className="font-medium">
          AI Ready
        </span>
      </div>
    </header>
  );
}
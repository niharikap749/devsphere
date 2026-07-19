import {
    FolderKanban,
    Brain,
    FileText,
    CheckSquare,
  } from "lucide-react";
  
  import StatCard from "./StatCard";
  
  const stats = [
    {
      icon: FolderKanban,
      title: "Projects",
      value: "12",
      description: "Active development projects",
    },
    {
      icon: Brain,
      title: "AI Chats",
      value: "48",
      description: "Conversations with AI",
    },
    {
      icon: FileText,
      title: "Documents",
      value: "18",
      description: "Knowledge base files",
    },
    {
      icon: CheckSquare,
      title: "Tasks",
      value: "27",
      description: "Pending sprint tasks",
    },
  ];
  
  export default function StatsGrid() {
    return (
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard
            key={stat.title}
            icon={stat.icon}
            title={stat.title}
            value={stat.value}
            description={stat.description}
          />
        ))}
      </div>
    );
  }
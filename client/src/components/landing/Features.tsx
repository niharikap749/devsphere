import {
    Brain,
    Database,
    FolderKanban,
    GitBranch,
  } from "lucide-react";
  
  import FeatureCard from "./FeatureCard";
  
  const features = [
    {
      icon: Brain,
      title: "AI Workspace",
      description:
        "Generate code, documentation, sprint plans, and summaries using AI.",
    },
    {
      icon: Database,
      title: "RAG Search",
      description:
        "Upload project documentation and chat with your knowledge base.",
    },
    {
      icon: FolderKanban,
      title: "Project Management",
      description:
        "Manage tasks, projects, and developer workflows in one place.",
    },
    {
        icon: GitBranch,
        title: "GitHub Integration",
        description:
          "Connect repositories and analyze commits, pull requests, and issues.",
      },
  ];
   
  
  export default function Features() {
    return (
      <section
        id="features"
        className="bg-slate-950 px-6 py-24"
      >
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-4xl font-bold text-white">
            Everything Developers Need
          </h2>
  
          <p className="mt-4 text-center text-slate-400">
            One workspace for AI, GitHub, documentation, and project management.
          </p>
  
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }
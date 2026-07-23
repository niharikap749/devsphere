import { useEffect, useState } from "react";
import { getProjects } from "@/services/project.service";
import type { Project } from "@/services/project.service";
import CreateProjectDialog from "@/components/dashboard/CreateProjectDialog";

export default function DashboardPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    try {
      setLoading(true);

      const data = await getProjects();
      setProjects(data);
    } catch (error) {
      console.error("Failed to load projects:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <p className="text-lg text-slate-400">
          Loading projects...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 p-8">
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white">
            Welcome back 👋
          </h1>

          <p className="mt-2 text-slate-400">
            {projects.length} Project
            {projects.length !== 1 ? "s" : ""}
          </p>
        </div>

        <CreateProjectDialog onCreated={loadProjects} />
      </div>

      {projects.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-700 p-12 text-center">
          <h2 className="text-2xl font-semibold text-white">
            No projects yet
          </h2>

          <p className="mt-3 text-slate-400">
            Create your first project to get started.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="rounded-xl border border-slate-800 bg-slate-900 p-6 transition hover:border-blue-500"
            >
              <h2 className="text-xl font-semibold text-white">
                {project.title}
              </h2>

              <p className="mt-3 text-slate-400">
                {project.description || "No description"}
              </p>

              <p className="mt-5 text-sm text-slate-500">
                Created on{" "}
                {new Date(project.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
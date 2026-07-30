import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "@/components/layout/DashboardLayout";
import CreateProjectDialog from "@/components/dashboard/CreateProjectDialog";

import {
  getProjects,
  type Project,
} from "@/services/project.service";

export default function DashboardPage() {
  const navigate = useNavigate();

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
      <DashboardLayout>
        <div className="flex h-full items-center justify-center">
          <p className="text-lg text-slate-400">
            Loading projects...
          </p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">

        {/* Quick Actions */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
          <h2 className="text-2xl font-semibold text-white">
            🚀 Quick Actions
          </h2>

          <p className="mt-3 text-slate-400">
            Launch DevSphere AI to generate code, debug applications,
            explain algorithms, or continue previous conversations.
          </p>

          <div className="mt-6 flex gap-4">
            <button
              onClick={() => navigate("/ai")}
              className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
            >
              Open DevSphere AI
            </button>

            <CreateProjectDialog onCreated={loadProjects} />
          </div>
        </div>

        {/* Projects */}
        <div>
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-white">
                Projects
              </h2>

              <p className="mt-2 text-slate-400">
                {projects.length} Project
                {projects.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>

          {projects.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-700 py-20 text-center">
              <h3 className="text-3xl font-semibold text-white">
                No projects yet
              </h3>

              <p className="mt-4 text-slate-400">
                Create your first project to start building.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="rounded-xl border border-slate-800 bg-slate-900 p-6 transition hover:border-blue-500"
                >
                  <h3 className="text-xl font-semibold text-white">
                    {project.title}
                  </h3>

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

      </div>
    </DashboardLayout>
  );
}
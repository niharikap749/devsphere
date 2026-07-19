import { FolderGit2 } from "lucide-react";

const projects = [
  {
    name: "DevSphere",
    tech: "React • Express • PostgreSQL",
  },
  {
    name: "Resume Analyzer",
    tech: "FastAPI • NLP • Python",
  },
  {
    name: "Smart Loan Approval",
    tech: "Machine Learning • Streamlit",
  },
];

export default function RecentProjects() {
  return (
    <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-6 text-2xl font-bold text-white">
        Recent Projects
      </h2>

      <div className="space-y-4">
        {projects.map((project) => (
          <div
            key={project.name}
            className="flex items-center gap-4 rounded-xl bg-slate-800/50 p-4 transition hover:bg-slate-800"
          >
            <FolderGit2 className="text-indigo-400" />

            <div>
              <h3 className="font-semibold text-white">
                {project.name}
              </h3>

              <p className="text-sm text-slate-400">
                {project.tech}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
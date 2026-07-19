import DashboardLayout from "@/components/layout/DashboardLayout";
import StatsGrid from "@/components/dashboard/StatsGrid";
import RecentProjects from "@/components/dashboard/RecentProjects";



export default function DashboardPage() {
  return (
    <DashboardLayout>
      <h1 className="text-4xl font-bold text-white">
        Welcome back, Niharika 👋
      </h1>

      <p className="mt-3 text-slate-400">
        Here's an overview of your developer workspace.
      </p>

      <div className="mt-10">
        <StatsGrid />
      </div>

      <RecentProjects />
    </DashboardLayout>
  );
}
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-slate-950 px-6">
      <div className="max-w-4xl text-center">

        <span className="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-sm text-indigo-300">
          AI Developer Workspace
        </span>

        <h1 className="mt-8 text-6xl font-extrabold leading-tight text-white">
          Build Smarter.
          <br />
          Code Faster.
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
          DevSphere combines GitHub, AI, RAG, project management,
          and developer tools into one intelligent workspace.
        </p>

        <div className="mt-10 flex justify-center gap-4">

          <Button size="lg">
            Get Started
          </Button>

          <Button
            variant="outline"
            size="lg"
          >
            View GitHub
          </Button>

        </div>

      </div>
    </section>
  );
}
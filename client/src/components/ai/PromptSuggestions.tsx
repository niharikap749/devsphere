import {
    Code2,
    Bug,
    FileCode2,
    Brain,
  } from "lucide-react";
  
  const prompts = [
    {
      icon: Code2,
      title: "Generate React Login",
      prompt: "Generate a responsive React login page using Tailwind CSS.",
    },
    {
      icon: Bug,
      title: "Debug Java Code",
      prompt: "Find and fix bugs in my Java code.",
    },
    {
      icon: Brain,
      title: "Explain DSA",
      prompt: "Explain Binary Search with an example.",
    },
    {
      icon: FileCode2,
      title: "Generate README",
      prompt: "Generate a professional GitHub README.",
    },
  ];
  
  interface Props {
    onSelect: (prompt: string) => void;
  }
  
  export default function PromptSuggestions({
    onSelect,
  }: Props) {
    return (
      <div className="grid gap-4 md:grid-cols-2">
        {prompts.map(({ icon: Icon, title, prompt }) => (
          <button
            key={title}
            onClick={() => onSelect(prompt)}
            className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 text-left transition hover:border-blue-500 hover:bg-zinc-800"
          >
            <Icon className="mb-4 text-blue-400" />
  
            <h3 className="font-semibold text-white">
              {title}
            </h3>
  
            <p className="mt-2 text-sm text-zinc-400">
              {prompt}
            </p>
          </button>
        ))}
      </div>
    );
  }
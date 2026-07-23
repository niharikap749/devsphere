import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createProject } from "@/services/project.service";

interface Props {
  onCreated: () => void;
}

export default function CreateProjectDialog({ onCreated }: Props) {
  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  async function handleSubmit() {
    if (!title.trim()) return;

    await createProject(title, description);

    setTitle("");
    setDescription("");

    setOpen(false);

    onCreated();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>+ New Project</Button>
      </DialogTrigger>

      <DialogContent className="bg-slate-900 border-slate-800">
        <DialogHeader>
          <DialogTitle>Create Project</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">

          <Input
            placeholder="Project Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <Input
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Button
            className="w-full"
            onClick={handleSubmit}
          >
            Create Project
          </Button>

        </div>
      </DialogContent>
    </Dialog>
  );
}
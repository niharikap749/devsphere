import { Response } from "express";
import { z } from "zod";

import { AuthRequest } from "../middleware/auth.middleware";
import {
  createProject,
  getProjects,
  deleteProject,
} from "../services/project.service";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
});

export async function create(req: AuthRequest, res: Response) {
  try {
    const data = schema.parse(req.body);

    const project = await createProject(
      data.title,
      data.description ?? "",
      req.user!.id
    );

    return res.status(201).json(project);
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

export async function list(req: AuthRequest, res: Response) {
  try {
    const projects = await getProjects(req.user!.id);

    return res.status(200).json(projects);
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function remove(req: AuthRequest, res: Response) {
  try {
    const id = req.params.id as string;

    await deleteProject(id, req.user!.id);

    return res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
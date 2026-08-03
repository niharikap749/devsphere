import { Request, Response } from "express";
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

export async function create(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const data = schema.parse(req.body);

    const project = await createProject(
      data.title,
      data.description ?? "",
      (req as AuthRequest).user.id
    );

    res.status(201).json(project);
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

export async function list(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const projects = await getProjects(
      (req as AuthRequest).user.id
    );

    res.status(200).json(projects);
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function remove(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const id = String(req.params.id);

    await deleteProject(
      id,
      (req as AuthRequest).user.id
    );

    res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
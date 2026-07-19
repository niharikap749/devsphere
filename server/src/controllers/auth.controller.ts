import { Request, Response } from "express";
import { z } from "zod";
import {
    registerUser,
    loginUser,
    getCurrentUser,
  } from "../services/auth.service";
  
  import { AuthRequest } from "../middleware/auth.middleware";

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function register(
  req: Request,
  res: Response
) {
  try {
    const data = registerSchema.parse(req.body);

    const result = await registerUser(
      data.name,
      data.email,
      data.password
    );

    res.status(201).json(result);
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
}

export async function login(
  req: Request,
  res: Response
) {
  try {
    const data = loginSchema.parse(req.body);

    const result = await loginUser(
      data.email,
      data.password
    );

    res.json(result);
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
}

export async function me(
    req: AuthRequest,
    res: Response
  ) {
    try {
      const user = await getCurrentUser(req.user!.id);
  
      res.json(user);
    } catch {
      res.status(500).json({
        message: "Server Error",
      });
    }
  }
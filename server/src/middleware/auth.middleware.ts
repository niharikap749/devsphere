import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export interface AuthRequest extends Request {
  user: {
    id: string;
    email: string;
  };
}

export function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.status(401).json({
        message: "Unauthorized",
      });
      return;
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: string;
      email: string;
    };

    (req as AuthRequest).user = decoded;

    next();
  } catch {
    res.status(401).json({
      message: "Invalid token",
    });
  }
}
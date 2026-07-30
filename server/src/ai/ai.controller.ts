import { Request, Response } from "express";
import * as aiService from "./ai.service";

export async function chat(req: Request, res: Response) {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Messages are required",
      });
    }

    const response = await aiService.generateResponse(messages);

    return res.json({
      success: true,
      response,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate response",
    });
  }
}
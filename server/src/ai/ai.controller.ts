import { Request, Response } from "express";

import * as aiService from "./ai.service";
import { getDocument } from "./document.service";

export async function chat(
  req: Request,
  res: Response
) {
  try {
    const { messages } = req.body;

    if (
      !messages ||
      !Array.isArray(messages) ||
      messages.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Messages are required",
      });
    }

    const document = getDocument();

    const response =
      await aiService.generateResponse(
        messages,
        document
      );

    res.json({
      success: true,
      response,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to generate response",
    });
  }
}
import { Request, Response } from "express";

import {
  extractDocument,
  saveDocument,
} from "./document.service";

export async function uploadDocument(
  req: Request,
  res: Response
) {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const content = await extractDocument(req.file);

    saveDocument(content);

    return res.json({
      success: true,
      message: "Document uploaded successfully",
    });
  } catch (error: any) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        error.message || "Document processing failed",
    });
  }
}
import pdf from "pdf-parse";
import mammoth from "mammoth";

let uploadedDocument = "";

export async function extractDocument(
  file: Express.Multer.File
) {
  const extension = file.originalname
    .split(".")
    .pop()
    ?.toLowerCase();

  switch (extension) {
    case "pdf": {
      const data = await pdf(file.buffer);
      return data.text;
    }

    case "docx": {
      const data = await mammoth.extractRawText({
        buffer: file.buffer,
      });

      return data.value;
    }

    case "txt":
    case "md":
      return file.buffer.toString("utf-8");

    default:
      throw new Error("Unsupported file");
  }
}

export function saveDocument(text: string) {
  uploadedDocument = text;
}

export function getDocument() {
  return uploadedDocument;
}
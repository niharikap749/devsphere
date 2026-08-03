import api from "./api.service";

export async function uploadDocument(file: File) {
  const formData = new FormData();

  formData.append("file", file);

  const { data } = await api.post(
    "/ai/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
}
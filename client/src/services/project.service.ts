import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export interface Project {
  id: string;
  title: string;
  description: string;
  createdAt: string;
}

export const getProjects = async () => {
  const res = await API.get<Project[]>("/projects");
  return res.data;
};

export const createProject = async (
  title: string,
  description: string
) => {
  const res = await API.post("/projects", {
    title,
    description,
  });

  return res.data;
};

export const deleteProject = async (id: string) => {
  await API.delete(`/projects/${id}`);
};
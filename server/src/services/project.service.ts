import prisma from "../lib/prisma";

export async function createProject(
  title: string,
  description: string,
  ownerId: string
) {
  return prisma.project.create({
    data: {
      title,
      description,
      ownerId,
    },
  });
}

export async function getProjects(ownerId: string) {
  return prisma.project.findMany({
    where: {
      ownerId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function deleteProject(
  id: string,
  ownerId: string
) {
  return prisma.project.delete({
    where: {
      id,
      ownerId,
    },
  });
}
"use server";

import { db } from "@/app/_lib/prisma";
import { taskFormSchema, TaskFormSchema, taskIdSchema } from "./schema";
import { revalidatePath } from "next/cache";
import { $Enums } from "@prisma/client";

export const upsertTask = async (data: TaskFormSchema) => {
  taskFormSchema.parse(data);

  await db.tasks.upsert({
    where: { id: data.id ?? "" },
    update: data,
    create: data,
  });

  revalidatePath("tasks");
};

export const updateTask = async (taskId: string, taskStatus: $Enums.Status) => {
  if (!["NOT_STARTED", "IN_PROGRESS", "COMPLETED"].includes(taskStatus)) {
    throw new Error("Status inválido!");
  }

  await db.tasks.update({
    where: { id: taskId },
    data: { status: taskStatus },
  }); // Define o campo a ser atualizado

  // Revalida o cache da página correspondente
  revalidatePath("/tasks");
};

export const deleteTask = async (taskId: string) => {
  taskIdSchema.parse(taskId);

  await db.tasks.delete({ where: { id: taskId } });
  revalidatePath("/tasks");
};

export const deleteAllTasks = async () => {
  await db.tasks.deleteMany();
  revalidatePath("/tasks");
};

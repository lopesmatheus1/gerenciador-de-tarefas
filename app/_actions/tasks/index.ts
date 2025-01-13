"use server";

import { db } from "@/app/_lib/prisma";
import { taskFormSchema, TaskFormSchema } from "./schema";
import { revalidatePath } from "next/cache";
import { $Enums } from "@prisma/client";

export const createTask = async (data: TaskFormSchema) => {
  taskFormSchema.parse(data);

  await db.tasks.create({ data });
  revalidatePath("/tasks");
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

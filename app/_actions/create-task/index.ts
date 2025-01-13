"use server";

import { db } from "@/app/_lib/prisma";
import { taskFormSchema, TaskFormSchema } from "./schema";
import { revalidatePath } from "next/cache";

export const createTask = async (data: TaskFormSchema) => {
  taskFormSchema.parse(data);

  await db.tasks.create({ data });
  revalidatePath("/tasks");
};

import { Tasks } from "@prisma/client";
import { db } from "../_lib/prisma";
export const getTasks = async (): Promise<Tasks[]> => {
  return await db.tasks.findMany({});
};

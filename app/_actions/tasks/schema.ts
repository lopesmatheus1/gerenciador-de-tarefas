import { Period } from "@prisma/client";
import { z } from "zod";

export const taskFormSchema = z.object({
  id: z.string().uuid().optional(),
  title: z
    .string({ required_error: "O título é obrigatório" })
    .trim()
    .min(2, {
      message: "O título deve ter pelo menos 2 caracteres",
    })
    .max(50, { message: "O título deve conter no máximo 50 caracteres" }),
  description: z
    .string({ required_error: "A descrição é obrigatória" })
    .min(2, { message: "A descrição deve ter pelo menos 2 caracteres" })
    .max(300, { message: "A descrição deve conter no máximo 300 caracteres" }),
  period: z.nativeEnum(Period, {
    required_error: "O horário é obrigatório",
  }),
});

export const taskIdSchema = z.string().uuid();

export type TaskFormSchema = z.infer<typeof taskFormSchema>;

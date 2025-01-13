import { Period } from "@prisma/client";
import { z } from "zod";

export const taskFormSchema = z.object({
  title: z
    .string({ required_error: "O título é obrigatório" })
    .trim()
    .min(2, {
      message: "O título deve ter pelo menos 2 caracteres",
    })
    .max(50),
  description: z
    .string({ required_error: "A descrição é obrigatória" })
    .min(2, { message: "A descrição deve ter pelo menos 2 caracteres" })
    .max(250),
  period: z.nativeEnum(Period, {
    required_error: "O horário é obrigatório",
  }),
});

export type TaskFormSchema = z.infer<typeof taskFormSchema>;

"use client";

import { taskFormSchema, TaskFormSchema } from "@/app/_actions/tasks/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/app/_components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import { Textarea } from "@/app/_components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { PERIOD_TYPE_OPTIONS } from "@/app/_constants/tasks";
import { upsertTask } from "@/app/_actions/tasks";
import { useRouter } from "next/navigation";
import { useToast } from "@/app/_hooks/use-toast";

interface EditTaskProps {
  defaultValues: TaskFormSchema;
}

const EditTask = ({ defaultValues }: EditTaskProps) => {
  const route = useRouter();
  const { toast } = useToast();
  const form = useForm<TaskFormSchema>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      description: defaultValues.description,
      period: defaultValues.period,
      title: defaultValues.title,
    },
  });

  async function onSubmit(data: TaskFormSchema) {
    try {
      await upsertTask({ ...data, id: defaultValues?.id });
      route.push("/tasks");
      toast({ description: "A tarefa foi atualizada com sucesso!" });
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        description: "Ocorreu um erro ao atualizar a tarefa",
      });
    }
  }

  const formValues = form.watch();
  const isEdited =
    formValues.description !== defaultValues.description ||
    formValues.period !== defaultValues.period ||
    formValues.title !== defaultValues.title;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input placeholder="Título da tarefa" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="period"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Horário</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Horário da tarefa" />
                  </SelectTrigger>
                  <SelectContent>
                    {PERIOD_TYPE_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea placeholder="Descrição da tarefa" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full flex justify-end gap-2">
          <Button
            type="reset"
            variant={"ghost"}
            onClick={() => route.push("/tasks")}
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={!isEdited}>
            Salvar
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EditTask;

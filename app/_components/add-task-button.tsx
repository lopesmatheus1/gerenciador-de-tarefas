"use client";
import { LoaderCircleIcon, PlusIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { PERIOD_TYPE_OPTIONS } from "../_constants/tasks";
import { useState } from "react";
import { taskFormSchema, TaskFormSchema } from "../_actions/tasks/schema";
import { upsertTask } from "../_actions/tasks";
import { useToast } from "../_hooks/use-toast";

const AddTaskButton = () => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  const form = useForm<TaskFormSchema>({
    shouldUnregister: true,
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title: "",
      description: "",
      period: "MORNING",
    },
  });

  const onSubmit = async (data: TaskFormSchema) => {
    try {
      toast({
        description: "Tarefa criada com sucesso!",
      });
      await upsertTask(data);
      setDialogIsOpen(false);
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        description: "Ocorreu um erro ao criar tarefa!",
      });
    }
  };

  const isSubmiting = form.formState.isSubmitting;
  const { toast } = useToast();

  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <DialogTrigger asChild>
        <Button className="py-3.5 rounded-sm" size={"sm"}>
          Nova tarefa
          <PlusIcon size={14} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nova tarefa</DialogTitle>
          <DialogDescription>Insira as informações abaixo</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

            <DialogFooter>
              <DialogClose asChild>
                <Button variant={"ghost"} type="reset">
                  Cancelar
                </Button>
              </DialogClose>
              <Button disabled={isSubmiting} type="submit">
                {isSubmiting && (
                  <LoaderCircleIcon className="animate-spin" size={16} />
                )}
                Adicionar
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTaskButton;

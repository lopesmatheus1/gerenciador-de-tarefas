"use client";
import { TrashIcon } from "lucide-react";
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
import { deleteAllTasks } from "../_actions/tasks";
import { useToast } from "../_hooks/use-toast";
import { useState } from "react";

const DeleteTasksButton = () => {
  const { toast } = useToast();

  const handleDeleteClick = async () => {
    try {
      await deleteAllTasks();
      toast({
        description: "Todas as tarefas foram deletadas com sucesso!",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Ocorreu um erro ao deletar as tarefa!",
      });
      console.log(error);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="py-3.5 rounded-sm" size={"sm"} variant={"ghost"}>
          Limpar Tarefas
          <TrashIcon size={14} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmação necessária.</DialogTitle>
          <DialogDescription>
            Essa ação apagará todas as tarefas de forma permanente e não poderá
            ser desfeita. Tem certeza de que deseja continuar?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose>
            <Button variant={"ghost"}>Cancelar</Button>
            <Button onClick={handleDeleteClick}>Confirmar</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteTasksButton;

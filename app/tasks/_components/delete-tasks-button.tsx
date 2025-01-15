"use client";
import { TrashIcon } from "lucide-react";
import { Button } from "../../_components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../_components/ui/dialog";
import { deleteAllTasks } from "../../_actions/tasks";
import { useToast } from "../../_hooks/use-toast";
import { useState } from "react";

const DeleteTasksButton = () => {
  const { toast } = useToast();
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  const handleDeleteClick = async () => {
    try {
      await deleteAllTasks();
      toast({
        description: "Todas as tarefas foram deletadas com sucesso!",
      });
      setDialogIsOpen(false);
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Ocorreu um erro ao deletar as tarefa!",
      });
      console.log(error);
    }
  };
  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-sm py-3.5" size={"sm"} variant={"ghost"}>
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
          <DialogClose asChild>
            <Button variant={"ghost"}>Cancelar</Button>
          </DialogClose>
          <Button onClick={handleDeleteClick}>Confirmar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteTasksButton;

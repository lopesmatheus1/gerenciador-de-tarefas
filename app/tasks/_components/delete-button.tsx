"use client";
import { deleteTask } from "@/app/_actions/tasks";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog";
import { Button } from "@/app/_components/ui/button";
import { useToast } from "@/app/_hooks/use-toast";
import { TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface DeleteTaskByIdButtonProps {
  id: string;
}

const DeleteTaskByIdButton = ({ id }: DeleteTaskByIdButtonProps) => {
  const { toast } = useToast();
  const route = useRouter();
  const handleDeleteClick = async () => {
    try {
      await deleteTask(id);
      toast({ description: "Tarefa deletada com sucesso" });
      route.push("/tasks");
    } catch (error) {
      console.log(error);
      toast({
        description: "Ocorreu um erro ao deletar tarefa",
        variant: "destructive",
      });
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant={"destructive"}
          className="rounded-sm py-3.5"
          size={"sm"}
        >
          <TrashIcon size={14} />
          Deletar Tarefa
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Tem certeza sobre isso?</AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação apagará a tarefa de forma permanente e não poderá ser
            desfeita. Tem certeza de que deseja continuar?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteClick}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteTaskByIdButton;

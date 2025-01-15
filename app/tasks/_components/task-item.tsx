"use client";
import { $Enums } from "@prisma/client";
import { HiOutlineArrowTopRightOnSquare } from "react-icons/hi2";
import { Button } from "../../_components/ui/button";
import Link from "next/link";
import {
  CheckIcon,
  Loader2Icon,
  LoaderCircleIcon,
  TrashIcon,
} from "lucide-react";
import { deleteTask, updateTask } from "../../_actions/tasks";
import { useToast } from "@/app/_hooks/use-toast";
import { useState } from "react";

interface TaskItemProps {
  title: string;
  status: $Enums.Status;
  id: string;
}

const TaskItem = ({ title, status, id }: TaskItemProps) => {
  const isInProgress = status === "IN_PROGRESS";
  const isCompleted = status === "COMPLETED";
  const notStarted = status === "NOT_STARTED";
  const { toast } = useToast();

  const [isDeleting, setIsDeleting] = useState(false);

  const getTaskStatus = () => {
    if (notStarted) return "bg-gray-200 text-gray-600";
    if (isInProgress) return "bg-[#FFAA04] text-[#FFAA04] ";
    if (isCompleted) return "bg-[#00ADB5] text-[#00ADB5] ";
  };

  const getNewStauts = async () => {
    if (isCompleted) {
      const newStatus = "NOT_STARTED";
      await updateTask(id, newStatus);
      toast({ description: "Stauts da tarefa atualizado com sucesso!" });
    }
    if (isInProgress) {
      const newStatus = "COMPLETED";
      await updateTask(id, newStatus);
      toast({ description: "Stauts da tarefa atualizado com sucesso!" });
    }
    if (notStarted) {
      const newStatus = "IN_PROGRESS";
      await updateTask(id, newStatus);
      toast({ description: "Stauts da tarefa atualizado com sucesso!" });
    }
  };

  const handleDeleteClick = async () => {
    try {
      await deleteTask(id);
      toast({ description: "Tarefa deletada com sucesso!" });
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        description: "Ocorreu um erro ao deletar tarefa!",
      });
    }
  };

  return (
    <div
      className={`mb-3 flex items-center justify-between rounded-lg !bg-opacity-15 px-4 py-2.5 ${getTaskStatus()}`}
    >
      <div className="flex items-center gap-2">
        <label
          className={`relative flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg ${getTaskStatus()}`}
        >
          <input
            type="checkbox"
            checked={isCompleted}
            className="absolute h-full w-full cursor-pointer opacity-0"
            onChange={() => getNewStauts()}
          />
          {isInProgress && (
            <LoaderCircleIcon className="animate-spin text-white" size={16} />
          )}
          {isCompleted && <CheckIcon size={16} className="text-white" />}
        </label>
        <p>{title}</p>
      </div>

      <div className="flex items-center justify-center gap-2">
        <Button
          className={`h-8 w-8 bg-opacity-0 hover:bg-transparent hover:text-inherit`}
          variant={"ghost"}
          asChild
        >
          <Link href={`/tasks/${id}`}>
            <HiOutlineArrowTopRightOnSquare size={18} />
          </Link>
        </Button>

        <Button
          className={`h-8 w-8 !bg-opacity-0 hover:bg-transparent hover:text-inherit`}
          variant={"ghost"}
          onClick={() => {
            handleDeleteClick(), setIsDeleting(true);
          }}
          disabled={isDeleting}
        >
          <TrashIcon size={18} />
          {isDeleting && <Loader2Icon className="animate-spin" size={14} />}
        </Button>
      </div>
    </div>
  );
};

export default TaskItem;

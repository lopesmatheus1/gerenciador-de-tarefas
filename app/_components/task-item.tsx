"use client";
import { $Enums } from "@prisma/client";
import { HiOutlineArrowTopRightOnSquare } from "react-icons/hi2";
import { Button } from "./ui/button";
import Link from "next/link";
import { CheckIcon, LoaderCircleIcon, TrashIcon } from "lucide-react";
import { deleteTask, updateTask } from "../_actions/tasks";

interface TaskItemProps {
  title: string;
  status: $Enums.Status;
  id: string;
}

const TaskItem = ({ title, status, id }: TaskItemProps) => {
  const isInProgress = status === "IN_PROGRESS";
  const isCompleted = status === "COMPLETED";
  const notStarted = status === "NOT_STARTED";

  const getTaskStatus = () => {
    if (notStarted) return "bg-gray-200 text-gray-600";
    if (isInProgress) return "bg-[#FFAA04] text-[#FFAA04] ";
    if (isCompleted) return "bg-[#00ADB5] text-[#00ADB5] ";
  };

  const getNewStauts = async () => {
    if (isCompleted) {
      const newStatus = "NOT_STARTED";
      await updateTask(id, newStatus);
    }
    if (isInProgress) {
      const newStatus = "COMPLETED";
      await updateTask(id, newStatus);
    }
    if (notStarted) {
      const newStatus = "IN_PROGRESS";
      await updateTask(id, newStatus);
    }
  };

  return (
    <div
      className={`flex justify-between items-center !bg-opacity-15 py-2.5 px-4 rounded-lg  mb-3 ${getTaskStatus()}`}
    >
      <div className="flex items-center gap-2">
        <label
          className={`relative flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg ${getTaskStatus()}`}
        >
          <input
            type="checkbox"
            checked={isCompleted}
            className="absolute h-full w-full cursor-pointer opacity-0"
            onClick={() => getNewStauts()}
          />
          {isInProgress && (
            <LoaderCircleIcon className="text-white animate-spin" size={16} />
          )}
          {isCompleted && <CheckIcon size={16} className="text-white " />}
        </label>
        <p>{title}</p>
      </div>

      <div className="flex gap-2 items-center justify-center">
        <Button
          className={`w-8 h-8 bg-opacity-0 hover:bg-transparent hover:text-inherit`}
          variant={"ghost"}
          asChild
        >
          <Link href={"/"}>
            <HiOutlineArrowTopRightOnSquare size={18} />
          </Link>
        </Button>

        <Button
          className={`w-8 h-8 !bg-opacity-0 hover:bg-transparent hover:text-inherit`}
          variant={"ghost"}
          onClick={async () => deleteTask(id)}
        >
          <TrashIcon size={18} />
        </Button>
      </div>
    </div>
  );
};

export default TaskItem;

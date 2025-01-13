import { $Enums } from "@prisma/client";
import { HiOutlineArrowTopRightOnSquare } from "react-icons/hi2";
import { Button } from "./ui/button";
import Link from "next/link";

interface TaskItemProps {
  children: React.ReactNode;
  status: $Enums.Status;
}

const TaskItem = ({ children, status }: TaskItemProps) => {
  const getTaskStatus = () => {
    if (status === "NOT_STARTED") {
      return "bg-gray-200";
    }

    if (status === "IN_PROGRESS") {
      return "bg-[#FFAA041A]";
    }

    if (status === "COMPLETED") {
      return "bg-primary/20";
    }
  };
  return (
    <div
      className={`${getTaskStatus()} flex justify-between items-center py-2.5 px-4 rounded-lg mb-3`}
    >
      <h1>{children}</h1>

      <Button
        className="w-8 h-8 hover:bg-transparent"
        variant={"ghost"}
        asChild
      >
        <Link href={"/"}>
          <HiOutlineArrowTopRightOnSquare size={20} />
        </Link>
      </Button>
    </div>
  );
};

export default TaskItem;

import { LayoutList, ListChecks, Loader2Icon } from "lucide-react";
import Header from "../_components/header";
import Card from "./_components/card";
import { getTasks } from "../_data-access/get-tasks";
import AvailableTasks from "./_components/availabe-tasks";

export default async function Home() {
  const tasks = await getTasks();

  const resumeTasks = tasks.slice(0, 20);
  const availableTasks = tasks.filter(
    (task) => task.status === "NOT_STARTED",
  ).length;
  const doneTasks = tasks.filter((task) => task.status === "COMPLETED").length;
  const inProgressTasks = tasks.filter(
    (task) => task.status === "IN_PROGRESS",
  ).length;

  return (
    <div className="mx-8 mt-16 w-full space-y-16 overflow-hidden">
      <Header text="Início" title="Início" />
      <div className="flex items-center justify-center gap-12">
        <Card
          icon={<LayoutList size={28} className="text-primary" />}
          text="Tarefas disponíveis"
          quantity={availableTasks}
        />
        <Card
          icon={<ListChecks size={28} className="text-primary" />}
          quantity={doneTasks}
          text="Tarefas concluídas"
        />
        <Card
          text="tarefas em progresso"
          quantity={inProgressTasks}
          icon={<Loader2Icon size={28} className="animate-spin text-primary" />}
        />
      </div>

      <div className="flex w-full items-center justify-center">
        <AvailableTasks tasks={resumeTasks} />
      </div>
    </div>
  );
}

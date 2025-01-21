import TaskItem from "@/app/tasks/_components/task-item";
import { Tasks } from "@prisma/client";

interface AvailableTasksProps {
  tasks: Tasks[];
}

const AvailableTasks = ({ tasks }: AvailableTasksProps) => {
  return (
    <div className="flex h-full w-full flex-col space-y-6 p-6 pl-0">
      <div>
        <h2 className="text-2xl font-semibold text-foreground">Tarefas</h2>
        <p className="text-foreground/60">Resumo das tarefas disponíveis</p>
      </div>

      {/* Certifique-se de que esta div tem uma altura fixa ou máxima */}
      <div className="h-full max-h-[400px] pb-10 overflow-auto">
        {tasks.map((task) => (
          <TaskItem
            status={task.status}
            title={task.title}
            id={task.id}
            key={task.id}
          />
        ))}
      </div>
    </div>
  );
};

export default AvailableTasks;

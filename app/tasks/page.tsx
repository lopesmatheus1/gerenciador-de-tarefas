import { CloudSunIcon, MoonIcon, SunIcon } from "lucide-react";
import { getTasks } from "../_data-access/get-tasks";
import Header from "../_components/header";
import TaskSeparator from "../_components/task-separator";
import TaskItem from "../_components/task-item";

const Tasks = async () => {
  const tasks = await getTasks();

  const morningTasks = tasks.filter((task) => task.period === "MORNING");

  const afternoonTasks = tasks.filter((task) => task.period === "AFTERNOON");
  const nightTasks = tasks.filter((task) => task.period === "NIGHT");

  return (
    <div className="my-16 mx-8 w-full">
      <Header text="Minhas Tarefas" title="Minhas Tarefas" />

      <TaskSeparator text="Manhã">
        <SunIcon />
      </TaskSeparator>
      {morningTasks.map((task) => (
        <TaskItem key={task.id} status={task.status}>
          {task.title}
        </TaskItem>
      ))}

      <TaskSeparator text="Tarde">
        <CloudSunIcon />
      </TaskSeparator>

      {afternoonTasks.map((task) => (
        <TaskItem key={task.id} status={task.status}>
          {task.title}
        </TaskItem>
      ))}

      <TaskSeparator text="Noite">
        <MoonIcon />
      </TaskSeparator>
      {nightTasks.map((task) => (
        <TaskItem key={task.id} status={task.status}>
          {task.title}
        </TaskItem>
      ))}
    </div>
  );
};

export default Tasks;

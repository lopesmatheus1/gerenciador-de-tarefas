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

      <TaskSeparator text="Manhã" icon={<SunIcon />} />
      {morningTasks.map((task) => (
        <TaskItem
          key={task.id}
          id={task.id}
          status={task.status}
          title={task.title}
        />
      ))}

      <TaskSeparator text="Tarde" icon={<CloudSunIcon />} />
      {afternoonTasks.map((task) => (
        <TaskItem
          id={task.id}
          key={task.id}
          status={task.status}
          title={task.title}
        />
      ))}

      <TaskSeparator text="Noite" icon={<MoonIcon />} />
      {nightTasks.map((task) => (
        <TaskItem
          id={task.id}
          key={task.id}
          status={task.status}
          title={task.title}
        />
      ))}
    </div>
  );
};

export default Tasks;

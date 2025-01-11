import { PlusIcon, TrashIcon } from "lucide-react";
import { getTasks } from "../_data-access/get-tasks";
import Header from "../_components/header";

const Tasks = async () => {
  const tasks = await getTasks();
  return (
    <div className="my-16 mx-8 w-full space-y-8">
      <Header text="Minhas Tarefas" title="Minhas Tarefas" />

      <div>
        {tasks.map((task) => (
          <h1>{task.title}</h1>
        ))}
      </div>
    </div>
  );
};

export default Tasks;

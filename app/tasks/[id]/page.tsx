import { getTaskById } from "@/app/_data-access/get-tasks";
import DeleteTaskByIdButton from "../_components/delete-button";
import EditTask from "../_components/edit-task";

interface Params {
  id: string;
}

const TaskPage = async ({ params: { id } }: { params: Params }) => {
  const task = await getTaskById(id);

  return (
    <div className="my-16 mx-8 w-full flex-col">
      <div className="w-full flex justify-between mb-6">
        <div>
          <div className="flex items-center justify-center gap-1">
            <p className="text-foreground/60">Minhas Tarefas {">"} </p>
            <span className="text-primary text-base font-semibold">
              {task?.title}
            </span>
          </div>
          <h2 className="text-2xl font-semibold text-foreground">
            {task?.title}
          </h2>
        </div>

        <div className="flex self-end gap-3 ">
          <DeleteTaskByIdButton id={id} />
        </div>
      </div>

      <div>
        <EditTask
          defaultValues={{
            title: task?.title || "",
            period: task?.period || "MORNING",
            description: task?.description || "",
            id: task?.id,
          }}
        />
      </div>
    </div>
  );
};

export default TaskPage;

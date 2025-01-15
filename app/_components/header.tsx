import AddTaskButton from "../tasks/_components/add-task-button";
import DeleteTasksButton from "../tasks/_components/delete-tasks-button";

interface HeaderProps {
  title: string;
  text: string;
}

const Header = ({ text, title }: HeaderProps) => {
  return (
    <div className="w-full flex justify-between mb-6">
      <div>
        <span className="text-primary text-sm font-semibold">{text}</span>
        <h2 className="text-2xl font-semibold text-foreground">{title}</h2>
      </div>

      <div className="flex self-end gap-3 ">
        <DeleteTasksButton />
        <AddTaskButton />
      </div>
    </div>
  );
};

export default Header;

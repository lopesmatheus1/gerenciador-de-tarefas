import { TrashIcon, PlusIcon } from "lucide-react";
import { Button } from "./ui/button";

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
        <Button className="py-3 rounded-sm" size={"sm"} variant={"ghost"}>
          Limpar Tarefas
          <TrashIcon size={14} />
        </Button>
        <Button className="py-3 rounded-sm" size={"sm"}>
          Nova tarefa
          <PlusIcon size={14} />
        </Button>
      </div>
    </div>
  );
};

export default Header;

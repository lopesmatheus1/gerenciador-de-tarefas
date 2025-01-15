import { HomeIcon, ListChecksIcon } from "lucide-react";
import SidebarButton from "./sidebar-button";

const Sidebar = () => {
  return (
    <div className="w-[272px] h-full">
      <div className="py-6 px-8 space-y-2">
        <h1 className="text-primary font-semibold text-2xl">Task Manager</h1>
        <p>
          um simples{" "}
          <span className="text-primary font-semibold">
            organizador de tarefas
          </span>
        </p>
      </div>

      <div className="flex flex-col gap-2 p-2">
        <SidebarButton href={"/"}>
          <HomeIcon size={22} />
          Início
        </SidebarButton>
        <SidebarButton href={"/tasks"}>
          <ListChecksIcon size={22} />
          Minhas tarefas
        </SidebarButton>
      </div>
    </div>
  );
};

export default Sidebar;

interface TaskSeparatorProps {
  icon: React.ReactNode;
  text: string;
}

const TaskSeparator = ({ icon, text }: TaskSeparatorProps) => {
  return (
    <div className="flex w-full items-center justify-start gap-2 text-foreground/60 py-3  ">
      {icon}
      <p className="font-semibold"> {text}</p>
    </div>
  );
};

export default TaskSeparator;

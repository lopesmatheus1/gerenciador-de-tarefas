interface TaskSeparatorProps {
  children: React.ReactNode;
  text: string;
}

const TaskSeparator = ({ children, text }: TaskSeparatorProps) => {
  return (
    <div className="flex w-full items-center justify-start gap-2 text-foreground/60 py-3  ">
      {children}
      <p className="font-semibold"> {text}</p>
    </div>
  );
};

export default TaskSeparator;

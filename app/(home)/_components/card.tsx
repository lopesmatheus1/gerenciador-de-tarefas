interface CardProps {
  icon: React.ReactNode;
  text: string;
  quantity: number;
}

const Card = ({ icon, text, quantity }: CardProps) => {
  return (
    <div className="mt-6 flex h-[200px] w-[300px] flex-col items-center justify-center gap-3 rounded-sm border transition-all hover:bg-primary/5">
      <div className="flex items-center justify-center gap-3">
        {icon}
        <p className="font-semiboldbold text-3xl">{quantity}</p>
      </div>

      <p className="font-medium">{text}</p>
    </div>
  );
};

export default Card;

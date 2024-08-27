const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, children, ...props }) => {
  return <div
    className={`rounded-2xl flex flex-col justify-center border shadow-xl ${className}`} {...props}>
    {children}
  </div>;
};

export default Card;

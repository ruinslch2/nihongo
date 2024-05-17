const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({className, children, ...props}) => {
    return <div
        className={`rounded-2xl mx-auto w-[150px] h-[150px] p-5 flex flex-col justify-center border ${className}`} {...props}>
        {children}
    </div>
}

export default Card;
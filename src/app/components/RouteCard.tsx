import {Link} from "react-router-dom";
import Card from "./Card.tsx";

const RouteCard = ({className, title, subTitle, link, icon, color}: {
    className?: string,
    title: string,
    subTitle?: string,
    link: string,
    icon?: string,
    color: string
}) => {
    return (
        <Link
            className="group select-none cursor-pointer"
            to={link}
        >
            <Card
                className={`relative rounded-2xl border border-black md:h-[70px] h-[40px] flex flex-row p-0 ${className}`}>
                {icon && <div className="z-10 w-7 h-7 top-[-15px] md:w-10 md:h-10 absolute md:top-[-20px] left-[10px]">
                    <img src={icon} alt={'icon'}/>
                </div>
                }
                <div className={"relative overflow-hidden rounded-2xl px-8 flex flex-row items-center gap-5 h-full"}>
                    <header className="z-10 text-xl md:text-2xl">{title}</header>
                    <article className="z-10 text-sm md:text-base text-gray-600">{subTitle}</article>
                    <div
                        className={`w-4 h-full right-[-5px] pointer-events-none absolute z-1 scale-x-1 group-hover:scale-x-[80] duration-500 ${color}`}>
                    </div>
                </div>
            </Card>
        </Link>
    )
}

export default RouteCard;
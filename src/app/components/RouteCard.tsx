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
        <Card
            className={`relative rounded-2xl border border-black h-[70px] flex flex-row p-0 ${className}`}>
            {icon && <div className="z-10 w-10 h-10 absolute top-[-20px] left-[10px]">
                <img src={icon} alt={'icon'}/>
            </div>
            }
            <div className={"relative overflow-hidden rounded-2xl px-5 flex flex-row items-center gap-5 h-full"}>
                <header className="z-10 text-2xl">{title}</header>
                <article className="z-10 text-base text-gray-600">{subTitle}</article>
                <div className={"absolute right-0 h-full"}>
                    <Link
                        className="h-full flex group select-none cursor-pointer "
                        to={link}
                    >
                        <div
                            className={`w-4 h-full right-[-5px] pointer-events-none absolute z-1 scale-x-1 group-hover:scale-x-[80] duration-500 ${color}`}>
                        </div>
                        <span className="relative my-auto mr-5">出発</span>
                    </Link>
                </div>

            </div>
        </Card>
    )
}

export default RouteCard;
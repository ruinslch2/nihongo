import {Link} from "react-router-dom";
import Card from "./Card.tsx";
const RouteCard = ({className, title, subTitle, link}: {className?: string, title: string, subTitle?: string, link: string }) => {
    return <Card className={`rounded-2xl mx-auto w-[150px] h-[150px] border-2 p-5 flex flex-col ${className}`}>
        <div className={"relative flex flex-col h-full"}>
            <header className="text-2xl">{title}</header>
            <article className="text-base">{subTitle}</article>
            <Link
                className="absolute bottom-0 right-0 py-3.75 block w-1/2 select-none cursor-pointer rounded border"
                to={link}
            >
                Go
            </Link>
        </div>
    </Card>
}

export default RouteCard;
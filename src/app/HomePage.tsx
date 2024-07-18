import {use, useEffect, useState} from "react";
import RouteCard from "./components/RouteCard.tsx";
import {fetchDictSize} from "../utils/apiService.ts";
import bookIcon from "../assets/icon-book.png";
// import NihonChart from "./components/NihonChart.tsx";
import Card from "./components/Card.tsx";
import River from "./components/River.tsx";
import {NIHONGO_LEVEL} from "./constant.ts";
import Modal from "./components/Modal.tsx";
import UserModal from "./components/UserModal.tsx";
import ShiningMilkImg from "../assets/ShiningMilk.png"


const promiseFetchData = fetchDictSize();

const HomePage = () => {
    const {data} = use(promiseFetchData);

    const [isOpenWho, setIsOpenWho] = useState(false);

    useEffect(() => {
        if (!sessionStorage.getItem('name')) setIsOpenWho(true)
    }, []);


    return <div className="flex flex-col h-full gap-5 w-full">
        <Card className="gap-5 w-full py-10">
            {/*<div className={'w-1/3'}><NihonChart /></div>*/}
            <div>
                目前已學了{data.data}個單字, N4完成度
                <span className="text-red-400">{(data.data / NIHONGO_LEVEL.N4 * 100.0).toFixed(2)}%</span>
            </div>
        </Card>
        <Card className="flex-1 w-full py-10 grid grid-flow-row grid-cols-2">
            <div className="col-span-2 md:col-span-1 flex flex-col gap-5 p-5">
                <RouteCard title="辞書" subTitle="語彙を増やす" link={"/nihongo/add-dictionary"} icon={bookIcon}
                           color={'bg-red-200'}/>
                <RouteCard title="Select Game" link={"/nihongo/timer-game"} icon={""} color={'bg-blue-200'}/>
                <RouteCard title="Voice Game" link={"/nihongo/timer-game-voice"} icon={""} color={'bg-green-200'}/>
            </div>
        </Card>

        <div className="w-40 opacity-50 hover:opacity-100 hover:scale-125 duration-500">
            <img src={ShiningMilkImg}/>
        </div>
        {/*<Card className="w-full h-[200px]">*/}
        {/*    <River />*/}
        {/*</Card>*/}
        {/*<RouteCard title="Timer Game" link={"/nihongo/timer-game"} icon={bookIcon}/>*/}
        {isOpenWho && <UserModal onClose={() => setIsOpenWho(false)}/>}
    </div>
}

export default HomePage
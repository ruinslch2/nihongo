import {use} from "react";
import RouteCard from "./components/RouteCard.tsx";
import {fetchDictSize} from "../utils/apiService.ts";
import bookIcon from "../assets/icon-book.png";
// import NihonChart from "./components/NihonChart.tsx";
import Card from "./components/Card.tsx";
import River from "./components/River.tsx";
import {NIHONGO_LEVEL} from "./constant.ts";


const promiseFetchData = fetchDictSize();

const HomePage = () => {
    const {data} = use(promiseFetchData);

    return <div className="flex flex-col h-full gap-5 w-full">
        <Card className="gap-5 w-full py-10">
            {/*<div className={'w-1/3'}><NihonChart /></div>*/}
            <div>
                目前已學了{data.data}個單字, N4完成度
                <span className="text-red-400">{(data.data / NIHONGO_LEVEL.N4 * 100.0).toFixed(2)}%</span>
            </div>
        </Card>
        <Card className="flex-1 w-full py-10 grid grid-flow-row grid-cols-2">
            <div className="col-span-1 flex flex-col gap-5 p-5">
                <RouteCard title="辞書" subTitle="語彙を増やす" link={"/nihongo/add-dictionary"} icon={bookIcon}
                           color={'bg-red-200'}/>
                <RouteCard title="Select Game" link={"/nihongo/timer-game"} icon={""} color={'bg-blue-200'}/>
                <RouteCard title="Voice Game" link={"/nihongo/timer-game-voice"} icon={""} color={'bg-green-200'}/>
            </div>
        </Card>
        <Card className="w-full h-[200px]">
            <River/>
        </Card>
        {/*<RouteCard title="Timer Game" link={"/nihongo/timer-game"} icon={bookIcon}/>*/}
    </div>
}

export default HomePage
import {use} from "react";
import RouteCard from "./components/RouteCard.tsx";
import {fetchDictSize} from "../utils/apiService.ts";
import NihonChart from "./components/NihonChart.tsx";


const promiseFetchData = fetchDictSize();

const HomePage = () => {

    const {data} = use(promiseFetchData);

    return <div className="grid grid-flow-row grid-cols-3 gap-5 w-full justify-center p-5">
        <div className={"col-span-3 mx-auto p-5 rounded-2xl border w-full"}>
            <div className={'w-1/3'}><NihonChart /></div>
            目前已學了{data.data}個單字, N3完成度
            <span className="text-red-400">{(data.data / 3750).toFixed(2)}%</span>
        </div>
        <RouteCard title="學習" subTitle="增加字典" link={"/nihongo/add-dictionary"}/>
        <RouteCard title="Timer Game" link={"/nihongo/timer-game"}/>
        <RouteCard title="Timer Game" link={"/nihongo/timer-game"}/>
    </div>
}

export default HomePage
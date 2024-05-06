import {use} from "react";
import httpService from "../utils/httpService.ts";
import Card from "./components/Card.tsx";
import {AxiosResponse} from "axios";

interface VocabularySizeType {
    statusCode: number,
    body: number
}

const fetchDictSize = async () => {
    const response: AxiosResponse<VocabularySizeType> = await httpService.post('/test/nihogo', {type: 'size'});
    if (response.status === 200) {
        return response.data.body
    }
    return 0
}
const promiseFetchData = fetchDictSize();

const HomePage = () => {

    const dictSize = use(promiseFetchData);

    return <div className="grid grid-flow-row grid-cols-3 gap-5 w-full justify-center p-5">
        <div className={"col-span-3 mx-auto p-5 rounded-2xl border w-full"}>
            目前已學了{dictSize}個單字, N3完成度
            <span className="text-red-400">{(dictSize / 3750).toFixed(2)}%</span>
        </div>
        <Card title="學習" subTitle="增加字典" link={"/nihongo/add-dictionary"}/>
        <Card title="Timer Game" link={"/nihongo/timer-game"}/>
        <Card title="Timer Game" link={"/nihongo/timer-game"}/>
    </div>
}

export default HomePage
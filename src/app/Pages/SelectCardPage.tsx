import SelectGame from "../components/SelectGame.tsx";
import TimerGame from "../components/TimerGame.tsx";
import {getVocabularyTest} from "../../utils/apiService.ts";
import {use} from "react";


const promiseFetchData = getVocabularyTest();

const SelectCardPage = () => {
    const {data} = use(promiseFetchData)

    console.log('ddd: ', data)

    return <TimerGame>
        <SelectGame data={data.data}/>
    </TimerGame>
}
export default SelectCardPage;
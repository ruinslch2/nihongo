import SelectGame from "../components/SelectGame.tsx";
import TimerGame from "../components/TimerGame.tsx";
import {getVocabularyTest} from "../../utils/apiService.ts";
import {use, useMemo} from "react";
import {getRandomObject} from "../../utils/userful.ts";


const promiseFetchData = getVocabularyTest();

export interface SelectGameQuestionType {
    questionList: WordType[],
    answer: WordType
}

interface WordType {
    _id: string;
    created_time: string;
    sentence: string;
    spell: string;
    twValue: string;
    value: string;
}

const SelectCardPage = () => {
    const {data} = use(promiseFetchData)

    const examList = useMemo(() => {
        return makeQuestionList(data.data, 2);
    }, [])

    return <TimerGame>
        <SelectGame data={examList[0]}/>
    </TimerGame>
}
export default SelectCardPage;

const makeQuestionList = (data: WordType[], size: number) => {
    const res = [];

    for(let i=0;i<size;i++) {
        const answerIndex = Math.floor(Math.random()*4)
        const randomObjList = getRandomObject<WordType>(data, 4);
        res.push({answer: randomObjList[answerIndex], questionList: randomObjList})
    }

    return res
}
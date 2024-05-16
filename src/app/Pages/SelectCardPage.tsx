import SelectGame from "../components/SelectGame.tsx";
import {getVocabularyTest} from "../../utils/apiService.ts";
import {use, useMemo, useState} from "react";
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

export interface OutcomeType {
    good: string[],
    bad: string[],
}

const SelectCardPage = () => {
    const {data: response} = use(promiseFetchData)
    const [outcome, setOutcome] = useState<OutcomeType>({good: [], bad: []});
    const [times, setTimes] = useState(0);

    const question = useMemo(() => {
        return makeQuestion(response.data);
    }, [times])

    const countOutcome = (id: string, isSuccess: boolean) => {
        if (isSuccess) {
            setOutcome({
                ...outcome,
                good: [...outcome.good, id]
            })
        } else {
            setOutcome({
                ...outcome,
                bad: [...outcome.bad, id]
            })
        }
    }

    console.log('outCome: ', outcome)


    return <SelectGame data={question} nextQuestion={() => setTimes(prev => prev + 1)}
                       countOutcome={(id, isSuccess) => countOutcome(id, isSuccess)}/>
}
export default SelectCardPage;

const makeQuestion = (data: WordType[]) => {
    const answerIndex = Math.floor(Math.random() * 4)
    const randomObjList = getRandomObject<WordType>(data, 4);
    return {answer: randomObjList[answerIndex], questionList: randomObjList}
}
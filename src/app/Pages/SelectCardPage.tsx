import SelectGame from "../components/SelectGame.tsx";
import {getVocabularyTest} from "../../utils/apiService.ts";
import {use, useEffect, useState} from "react";
import {getRandomObject} from "../../utils/userful.ts";
import {getVoice} from "../../utils/ttsApiService.ts";

const promiseFetchData = getVocabularyTest();

export interface SelectGameQuestionType {
    questionList: WordType[],
    answer: WordType,
    voice?: string,
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

const SelectCardPage = ({isVoice}: { isVoice: boolean }) => {
    const {data: response} = use(promiseFetchData)
    const [outcome, setOutcome] = useState<OutcomeType>({good: [], bad: []});
    const [times, setTimes] = useState(0);

    // const question = useMemo(async () => {
    //     const data2 = await makeQuestion(response.data);
    //     console.log('data: ', data2)
    //     return data2
    // }, [times])

    const [question, setQuestion] = useState<SelectGameQuestionType>()

    useEffect(() => {
        const getVoiceData = async () => {
            const data = await makeQuestion(response.data, isVoice);
            setQuestion(data);
        }

        console.log('times isvoide: ', [times, isVoice])
        getVoiceData();

    }, [times, isVoice]);

    const countOutcome = (id: string, isSuccess: boolean) => {
        // if this question is fail in this test, you can't change the outcome anymore.
        if (outcome.bad.includes(id)) return;
        if (outcome.good.includes(id) && !isSuccess) {
            setOutcome({
                good: outcome.good.filter(o => o !== id),
                bad: [...outcome.bad, id],
            })
            return;
        }
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


    if (!question) return ''
    return (
        <div>
            <SelectGame isVoice={isVoice}
                        data={question}
                        nextQuestion={() => setTimes(prev => prev + 1)}
                        countOutcome={(id, isSuccess) => countOutcome(id, isSuccess)}
            />
        </div>
    )
}
export default SelectCardPage;

const makeQuestion = async (data: WordType[], isVoice = false) => {
    const answerIndex = Math.floor(Math.random() * 4)
    const randomObjList = getRandomObject<WordType>(data, 4);
    if (isVoice) {
        console.log('???')
        const response = await getVoice({text: randomObjList[answerIndex].value});
        return {answer: randomObjList[answerIndex], voice: response.data.audio_file_url, questionList: randomObjList}
    }
    return {answer: randomObjList[answerIndex], questionList: randomObjList}
}
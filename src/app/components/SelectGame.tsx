import Card from "./Card.tsx";
import {useEffect, useMemo, useState} from "react";
import {SelectGameQuestionType} from "../Pages/SelectCardPage.tsx";
import useGameTimer from "../hooks/useGameTimer.tsx";
import {GAME_STEP} from "../constant.ts";

const SelectGame = ({isVoice, data, nextQuestion, countOutcome}: {
    isVoice: boolean
    data: SelectGameQuestionType,
    nextQuestion: () => void,
    countOutcome: (data: { id: string, score: number }, isSuccess: boolean) => void
}) => {
    const [selectedCardId, setSelectedCardId] = useState<number>();
    const {questionList, answer} = data;

    const {
        setAnswer,
        startGame,
        remainingTime,
        gameStatus,
        resetGame,
        confirmAnswer
    } = useGameTimer({question: answer._id})

    const isFinished = useMemo(() => gameStatus === GAME_STEP.FAIL || gameStatus === GAME_STEP.SUCCESS, [gameStatus])

    useEffect(() => {
        setSelectedCardId(undefined)
        resetGame();
        startGame();
    }, [data]);
    const handleSelectCard = (index: number) => {
        if (isFinished) return;
        setSelectedCardId(index);
        setAnswer(questionList[index]._id);
    }

    const handleNextQ = () => {
        if (!isFinished) confirmAnswer();
        nextQuestion();
    }

    useEffect(() => {
        if (!isFinished) return;
        countOutcome({
            id: data.answer._id,
            score: data.answer.score?.score
        }, gameStatus === GAME_STEP.SUCCESS);
    }, [isFinished]);

    return <div className={'grid grid-flow-row grid-cols-2 gap-5 border-2 p-10 w-[400px] m-auto'}>
        <span className="col-span-2">remaining {remainingTime} sec</span>
        {isVoice ? (
            <audio key={data.answer._id} controls autoPlay className="col-span-2">
                <source src={data.voice} type="audio/mp3"/>
            </audio>
        ) : <span className="col-span-2">{answer.twValue}</span>}
        {questionList.map((d, index) => (
            <Card key={d._id}
                  className={`w-[150px] h-[150px]
                    ${selectedCardId === index ? 'border-blue-300' : ''} 
                    ${isFinished && d._id === answer._id ? 'bg-green-300 border-green-300' : ''} 
                    ${gameStatus === GAME_STEP.FAIL && index === selectedCardId ? 'bg-red-300  border-red-300' : ''}
                  `}
                  onClick={() => handleSelectCard(index)}
            >
                {d.value !== d.spell && isFinished && <span className={"text-sm"}>{d.spell}</span>}
                <span className={"text-2xl"}>{d.value}</span>
            </Card>
        ))}
        {isFinished ? (
            <button className="col-span-2 rounded-xl p-3 bg-blue-500 text-white disabled:bg-gray-400"
                    onClick={handleNextQ}
                    disabled={!isFinished}>Next
            </button>) : <button className="col-span-2 rounded-xl p-3 bg-blue-500 text-white"
                                 onClick={confirmAnswer}>Confirm</button>}
    </div>
}

export default SelectGame;
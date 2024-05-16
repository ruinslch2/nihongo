import Card from "./Card.tsx";
import {useEffect, useMemo, useState} from "react";
import {SelectGameQuestionType} from "../Pages/SelectCardPage.tsx";
import useGameTimer from "../hooks/useGameTimer.tsx";
import {GAME_STEP} from "../constant.ts";

const SelectGame = ({data, nextQuestion, countOutcome}: {
    data: SelectGameQuestionType,
    nextQuestion: () => void,
    countOutcome: (id: string, isSuccess: boolean) => void
}) => {
    const [selectedCardId, setSelectedCardId] = useState<number>();
    const {questionList, answer} = data;

    const {setAnswer, startGame, remainingTime, gameStatus, resetGame} = useGameTimer({question: answer._id})
    const isFinished = useMemo(() => gameStatus === GAME_STEP.FAIL || gameStatus === GAME_STEP.SUCCESS, [gameStatus])

    useEffect(() => {
        startGame();
    }, []);
    const handleSelectCard = (index: number) => {
        if (isFinished) return;
        setSelectedCardId(index);
        setAnswer(questionList[index]._id);
    }

    const handleNextQ = () => {
        nextQuestion();
        setSelectedCardId(undefined)
        resetGame();
        startGame();
    }

    useEffect(() => {
        if (!isFinished) return;
        countOutcome(data.answer._id, gameStatus === GAME_STEP.SUCCESS);
    }, [isFinished]);

    return <div className={'grid grid-flow-row grid-cols-2 gap-5 border-2 p-10'}>
        <span className="col-span-2">remaining {remainingTime} sec</span>
        <span className="col-span-2">{answer.twValue}</span>
        {questionList.map((d, index) => (
            <Card key={d._id}
                  className={`
                    ${selectedCardId === index ? 'border-blue-300' : ''} 
                    ${isFinished && d._id === answer._id ? 'bg-green-300 border-green-300' : ''} 
                    ${gameStatus === GAME_STEP.FAIL && index === selectedCardId ? 'bg-red-300  border-red-300' : ''}
                  `}
                  onClick={() => handleSelectCard(index)}
            >
                {d.spell}
            </Card>
        ))}
        <button className="col-span-2 rounded-xl p-3 bg-blue-500 text-white"
                onClick={handleNextQ}
                disabled={!isFinished}>Next
        </button>
    </div>
}

export default SelectGame;
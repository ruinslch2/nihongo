import {useCallback, useEffect, useRef, useState} from "react";
import {DEFAULT_GAME_TIME, GAME_STEP} from "../constant.ts";

const useGameTimer = ({question}: { question: string }) => {

    const [step, setStep] = useState(GAME_STEP.PREPARE);
    const [remainingTime, setRemainingTime] = useState(DEFAULT_GAME_TIME);
    const [answer, setAnswer] = useState<string>();
    const timerRef = useRef<number>(0);

    const countDown = () => {
        if (timerRef.current !== 0) return;
        setStep(GAME_STEP.RUNNING)
        timerRef.current = setInterval(() => {
            setRemainingTime(prev => prev - 1)
        }, 1000);
    }

    const checkAnswer = useCallback(() => {
        question !== answer ? setStep(GAME_STEP.FAIL) : setStep(GAME_STEP.SUCCESS)
        clearInterval(timerRef.current)
    }, [answer])

    useEffect(() => {
        if (remainingTime === 0) {
            checkAnswer()
        }
    }, [remainingTime, checkAnswer]);

    const resetGame = () => {
        setStep(GAME_STEP.PREPARE)
        setRemainingTime(DEFAULT_GAME_TIME)
        setAnswer(undefined)
        timerRef.current = 0;
    }

    const confirmAnswer = () => {
        setRemainingTime(0);
    }

    return {startGame: countDown, gameStatus: step, setAnswer, remainingTime, resetGame, confirmAnswer}
}

export default useGameTimer;
import {useEffect, useRef, useState} from "react";

const DEFAULT_TIME = 5;

enum GAME_STEP {
    PREPARE,
    RUNNING,
    SUCCESS,
    FAIL
}

const TimerGame = () => {

    const [step, setStep] = useState(GAME_STEP.PREPARE);
    const [remainingTime, setRemainingTime] = useState(DEFAULT_TIME);
    const [question, setQuestion] = useState('Test');
    const timerRef = useRef<number>();

    const countDown = () => {
        setStep(GAME_STEP.RUNNING)
        timerRef.current = setInterval(() => {
            setRemainingTime(prev => prev - 1)
        }, 1000);
    }

    const checkAnswer = (form: FormData) => {
        const answer = form.get('answer')
        answer !== question ? setStep(GAME_STEP.FAIL) : setStep(GAME_STEP.SUCCESS)
        clearInterval(timerRef.current)
    }

    useEffect(() => {
        if (remainingTime === 0) {
            setStep(GAME_STEP.FAIL)
            clearInterval(timerRef.current)
        }
    }, [remainingTime]);

    return <>
        <form className="flex flex-col gap-4" action={checkAnswer}>
            <div className={`flex flex-col gap-4 ${step !== GAME_STEP.PREPARE ? '' : 'invisible'}`}>
                <span>Remaining: {remainingTime}</span>
                <span>{step === GAME_STEP.FAIL && 'X'} {step === GAME_STEP.SUCCESS && 'O'} Question: {question}</span>
                <input type="text" className="border p-2" name="answer"></input>
            </div>
        </form>
        <button onClick={countDown} disabled={step !== GAME_STEP.PREPARE}>Start</button>
    </>
}

export default TimerGame;
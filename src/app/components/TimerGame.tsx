import {KeyboardEventHandler, useEffect, useRef, useState} from "react";

const DEFAULT_TIME = 5;

enum GAME_STEP {
    PREPARE,
    RUNNING,
    SUCCESS,
    FAIL
}

const TimerGame = ({children}:{children: React.ReactNode}) => {

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

    // useEffect(() => {
    //     if (step === GAME_STEP.FAIL) {
    //         // decrease one score
    //     } else if (step === GAME_STEP.SUCCESS) {
    //         // increase one score
    //     }
    // }, [step]);


    return <form className="flex flex-col gap-4 border p-4" action={checkAnswer}>
        <span>Remaining: {remainingTime}</span>
        {children}
        {/*<div className={`flex flex-col gap-4 ${step !== GAME_STEP.PREPARE ? '' : 'invisible'}`}>*/}
        {/*    <span>Remaining: {remainingTime}</span>*/}
        {/*    <span>{step === GAME_STEP.FAIL && 'X'} {step === GAME_STEP.SUCCESS && 'O'} Question: {question}</span>*/}
        {/*    <input type="text" className="border p-2" name="answer"></input>*/}
        {/*</div>*/}
        <button className="rounded-xl p-3 bg-blue-500 text-white" onClick={countDown}
                disabled={step !== GAME_STEP.PREPARE}>Update
        </button>
    </form>
}

export default TimerGame;
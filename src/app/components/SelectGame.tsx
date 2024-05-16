import Card from "./Card.tsx";
import {useState} from "react";
import {SelectGameQuestionType} from "../Pages/SelectCardPage.tsx";

const SelectGame = ({data}: { data: SelectGameQuestionType }) => {
    const [selectedCardId, setSelectedCardId] = useState<number>();
    const {questionList, answer} = data;

    return <div className={'grid grid-flow-row grid-cols-2 gap-5'}>
        <span className="col-span-2">{answer.value}</span>
        {questionList.map((d, index) => (
            <Card key={d._id} className={selectedCardId === index ? 'border-blue-300' : ''} onClick={() => setSelectedCardId(index)}>{d.spell}</Card>
        ))}
    </div>
}

export default SelectGame;
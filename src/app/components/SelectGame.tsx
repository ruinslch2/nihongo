import Card from "./Card.tsx";
import {useState} from "react";

interface WordType {
    sentence: string;
    spell: string;
    twValue: string;
    value: string;
    _id: string;
}

const SelectGame = ({data}: { data: WordType[] }) => {
    const [selectedCardId, setSelectedCardId] = useState<number>();


    return <div className={'grid grid-flow-row grid-cols-2 gap-5'}>

        {data.map((d, index) => (
            <Card key={d._id} className={selectedCardId === index ? 'border-blue-300' : ''} onClick={() => setSelectedCardId(index)}>{d.spell}</Card>
        ))}
    </div>
}

export default SelectGame;
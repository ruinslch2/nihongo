import Card from "./Card.tsx";
import {useState} from "react";

const SelectGame = () => {
    const [selectedCardId, setSelectedCardId] = useState<number>();

    return <div className={'grid grid-flow-row grid-cols-2 gap-5'}>
        <Card className={selectedCardId === 0 ? 'border-blue-300' : ''} onClick={() => setSelectedCardId(0)}>123</Card>
        <Card className={selectedCardId === 1 ? 'border-blue-300' : ''} onClick={() => setSelectedCardId(1)}>123</Card>
        <Card className={selectedCardId === 2 ? 'border-blue-300' : ''} onClick={() => setSelectedCardId(2)}>123</Card>
        <Card className={selectedCardId === 3 ? 'border-blue-300' : ''} onClick={() => setSelectedCardId(3)}>123</Card>
    </div>
}

export default SelectGame;
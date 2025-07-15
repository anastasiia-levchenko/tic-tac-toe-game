import {useState} from "react";
import {SYMBOL_O, SYMBOL_X} from "./constants";

const computeWinner = (cells) => {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (
            cells[a] &&
            cells[a] === cells[b] &&
            cells[a] === cells[c]
        ) {
            return [a, b, c]
        }
    }
}

export function useGameState() {
    const initialEmptyArray = [null, null, null, null, null, null, null, null, null];
    const [cells, setCells] = useState(initialEmptyArray);
    const [currentStep, setCurrentStep] = useState(SYMBOL_O);
    const [winnerSequence, setWinnerSequence] = useState();

    const handleCellClick = (index) => {
        if (cells[index] || winnerSequence)
            return;

        const cellsCopy = cells.slice();
        cellsCopy[index] = currentStep;
        const winner = computeWinner(cellsCopy);

        setCells(cellsCopy);
        setCurrentStep(currentStep === SYMBOL_O ? SYMBOL_X : SYMBOL_O);
        setWinnerSequence(winner);
    }

    const handleExit = () => {
        setCells(initialEmptyArray);
        setWinnerSequence(undefined);
        setCurrentStep(SYMBOL_O);
    }

    const winnerSymbol = winnerSequence ? cells[winnerSequence[0]] : undefined;
    const isDraw = !winnerSequence && cells.filter(value => value).length === 9;

    return {
        cells,
        currentStep,
        winnerSequence,
        handleCellClick,
        handleExit,
        winnerSymbol,
        isDraw
    }
}
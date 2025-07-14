import {useState} from "react";
import styles from '../styles/game.module.css';


const SYMBOL_X = 'X';
const SYMBOL_O = 'O';

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

function useGameState() {
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

export default function HomePage() {
    const {
        cells,
        currentStep,
        winnerSequence,
        handleCellClick,
        handleExit,
        winnerSymbol,
        isDraw
    } = useGameState();

    return (
        <div className={styles['game']}>
            <GameInfo
                isDraw={isDraw}
                winnerSymbol={winnerSymbol}
                currentStep={currentStep}
            />
            <div className={styles['game-field']}>
                {cells.map((symbol, index) => {
                    return <GameCell
                        symbol={symbol}
                        isWinner={winnerSequence?.includes(index)}
                        onClick={() => handleCellClick(index)}
                    />
                })}
            </div>
            <button className={styles['reset']} onClick={handleExit}>Reset</button>
        </div>
    )
}

function GameInfo({isDraw, winnerSymbol, currentStep}) {
    if (isDraw) {
        return (
            <div className={styles['game-info']}>
                'Draw'
            </div>
        )
    }
    if (winnerSymbol) {
        return (
            <div className={styles['game-info']}>
                Winner: <GameSymbol symbol={winnerSymbol ?? currentStep}/>
            </div>
        )
    }

    return (
        <div className={styles['game-info']}>
            Turn: <GameSymbol symbol={currentStep}/>
        </div>
    )
}

function GameSymbol({symbol}) {
    const getSymbolClassName = (symbol) => {
        if (symbol === SYMBOL_O) return styles['symbol--o'];
        if (symbol === SYMBOL_X) return styles['symbol--x'];
        return '';
    }

    return <span className={`${styles['symbol']} ${getSymbolClassName(symbol)}`}>{symbol}</span>
}

function GameCell({isWinner, onClick, symbol}) {
    return (
        <button
            className={`${styles['cell']} ${isWinner ? styles['cell--win'] : ''}`}
            onClick={onClick}>
            {symbol ? <GameSymbol symbol={symbol}/> : null}
        </button>
    )
}
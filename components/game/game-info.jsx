import styles from "./game.module.css";
import {GameSymbol} from "./game-symbol";

export function GameInfo({isDraw, winnerSymbol, currentStep}) {
    if (isDraw) {
        return (
            <div className={styles['game-info']}>
                Draw
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
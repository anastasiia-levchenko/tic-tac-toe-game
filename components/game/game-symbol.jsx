import styles from "./game.module.css";
import {SYMBOL_O, SYMBOL_X} from "./constants";

export function GameSymbol({symbol}) {
    const getSymbolClassName = (symbol) => {
        if (symbol === SYMBOL_O) return styles['symbol--o'];
        if (symbol === SYMBOL_X) return styles['symbol--x'];
        return '';
    }

    return <span className={`${styles['symbol']} ${getSymbolClassName(symbol)}`}>{symbol}</span>
}
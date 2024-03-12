import styles from "./card.module.css";
import { CiTempHigh } from "react-icons/ci";
export default function Card({valor = 0}) {
    return (
        <div className={styles.main}>
            <CiTempHigh className={styles.icon} />
            <div className={styles.datos}>{valor}</div>
        </div>
    );
}

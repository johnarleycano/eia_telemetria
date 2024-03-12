import styles from "./header.module.css";
import { FaUser } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";

export default function Header() {
    return (
        <div className={styles.main}>
            <IoIosSettings className={styles.icon} />
            <FaUser className={styles.icon} />
        </div>
    );
}

import styles from "./menulateral.module.css";
import { CiLocationOn } from "react-icons/ci";
import { FiPrinter } from "react-icons/fi";
import { BsGraphUpArrow } from "react-icons/bs";
import { GoHomeFill } from "react-icons/go";
import { FaListUl } from "react-icons/fa";
import { useRouter } from "next/router";

export default function Menulateral() {
    const router = useRouter();

    return (
        <div className={styles.main}>
            <GoHomeFill className={styles.icon} onClick={() => router.push("/")} />
            <CiLocationOn className={styles.icon} onClick={() => router.push("/ubicaciones")} />
            <FiPrinter className={styles.icon} />
            <FaListUl className={styles.icon} />
            <BsGraphUpArrow className={styles.icon} onClick={() => router.push("/graficos")} />
        </div>
    );
}

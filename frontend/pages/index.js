import "@fontsource/roboto";
import styles from "../styles/Home.module.css";
import Header from "../components/Header/header";
import MenuLateral from "../components/MenuLateral/menulateral";

export default function Home() {
    return (
        <main className={styles.main}>
            <Header />
            <MenuLateral />
            <h1 className={styles.titulo_pagina}>Inicio</h1>
        </main>
    );
}
import React, { PureComponent } from 'react';
import Header from "../components/Header/header"
import MenuLateral from "../components/MenuLateral/menulateral"
import styles from "../styles/Ubicaciones.module.css"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend } from "recharts";

export default function Graph({puntos}) {
  const listaP = []
  console.log(puntos.datos)
  puntos.datos.map((punto, index) => {
    console.log(punto)
    listaP.push({
      names: '',
      pv: parseFloat(punto.valor)
    })
  })

  const data = listaP

  return (
        <main className={styles.main}>
        <Header />
    <MenuLateral />
    <div className={styles.body_table}>

      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
        }}
      >
      <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />

        <Line
          type="monotone"
          dataKey="pv"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
      </LineChart>
    </div>
    </main>
  );
}

/**
 * Renderización
 */
export const getServerSideProps = async() => {
  const respuestaAPI = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/puntos/5`)
  const puntos = await respuestaAPI.json()

  return {
      props: {
          puntos,
      },
  }
}

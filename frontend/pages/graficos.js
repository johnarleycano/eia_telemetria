import React, { useEffect, useState } from 'react';
import Header from "../components/Header/header"
import MenuLateral from "../components/MenuLateral/menulateral"
import styles from "../styles/Ubicaciones.module.css"
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";
import Card from "../components/Card/Card";
import mqtt from "mqtt"

var opciones = {
    protocol: 'mqtts',
    clientID: process.env.MQTT_CLIENTE_ID,
    username: process.env.MQTT_USUARIO,
    password: process.env.MQTT_CLAVE,
}

var cliente = mqtt.connect(process.env.MQTT_URL, opciones)

cliente.on('connect', () => {
    console.log(`Conectado a ${process.env.MQTT_URL}`)

    cliente.subscribe(process.env.MQTT_TOPICO_TEMPERATURA, { qos: 0 }, (error) => {
        (error)
        ? console.error(`Suscripción al tópico ${process.env.MQTT_TOPICO_TEMPERATURA} fallida.`)
        : console.log(`Suscripción al tópico ${process.env.MQTT_TOPICO_TEMPERATURA} exitosa.`)
    })
})

export default function Graph({puntos}) {
    const listaP = []

    puntos.datos.map((punto, index) => {
        listaP.push({
            id: index,
            nombre: '',
            pv: parseFloat(punto.valor)
        })
    })

    const [datos, setDatos] = useState(listaP)
    const [temperatura, setTemperatura] = useState(0)

    useEffect(() => {
        console.log('Ingresa al efecto')
        var punto

        cliente.on('message', (topico, mensaje) => {
            console.log(topico, mensaje.toString())
            punto = {
                id: Math.random(),
                nombre: '' ,
                pv: parseFloat(mensaje.toString())
            }

            setTemperatura(parseFloat(mensaje.toString()))
            setDatos(datos => [...datos, punto])
            // cliente.end()
        })
    }, [])

    return (
        <main className={styles.main}>
            <Header />
            <MenuLateral />

            <div className={styles.body_table}>
                <Card valor={temperatura} />
                    <LineChart
                        width={500}
                        height={300}
                        data={datos}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >

                    <CartesianGrid strokeDasharray="3 3" />
                    
                    <XAxis dataKey="nombre" />
                    <YAxis dataKey="valores"  domain={[0, 60]} />

                    <Line
                        // isAnimationActive={false}
                        type="monotone"
                        dataKey="pv"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                    />
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

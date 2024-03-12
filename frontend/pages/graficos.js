import React, { useEffect, useState } from 'react';
import Header from "../components/Header/header"
import MenuLateral from "../components/MenuLateral/menulateral"
import styles from "../styles/Ubicaciones.module.css"
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";
import Card from "../components/Card/Card";
import mqtt from "mqtt"

const mqttURL = 'mqtt://johnarleycano.cloud.shiftr.io'
const mqttTopicoTemperatura = 'EIA/Piso2/Salon4/temperatura'
var mqttOpciones = {
    protocol: 'mqtts',
    clientID: 'Frontend2',
    username: 'johnarleycano',
    password: 'dfalULNJNjKTm9rw',
}

var cliente = mqtt.connect(mqttURL, mqttOpciones)

cliente.on('connect', () => {
    console.log(`Conexión a servidor ${mqttURL} exitosa`)
    
    cliente.subscribe(mqttTopicoTemperatura, { qos: 0 }, (error) => {
        (error)
        ? console.error(`Suscripción al tópico ${mqttTopicoTemperatura} fallida.`)
        : console.log(`Suscripción al ${mqttTopicoTemperatura} tópico exitosa.`)
    })
})

export default function Graph({puntos}) {
    const listaPuntos = []

    puntos.datos.map((punto, index) => {
        listaPuntos.push({
            id: index,
            nombre: '',
            pv: parseFloat(punto.valor)
        })
    })

    const [datos, setDatos] = useState(listaPuntos)
    const [temperatura, setTemperatura] = useState(0)

    useEffect(() => {
        var punto

        cliente.on('message', (topico, mensaje) => {
            punto = {
                id: Math.random(),
                nombre: '' ,
                pv: parseFloat(mensaje.toString())
            }

            setTemperatura(parseFloat(mensaje.toString()))
            setDatos(datos => [...datos, punto])
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
    )
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

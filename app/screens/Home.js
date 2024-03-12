import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { NavigationContext } from '@react-navigation/native';
import Card from '../components/Card';
import Menu from '../components/Menu';
import { LineChart } from "react-native-chart-kit";

export default function Home() {
    const [temperatura, setTemperatura] = useState(0)
    
    var mqtt = require("@taoqf/react-native-mqtt")
    var opciones = {
        protocol: 'mqtts',
        clientID: 'Frontend2',
        username: 'precisionmetrologica',
        password: 'hDLLKk90ZG5nED3Y',
    }

    // Gráfica
    const [ejeX, setEjeX] = useState([0])
    const [ejeY, setEjeY] = useState([0])

    var contador = 0

    useEffect(() => {
      var cliente = mqtt.connect("mqtt://precisionmetrologica.cloud.shiftr.io", opciones)
      
      cliente.on('connect', () => {
        cliente.subscribe('EIA/Piso2/Salon4/temperatura')
      })

        var punto

        // Cuando se reciba un mensaje
        cliente.on('message', (topico, mensaje) => {
            punto = {
                id: Math.random(),
                nombre: '' ,
                pv: parseFloat(mensaje.toString())
            }
            console.log(punto)

            // Asignamos al useState el valor de la temperatura
            setTemperatura(parseFloat(mensaje.toString()))

            contador++
            setEjeX(ejeX => [...ejeX, contador])
            setEjeY(ejeY => [...ejeY, parseFloat(mensaje.toString())])
        })
    }, [])
    
  return (
    <View style={styles.container}>
      <Card valor={temperatura}></Card>
      
      <LineChart
        data={{
          labels: ejeX.slice(-20),
          datasets: [
            {
              data: ejeY.slice(-20)
            }
          ]
        }}
        width={Dimensions.get("window").width} // from react-native
        height={220}
        yAxisLabel=""
        yAxisSuffix=" °"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#265073",
          backgroundGradientFrom: "#2D9596",
          backgroundGradientTo: "#9AD0C2",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacidad = 1) => `rgba(255, 255, 255, ${opacidad})`,
          labelColor: (opacidad = 1) => `rgba(255, 255, 255, ${opacidad})`,
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#F1FADA"
          }
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
          margin: 20,
        }}
      />
      
      <Menu></Menu>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

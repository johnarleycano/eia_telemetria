import React, { useContext } from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import { NavigationContext } from '@react-navigation/native';
import { Entypo, MaterialIcons  } from '@expo/vector-icons';

export default function Menu() {
    const navegacion = useContext(NavigationContext)
    const tamanioIcono = 35

  return (
    <View style={styles.container}>
      <Pressable onPress={() => navegacion.navigate("Home")} >
          <Entypo name="home" size={tamanioIcono} color="white" style={styles.icon} />
      </Pressable>
      
      <Pressable onPress={() => navegacion.navigate("Ubicaciones")} >
        <Entypo name="location" size={tamanioIcono} color="white" />
      </Pressable>

      <Pressable onPress={() => navegacion.navigate("Dispositivos")} >
        <MaterialIcons name="device-thermostat" size={tamanioIcono} color="white" style={styles.icon}/>
      </Pressable>

      <Pressable onPress={() => navegacion.navigate("Musica")} >
        <Entypo name="spotify" size={tamanioIcono} color="white" style={styles.icon}/>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#124076",
    alignItems: 'center',
    justifyContent: 'center',
    width: "100%",
    height: 80,
    position: "absolute",
    bottom: 0,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    borderColor: "#124525",
    paddingRight: 5
    }
});

import React, { useContext } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { NavigationContext } from '@react-navigation/native';
import { FontAwesome6 } from '@expo/vector-icons';

export default function Card({valor = 0}) {
// const navegacion = useContext(NavigationContext)

return (
    <View style={styles.container}>
        <FontAwesome6 name="temperature-half" size={24} color="black" style={styles.valorTemperatura} />
        <Text style={styles.valorTemperatura}>{valor}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "50%",
    height: 150,
    borderWidth: 2,
    backgroundColor: '#fff',
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: "row",
    borderRadius: 10,
  },
  valorTemperatura: {
    fontSize: 55,
    color: "black",
  }
});

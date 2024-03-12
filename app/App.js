import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Home from './screens/Home';
import Ubicaciones from './screens/Ubicaciones';
import Dispositivos from './screens/Dispositivos';
import Musica from './screens/Musica';

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Home" component={Home}></Stack.Screen>
            <Stack.Screen name="Ubicaciones" component={Ubicaciones}></Stack.Screen>
            <Stack.Screen name="Dispositivos" component={Dispositivos}></Stack.Screen>
            <Stack.Screen name="Musica" component={Musica}></Stack.Screen>
        </Stack.Navigator>
    </NavigationContainer>
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

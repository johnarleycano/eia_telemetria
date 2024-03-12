import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import BotonInteligente from '../components/BotonInteligente';
import Menu from '../components/Menu';

export default function Dispositivos() {
  return (
    <View style={styles.container}>
      <BotonInteligente></BotonInteligente>
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

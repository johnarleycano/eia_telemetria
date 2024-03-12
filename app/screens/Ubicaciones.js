import { NavigationContext } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import Menu from '../components/Menu';

export default function Ubicaciones() {
  return (
    <View style={styles.container}>
      <Text>Ubicaciones</Text>
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

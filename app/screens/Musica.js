import { StyleSheet, Text, View } from 'react-native';
import Menu from '../components/Menu';

export default function Musica() {
  return (
    <View style={styles.container}>
      <Text>Música</Text>
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

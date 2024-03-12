import { StyleSheet, Switch, View } from 'react-native';
import { useState } from 'react';

export default function BotonInteligente({titulo, topico, setValor, valor}) {

  const [activo, setActivo] = useState(false);
  const suiche = () => setActivo(estadoPrevio => !estadoPrevio);

return (
    <View style={styles.container}>
        <Switch
        style={{ transform: [{ scaleX: 2 }, { scaleY: 2 }] }}
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={activo ? '#265073' : '#F1FADA'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={suiche}
        value={activo}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  }
});

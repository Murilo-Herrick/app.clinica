import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStaclNavigation } from '@react-navigation/stack';

// Para instalar os pacotes react-navigation/native 
// e o pacote react-navigation/stack executar os seguintes comandos
// no diretorio raiz do projeto

// npm install @react-navigation/native
// npm install @react-navigation/native-stack
// npm install @react-navigation/stack

// Importação dos componentes de tela
export default function App() {
  return (
    <View style={styles.container}>

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

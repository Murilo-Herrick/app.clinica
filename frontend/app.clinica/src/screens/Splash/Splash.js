import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

// Carregamento do logotipo
const Logo = require('../../../assets/logo.png');

// Início do componente Splash
const Splash = ({ navigation }) => { 
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Menu');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logo} />
      <Text style={styles.title}>Carregando...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff', 
  },
  title: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20, 
  },
  logo: {
    width: '70%',
    height: '40%',
    resizeMode: 'contain',
  },
});

export default Splash;
